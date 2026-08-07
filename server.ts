import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import {
  OrderCreateSchema,
  ReviewSubmitSchema,
  CallbackRequestSchema,
  B2BQuoteSchema,
  AIConsultantSchema,
  sanitizeString
} from './src/lib/sanitizer.js';
import { INITIAL_PRODUCTS } from './src/data/products.js';

const app = express();
const PORT = 3000;

// Initialize Gemini AI Client lazily
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is required for AI Studio features');
    }
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

// Simple in-memory rate limiter per IP
interface RateLimitBucket {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitBucket>();

function rateLimiter(limit: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
    const key = `${req.path}:${ip}`;
    const now = Date.now();
    const bucket = rateLimitMap.get(key) || { count: 0, resetTime: now + windowMs };

    if (now > bucket.resetTime) {
      bucket.count = 1;
      bucket.resetTime = now + windowMs;
    } else {
      bucket.count++;
    }

    rateLimitMap.set(key, bucket);

    if (bucket.count > limit) {
      res.status(429).json({ error: 'Too many requests. Please try again later.' });
      return;
    }
    next();
  };
}

// Global Security Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Handled by AI Studio ingress & CSP headers
  crossOriginEmbedderPolicy: false
}));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(cookieParser());

// Store state in memory (synchronized with Firestore on client)
let catalog = [...INITIAL_PRODUCTS];
let orders: any[] = [];
let reviews: any[] = [];
let leads: any[] = [];
let coupons = [
  { code: 'PARIVAR10', type: 'percent', value: 10, minOrder: 2000, limit: 100, used: 4 },
  { code: 'FLAT500', type: 'fixed', value: 500, minOrder: 5000, limit: 50, used: 2 }
];

// --- API ROUTES ---

