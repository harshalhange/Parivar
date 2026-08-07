import { FurnitureProduct } from '../types';

export const INITIAL_PRODUCTS: FurnitureProduct[] = [
  {
    id: 'hove-bed',
    name: 'Hove Solid Sheesham Double Bed Without Storage',
    category: 'Bedroom',
    price: 17499,
    oldPrice: 25999,
    image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=800&fit=crop'
    ],
    desc: 'Handcrafted solid Sheesham wood double bed with smooth natural grain finish. Engineered for strength with heavy-duty mortise and tenon joinery.',
    material: 'Solid Sheesham Wood',
    room: 'Bedroom',
    size: 'Queen (60 × 78 in)',
    delivery: '5–9 Days (Pan-India)',
    assembly: 'Easy self-assembly / video guide included',
    floorFit: 'Requires 7 × 8 ft floor space',
    inStock: true,
    stockCount: 12,
    isBestSeller: true,
    isSale: true,
    rating: 4.8,
    reviewCount: 34,
    variants: [
      { name: 'Honey Finish', price: 17499, oldPrice: 25999, sku: 'HOVE-QUEEN-HONEY', stock: 8 },
      { name: 'Walnut Finish', price: 18499, oldPrice: 26999, sku: 'HOVE-QUEEN-WALNUT', stock: 4 }
    ]
  },
  {
    id: 'vanguard-bed',
    name: 'Vanguard Queen Double Bed with Hydraulic Storage',
    category: 'Bedroom',
    price: 31999,
    oldPrice: 56999,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=800&fit=crop'
    ],
    desc: 'Spacious storage double bed featuring smooth gas-lift hydraulic storage mechanism. Crafted from 100% solid Sheesham wood with deep walnut oil polish.',
    material: 'Solid Sheesham Wood',
    room: 'Bedroom',
    size: 'Queen / King Option',
    delivery: '7–12 Days (Pan-India)',
    assembly: 'Free carpenter assembly provided',
    floorFit: 'Requires 7.5 × 8.5 ft floor space',
    inStock: true,
    stockCount: 6,
    isBestSeller: true,
    isSale: true,
    rating: 4.9,
    reviewCount: 52,
    variants: [
      { name: 'Honey Finish', price: 31999, oldPrice: 56999, sku: 'VANGUARD-Q-HONEY', stock: 4 },
      { name: 'Walnut Finish', price: 32999, oldPrice: 58999, sku: 'VANGUARD-Q-WALNUT', stock: 2 }
    ]
  },
  {
    id: 'elena-shelf',
    name: 'Elena Solid Wood 4-Tier Bookshelf & Display Unit',
    category: 'Storage & Shelves',
    price: 5399,
    oldPrice: 7499,
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=800&fit=crop'
    ],
    desc: 'Versatile 4-tier Sheesham wood shelf ideal for living room decor, books, planters, and artifacts. Compact space-saving design with sturdy slatted back.',
    material: 'Solid Sheesham Wood',
    room: 'Living Room / Study',
    size: '18 W × 14 D × 52 H in',
    delivery: '4–8 Days (Pan-India)',
    assembly: 'Pre-assembled / Ready to place',
    floorFit: 'Fits in tight corners (1.5 × 1.2 ft)',
    inStock: true,
    stockCount: 20,
    isBestSeller: false,
    isSale: true,
    rating: 4.7,
    reviewCount: 28,
    variants: [
      { name: 'Honey Finish', price: 5399, oldPrice: 7499, sku: 'ELENA-SHELF-HONEY', stock: 12 },
      { name: 'Walnut Finish', price: 5699, oldPrice: 7899, sku: 'ELENA-SHELF-WALNUT', stock: 8 }
    ]
  },
  {
    id: 'divine-shelf',
    name: 'Divine Foldable 5-Tier Sheesham Display Shelf',
    category: 'Storage & Shelves',
    price: 6849,
    oldPrice: 8900,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&h=800&fit=crop'
    ],
    desc: '5-tier foldable ladder bookshelf crafted from pure Sheesham wood. Easily collapsible when moving, perfect for modern apartments.',
    material: 'Solid Sheesham Wood',
    room: 'Living Room / Balcony',
    size: '22 W × 16 D × 62 H in',
    delivery: '5–9 Days (Pan-India)',
    assembly: 'No assembly required (Foldable)',
    floorFit: 'Requires 2 × 1.5 ft floor area',
    inStock: true,
    stockCount: 15,
    isBestSeller: true,
    isSale: true,
    rating: 4.8,
    reviewCount: 41,
    variants: [
      { name: 'Honey Finish', price: 6849, oldPrice: 8900, sku: 'DIVINE-5T-HONEY', stock: 10 },
      { name: 'Walnut Finish', price: 7149, oldPrice: 9300, sku: 'DIVINE-5T-WALNUT', stock: 5 }
    ]
  },
  {
    id: 'neil-bed',
    name: 'Neil Solid Sheesham Single Bed for Studio & Guest Room',
    category: 'Bedroom',
    price: 11490,
    oldPrice: 14990,
    image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&h=800&fit=crop'
    ],
    desc: 'Minimalist single bed with clean vertical headboard slats. Built to endure heavy daily use with 100% solid Sheesham frame.',
    material: 'Solid Sheesham Wood',
    room: 'Bedroom / Guest Room',
    size: 'Single (36 × 75 in)',
    delivery: '5–8 Days (Pan-India)',
    assembly: 'Easy self-assembly with included tools',
    floorFit: 'Requires 3.5 × 6.5 ft floor area',
    inStock: true,
    stockCount: 18,
    isBestSeller: false,
    isSale: true,
    rating: 4.6,
    reviewCount: 19,
    variants: [
      { name: 'Honey Finish', price: 11490, oldPrice: 14990, sku: 'NEIL-SINGLE-HONEY', stock: 12 },
      { name: 'Walnut Finish', price: 11990, oldPrice: 15490, sku: 'NEIL-SINGLE-WALNUT', stock: 6 }
    ]
  },
  {
    id: 'lexa-table',
    name: 'Lexa Sheesham Wood Bedside Table with Drawer & Cabinet',
    category: 'Bedroom',
    price: 4099,
    oldPrice: 5999,
    image: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=800&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=800&h=800&fit=crop'
    ],
    desc: 'Compact nightstand with smooth gliding drawer and lower storage door. Hand-polished to enhance natural Sheesham grain pattern.',
    material: 'Solid Sheesham Wood',
    room: 'Bedroom',
    size: '16 W × 14 D × 20 H in',
    delivery: '4–7 Days (Pan-India)',
    assembly: 'Fully assembled',
    floorFit: 'Fits beside any standard bed',
    inStock: true,
    stockCount: 22,
    isBestSeller: true,
    isSale: true,
    rating: 4.9,
    reviewCount: 63,
    variants: [
      { name: 'Honey Finish', price: 4099, oldPrice: 5999, sku: 'LEXA-NIGHT-HONEY', stock: 15 },
      { name: 'Walnut Finish', price: 4299, oldPrice: 6299, sku: 'LEXA-NIGHT-WALNUT', stock: 7 }
    ]
  },
  {
    id: 'ugo-table',
    name: 'Ugo Sheesham Wood Hexagon Center Coffee Table',
    category: 'Living Room',
    price: 9599,
    oldPrice: 13999,
    image: 'https://images.unsplash.com/photo-1532372320572-cda25690e241?w=800&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1532372320572-cda25690e241?w=800&h=800&fit=crop'
    ],
    desc: 'Geometric hexagon center coffee table crafted in Sheesham wood with brass inlay accents. Statement piece for modern living rooms.',
    material: 'Solid Sheesham Wood + Brass',
    room: 'Living Room',
    size: '32 W × 32 D × 16 H in',
    delivery: '5–10 Days (Pan-India)',
    assembly: 'Pre-assembled',
    floorFit: 'Allow 3 ft walk clearance around sofas',
    inStock: true,
    stockCount: 9,
    isBestSeller: true,
    isSale: true,
    rating: 4.8,
    reviewCount: 37,
    variants: [
      { name: 'Honey Finish', price: 9599, oldPrice: 13999, sku: 'UGO-HEX-HONEY', stock: 5 },
      { name: 'Walnut Finish', price: 9899, oldPrice: 14499, sku: 'UGO-HEX-WALNUT', stock: 4 }
    ]
  },
  {
    id: 'sally-table',
    name: 'Sally Solid Wood Coffee Table with 4 Nested Stools',
    category: 'Living Room',
    price: 15499,
    oldPrice: 21990,
    image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=800&fit=crop'
    ],
    desc: 'Smart 5-in-1 coffee table set with 4 upholstered cushioned stools that tuck neatly underneath the main Sheesham table top.',
    material: 'Solid Sheesham Wood + Fabric Cushion',
    room: 'Living Room',
    size: '36 W × 36 D × 18 H in',
    delivery: '6–11 Days (Pan-India)',
    assembly: 'Minor assembly (Leg attachment)',
    floorFit: 'Compact seating solution for apartments',
    inStock: true,
    stockCount: 11,
    isBestSeller: true,
    isSale: true,
    rating: 4.9,
    reviewCount: 45,
    variants: [
      { name: 'Honey Finish', price: 15499, oldPrice: 21990, sku: 'SALLY-SET-HONEY', stock: 7 },
      { name: 'Walnut Finish', price: 15999, oldPrice: 22490, sku: 'SALLY-SET-WALNUT', stock: 4 }
    ]
  }
];
