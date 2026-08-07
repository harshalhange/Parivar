import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'hove-bed',
    name: 'Hove Double Bed Without Storage',
    price: 17499,
    oldPrice: 25999,
    category: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=800&fit=crop'
    ],
    desc: 'Solid Sheesham wood double bed without storage. Warm natural wood finish crafted for contemporary Indian bedrooms.',
    inStock: true,
    stock: 12,
    material: 'Solid Sheesham Wood',
    room: 'Bedroom',
    size: 'Queen (60 × 78 in)',
    delivery: '7–15 days',
    assembly: 'Easy assembly included',
    floor: 'Allow approx. 7 × 8 ft space',
    bestSeller: true,
    variants: [
      { name: 'Honey Finish', price: 17499, oldPrice: 25999, sku: 'HOVE-HONEY', stock: 12 },
      { name: 'Walnut Finish', price: 18499, oldPrice: 26999, sku: 'HOVE-WALNUT', stock: 9 }
    ]
  },
  {
    id: 'elena-shelf',
    name: 'Elena Bookshelf / Display Unit',
    price: 5399,
    oldPrice: 6999,
    category: 'Living Room',
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&h=800&fit=crop',
    desc: 'Solid Sheesham wood bookshelf and display unit with multi-tier storage for books, artifacts, and plants.',
    inStock: true,
    stock: 18,
    material: 'Solid Sheesham Wood',
    room: 'Living Room',
    size: '4 Tier Compact',
    delivery: '7–12 days',
    assembly: 'Simple DIY assembly',
    floor: 'Fits in a compact wall corner',
    variants: [
      { name: 'Honey Finish', price: 5399, oldPrice: 6999, sku: 'ELENA-HONEY', stock: 18 },
      { name: 'Walnut Finish', price: 5699, oldPrice: 7299, sku: 'ELENA-WALNUT', stock: 14 }
    ]
  },
  {
    id: 'divine-shelf',
    name: 'Divine Bookshelf 5 Tier Foldable',
    price: 6849,
    oldPrice: 8900,
    category: 'Living Room',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=800&fit=crop',
    desc: '5-tier space-saving foldable Sheesham display shelf for modern living rooms and study spaces.',
    inStock: true,
    stock: 15,
    material: 'Solid Sheesham Wood',
    room: 'Living Room',
    size: '5 Tier Foldable',
    delivery: '7–12 days',
    assembly: 'No assembly required',
    floor: 'Requires flat wall area',
    variants: [
      { name: 'Honey Finish', price: 6849, oldPrice: 8900, sku: 'DIVINE-HONEY', stock: 15 },
      { name: 'Walnut Finish', price: 7149, oldPrice: 9300, sku: 'DIVINE-WALNUT', stock: 11 }
    ]
  },
  {
    id: 'neil-bed',
    name: 'Neil Solid Wood Single Bed',
    price: 11490,
    oldPrice: 14990,
    category: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&h=800&fit=crop',
    desc: 'Handcrafted Sheesham single bed with clean minimalist lines, ideal for guest rooms, kids rooms, or studio apartments.',
    inStock: true,
    stock: 20,
    material: 'Solid Sheesham Wood',
    room: 'Bedroom',
    size: 'Single (36 × 75 in)',
    delivery: '7–15 days',
    assembly: 'Easy assembly',
    floor: 'Allow approx. 4 × 7 ft space',
    variants: [
      { name: 'Honey Finish', price: 11490, oldPrice: 14990, sku: 'NEIL-HONEY', stock: 20 },
      { name: 'Walnut Finish', price: 11990, oldPrice: 15990, sku: 'NEIL-WALNUT', stock: 16 }
    ]
  },
  {
    id: 'lexa-table',
    name: 'Lexa Sheesham Wood Bedside Organiser',
    price: 4099,
    oldPrice: 5999,
    category: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=800&h=800&fit=crop',
    desc: 'Compact bedside nightstand with smooth drawer and open storage shelf.',
    inStock: true,
    stock: 24,
    material: 'Solid Sheesham Wood',
    room: 'Bedroom',
    size: '18 × 16 × 22 in',
    delivery: '7–12 days',
    assembly: 'Pre-assembled',
    floor: 'Fits beside all standard beds',
    variants: [
      { name: 'Honey Finish', price: 4099, oldPrice: 5999, sku: 'LEXA-HONEY', stock: 24 },
      { name: 'Walnut Finish', price: 4299, oldPrice: 6299, sku: 'LEXA-WALNUT', stock: 19 }
    ]
  },
  {
    id: 'vanguard-bed',
    name: 'Vanguard Double Bed with Box Storage',
    price: 31999,
    oldPrice: 56999,
    category: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=800&fit=crop',
    desc: 'Heavy-duty Queen size double bed with dual hydraulic box storage for extra bedding and luggage.',
    inStock: true,
    stock: 5,
    material: 'Solid Sheesham Wood',
    room: 'Bedroom',
    size: 'Queen (60 × 78 in) Box Storage',
    delivery: '7–15 days',
    assembly: 'Carpenter assistance recommended',
    floor: 'Allow 7 × 8 ft floor space',
    bestSeller: true,
    variants: [
      { name: 'Honey Finish', price: 31999, oldPrice: 56999, sku: 'VANGUARD-HONEY', stock: 5 },
      { name: 'Walnut Finish', price: 32999, oldPrice: 58999, sku: 'VANGUARD-WALNUT', stock: 3 }
    ]
  },
  {
    id: 'tuscan-bed',
    name: 'Tuscan Double Bed with Box Storage',
    price: 29999,
    oldPrice: 54999,
    category: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=800&fit=crop',
    desc: 'Tuscan classic carved headboard bed with deep hydraulic storage compartments.',
    inStock: true,
    stock: 6,
    material: 'Solid Sheesham Wood',
    room: 'Bedroom',
    size: 'Queen Storage Bed',
    delivery: '7–15 days',
    assembly: 'Professional assembly included',
    floor: 'Allow 7 × 8 ft space',
    variants: [
      { name: 'Walnut Finish', price: 29999, oldPrice: 54999, sku: 'TUSCAN-WALNUT', stock: 6 },
      { name: 'Honey Finish', price: 30999, oldPrice: 55999, sku: 'TUSCAN-HONEY', stock: 4 }
    ]
  },
  {
    id: 'sally-table',
    name: 'Sally Coffee Table with 4 Stools',
    price: 15499,
    oldPrice: 21990,
    category: 'Storage & Tables',
    image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&h=800&fit=crop',
    desc: 'Smart Sheesham coffee table set with 4 cushioned nesting stools that tuck neatly under the center table.',
    inStock: true,
    stock: 9,
    material: 'Solid Sheesham Wood',
    room: 'Living Room',
    size: '34 × 34 in Table + 4 Stools',
    delivery: '7–12 days',
    assembly: 'Ready to place',
    floor: 'Compact living room center',
    variants: [
      { name: 'Honey Finish', price: 15499, oldPrice: 21990, sku: 'SALLY-HONEY', stock: 9 }
    ]
  },
  {
    id: 'majesto-table',
    name: 'Majesto Solid Wood Center Table',
    price: 16889,
    oldPrice: 18988,
    category: 'Storage & Tables',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=800&fit=crop',
    desc: 'Grand center coffee table with brass inlaid borders and spacious lower magazine shelf.',
    inStock: true,
    stock: 7,
    material: 'Solid Sheesham Wood',
    room: 'Living Room',
    size: '40 × 24 × 18 in',
    delivery: '7–12 days',
    assembly: 'Ready to place',
    floor: 'Keep 3 ft walkway',
    variants: [
      { name: 'Walnut Finish', price: 16889, oldPrice: 18988, sku: 'MAJESTO-WALNUT', stock: 7 }
    ]
  },
  {
    id: 'homora-table',
    name: 'Homora Storage Coffee Table',
    price: 23999,
    oldPrice: 41000,
    category: 'Storage & Tables',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=800&fit=crop',
    desc: 'Lift-top storage coffee table in premium Sheesham wood with hidden internal compartments.',
    inStock: true,
    stock: 4,
    material: 'Solid Sheesham Wood',
    room: 'Living Room',
    size: '36 × 24 × 18 in',
    delivery: '7–12 days',
    assembly: 'Easy assembly',
    floor: 'Allow top lift-clearance',
    variants: [
      { name: 'Honey Finish', price: 23999, oldPrice: 41000, sku: 'HOMORA-HONEY', stock: 4 }
    ]
  }
];