// Healthcheck
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Catalog List
app.get('/api/products', rateLimiter(120, 60000), (req: Request, res: Response) => {
  const category = req.query.category as string;
  let result = [...catalog];
  if (category && category !== 'all') {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  res.json({ products: result });
});

// Single Product
app.get('/api/products/:id', rateLimiter(120, 60000), (req: Request, res: Response) => {
  const product = catalog.find(p => p.id === req.params.id);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.json({ product });
});

// Submit Order
app.post('/api/orders', rateLimiter(20, 60000), (req: Request, res: Response) => {
  const parseResult = OrderCreateSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: 'Invalid order payload', details: parseResult.error.format() });
    return;
  }

  const data = parseResult.data;
  const newOrder = {
    id: `PF-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    date: new Date().toLocaleString('en-IN'),
    customer: {
      ...data.customer,
      name: sanitizeString(data.customer.name),
      address: sanitizeString(data.customer.address),
      city: sanitizeString(data.customer.city)
    },
    items: data.items.map(item => ({
      ...item,
      name: sanitizeString(item.name),
      variant: sanitizeString(item.variant)
    })),
    subtotal: data.subtotal,
    discount: data.discount || 0,
    couponCode: sanitizeString(data.couponCode),
    total: data.total,
    shipping: 'Free Shipping Across India',
    deliveryEstimate: '5–9 Business Days',
    status: 'Pending'
  };

  orders.push(newOrder);
  res.status(201).json({ success: true, order: newOrder });
});

// Coupon Validation
app.post('/api/coupons/validate', rateLimiter(30, 60000), (req: Request, res: Response) => {
  const code = sanitizeString(req.body?.code).toUpperCase();
  const subtotal = Number(req.body?.subtotal) || 0;

  const found = coupons.find(c => c.code === code);
  if (!found) {
    res.status(404).json({ error: 'Invalid or expired coupon code' });
    return;
  }

  if (found.used >= found.limit) {
    res.status(400).json({ error: 'Coupon usage limit reached' });
    return;
  }

  if (subtotal < found.minOrder) {
    res.status(400).json({ error: `Minimum order amount for this coupon is ₹ ${found.minOrder}` });
    return;
  }

  const discount = found.type === 'percent'
    ? Math.round((subtotal * found.value) / 100)
    : Math.min(subtotal, found.value);

  res.json({
    valid: true,
    coupon: found,
    discount
  });
});

// AI Furniture & Room Design Consultant
app.post('/api/ai-consultant', rateLimiter(10, 60000), async (req: Request, res: Response) => {
  const parseResult = AIConsultantSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: 'Invalid input schema for AI consultant', details: parseResult.error.format() });
    return;
  }

  const { roomType, stylePreference, budgetRange, specialNotes } = parseResult.data;

  try {
    const ai = getAI();
    const prompt = `You are Parivar Furniture's master interior designer and Sheesham wood furniture expert.
Recommend matching furniture pieces from our handcrafted catalog for a user decorating a ${roomType}.
Style preference: ${sanitizeString(stylePreference) || 'Modern Indian classic'}
Budget range: ${sanitizeString(budgetRange) || '₹ 15,000 - ₹ 50,000'}
Notes/dimensions: ${sanitizeString(specialNotes) || 'None'}

Here is our current catalog:
${JSON.stringify(catalog.map(p => ({ id: p.id, name: p.name, category: p.category, price: p.price, desc: p.desc, size: p.size })))}

Provide a helpful, warm, professional response structured strictly in valid JSON format with keys:
"recommendedProductIds": (array of product IDs from the catalog),
"designAdvice": (short 3-paragraph styling guidance covering wood polish pairing, lighting, and spatial arrangement),
"estimatedBudget": (friendly cost summary text),
"suggestedLayout": (bullet points describing placement in room).`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const responseText = response.text || '{}';
    let resultJson;
    try {
      resultJson = JSON.parse(responseText);
    } catch {
      resultJson = {
        recommendedProductIds: ['hove-bed', 'lexa-table', 'divine-shelf'],
        designAdvice: `Pair natural honey Sheesham wood with warm ambient lighting. For your ${roomType}, keep a 3-foot walking corridor.`,
        estimatedBudget: `Optimal package budget around ${budgetRange}`,
        suggestedLayout: 'Place primary bed/sofa against main wall; position side tables and display shelf in natural light corner.'
      };
    }

    res.json(resultJson);
  } catch (err: any) {
    res.status(500).json({
      error: 'AI Consultant service currently unavailable',
      fallback: {
        recommendedProductIds: ['hove-bed', 'vanguard-bed', 'sally-table'],
        designAdvice: 'For Sheesham wood furniture, pair warm earth tones with natural sunlight and brass accessories.',
        estimatedBudget: 'Custom solid wood styling',
        suggestedLayout: 'Center the main furniture piece and allow clear walkways.'
      }
    });
  }
});

// Submit Callback / Lead
app.post('/api/leads', rateLimiter(15, 60000), (req: Request, res: Response) => {
  const type = req.body.type || 'callback';
  let parseResult;
  if (type === 'b2b') {
    parseResult = B2BQuoteSchema.safeParse(req.body.data);
  } else {
    parseResult = CallbackRequestSchema.safeParse(req.body.data);
  }

  if (!parseResult.success) {
    res.status(400).json({ error: 'Invalid lead format', details: parseResult.error.format() });
    return;
  }

  const leadEntry = {
    id: `LEAD-${Date.now()}`,
    type,
    data: parseResult.data,
    createdAt: new Date().toISOString()
  };

  leads.push(leadEntry);
  res.status(201).json({ success: true, message: 'Request recorded successfully' });
});

// Submit Product Review
app.post('/api/reviews', rateLimiter(15, 60000), (req: Request, res: Response) => {
  const parseResult = ReviewSubmitSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: 'Invalid review fields', details: parseResult.error.format() });
    return;
  }

  const data = parseResult.data;
  const newReview = {
    id: `REV-${Date.now()}`,
    productId: data.productId,
    userName: sanitizeString(data.userName),
    rating: data.rating,
    comment: sanitizeString(data.comment),
    date: new Date().toLocaleDateString('en-IN'),
    verifiedPurchase: true
  };

  reviews.unshift(newReview);
  res.status(201).json({ success: true, review: newReview });
});

// Admin Authentication Check
app.post('/api/admin/login', rateLimiter(5, 60000), (req: Request, res: Response) => {
  const { password } = req.body;
  if (password === 'parivar123' || password === 'admin') {
    res.json({ success: true, token: 'admin-jwt-session-token-v6' });
  } else {
    res.status(401).json({ error: 'Invalid admin passphrase' });
  }
});

// --- VITE / PRODUCTION HANDLER ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Parivar Furniture Server listening on port ${PORT}`);
  });
}

startServer();
