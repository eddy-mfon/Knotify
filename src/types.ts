export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  email?: string;
  color: string;
  quantity: number;
  hall: string;
  productNames: string;
  deposit: number;
  outstanding: number;
  status: 'Reserved' | 'Ready for Pickup' | 'Collected';
  pickupPoint: string;
  dateAdded: string;
}

export interface Product {
  id: string;
  name: string;
  seller: string;
  sellerRating: number;
  sellerHall: string;
  price: number;
  deposit: number; // Deposit amount required for reservation (Stage 6)
  originalPrice: number;
  condition: 'Brand New' | 'Like New' | 'Gently Used' | 'Used';
  category: 'Official Tie' | 'Premium' | 'Department' | 'Bow Tie';
  color: 'Navy' | 'Crimson' | 'Gold' | 'Forest Green' | 'Black' | 'Wine' | 'Stripes';
  stock: number;
  description: string;
  materials: string; // Material info for Stage 4
  pickupProcess: string; // Pickup process for Stage 4
  image: string;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const COVENANT_HALLS = [
  'Daniel Hall',
  'Joseph Hall',
  'Peter Hall',
  'Paul Hall',
  'Esther Hall',
  'Lydia Hall',
  'Mary Hall'
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'tie-corp-1',
    name: 'Blue Floral Corporate Tie',
    seller: 'Knotify Official',
    sellerRating: 4.9,
    sellerHall: 'Admin Office',
    price: 3500,
    deposit: 1500,
    originalPrice: 5000,
    condition: 'Brand New',
    category: 'Official Tie',
    color: 'Navy',
    stock: 120,
    description: 'A beautiful blue floral corporate tie.',
    materials: 'Premium 100% micro-woven polyester satin.',
    pickupProcess: 'Reserve with a ₦1,500 deposit today.',
    image: '/ties/Corporate Ties/Blue Floral Corporate Tie.jpg',
    rating: 4.9,
    reviewsCount: 84,
    isFeatured: true,
    reviews: []
  },
  {
    id: 'tie-corp-2',
    name: 'Blue Logo Corporate Tie',
    seller: 'Knotify Official',
    sellerRating: 4.9,
    sellerHall: 'Admin Office',
    price: 4500,
    deposit: 1500,
    originalPrice: 6000,
    condition: 'Brand New',
    category: 'Official Tie',
    color: 'Navy',
    stock: 95,
    description: 'Corporate tie featuring subtle logo patterns.',
    materials: 'Premium double-stitched satin blend.',
    pickupProcess: 'Reserve with a ₦1,500 deposit today.',
    image: '/ties/Corporate Ties/Blue Logo Corporate Tie.jpg',
    rating: 4.8,
    reviewsCount: 61,
    isFeatured: true,
    reviews: []
  },
  {
    id: 'tie-corp-3',
    name: 'Plain Blue Corporate Tie',
    seller: 'Knotify Official',
    sellerRating: 4.9,
    sellerHall: 'Admin Office',
    price: 3800,
    deposit: 1500,
    originalPrice: 5000,
    condition: 'Brand New',
    category: 'Official Tie',
    color: 'Navy',
    stock: 50,
    description: 'A classic, plain blue corporate tie suitable for formal presentations and daily university attire.',
    materials: '100% Woven Polyester',
    pickupProcess: 'Reserve with a ₦1,500 deposit today.',
    image: '/ties/Corporate Ties/Plain Blue  Corporate Tie.jpg',
    rating: 4.7,
    reviewsCount: 22,
    isFeatured: false,
    reviews: []
  },
  {
    id: 'tie-vint-1',
    name: 'Blue Dolphin Character Vintage Tie',
    seller: 'Vintage Collector',
    sellerRating: 4.7,
    sellerHall: 'Peter Hall',
    price: 8500,
    deposit: 2000,
    originalPrice: 10000,
    condition: 'Like New',
    category: 'Premium',
    color: 'Navy',
    stock: 1,
    description: 'A unique vintage tie with a character dolphin print.',
    materials: '100% Silk.',
    pickupProcess: 'Meet at Peter Hall lobby.',
    image: '/ties/Vintage Ties/Blue Dolphin Character Vintage Tie.jpg',
    rating: 5.0,
    reviewsCount: 2,
    isFeatured: true,
    reviews: []
  },
  {
    id: 'tie-vint-2',
    name: 'Green Diamond Vintage Tie',
    seller: 'Vintage Collector',
    sellerRating: 4.7,
    sellerHall: 'Peter Hall',
    price: 7500,
    deposit: 2000,
    originalPrice: 9000,
    condition: 'Gently Used',
    category: 'Premium',
    color: 'Forest Green',
    stock: 2,
    description: 'Classic green diamond pattern vintage tie.',
    materials: 'Silk blend.',
    pickupProcess: 'Meet at Peter Hall lobby.',
    image: '/ties/Vintage Ties/Green Diamond Vintage Tie.jpg',
    rating: 4.5,
    reviewsCount: 5,
    isFeatured: true,
    reviews: []
  },
  {
    id: 'tie-vint-3',
    name: 'Blue Pattern Character Tie',
    seller: 'Vintage Collector',
    sellerRating: 4.7,
    sellerHall: 'Peter Hall',
    price: 9000,
    deposit: 2500,
    originalPrice: 12000,
    condition: 'Like New',
    category: 'Premium',
    color: 'Navy',
    stock: 1,
    description: 'A whimsical blue character tie featuring artistic patterns and premium silk stitching.',
    materials: '100% Silk',
    pickupProcess: 'Meet at Peter Hall lobby.',
    image: '/ties/Vintage Ties/Blue Pattern Character Tie.jpg',
    rating: 4.8,
    reviewsCount: 4,
    isFeatured: false,
    reviews: []
  },
  {
    id: 'tie-vint-4',
    name: 'Blue Pattern Vintage Tie',
    seller: 'Sartorial Finds',
    sellerRating: 4.6,
    sellerHall: 'Joseph Hall',
    price: 8000,
    deposit: 2000,
    originalPrice: 11000,
    condition: 'Gently Used',
    category: 'Premium',
    color: 'Navy',
    stock: 1,
    description: 'An authentic vintage tie with a detailed blue pattern and smooth finish.',
    materials: 'Silk blend',
    pickupProcess: 'Meet at Joseph Hall lobby.',
    image: '/ties/Vintage Ties/Blue Pattern Vintage Tie.jpg',
    rating: 4.6,
    reviewsCount: 3,
    isFeatured: false,
    reviews: []
  },
  {
    id: 'tie-vint-5',
    name: 'Bright Abstract Vintage Tie',
    seller: 'Dapper Vault',
    sellerRating: 4.8,
    sellerHall: 'Paul Hall',
    price: 9500,
    deposit: 3000,
    originalPrice: 13000,
    condition: 'Like New',
    category: 'Premium',
    color: 'Gold',
    stock: 1,
    description: 'Vibrant, bright abstract patterns that deliver an eye-catching retro aesthetic.',
    materials: '100% Jacquard Silk',
    pickupProcess: 'Meet at Paul Hall lobby.',
    image: '/ties/Vintage Ties/Bright Abstract Vintage Tie.jpg',
    rating: 4.9,
    reviewsCount: 7,
    isFeatured: true,
    reviews: []
  },
  {
    id: 'tie-vint-6',
    name: 'Cool Abstract Vintage Tie',
    seller: 'Vintage Collector',
    sellerRating: 4.7,
    sellerHall: 'Peter Hall',
    price: 8700,
    deposit: 2500,
    originalPrice: 11500,
    condition: 'Gently Used',
    category: 'Premium',
    color: 'Stripes',
    stock: 1,
    description: 'A cool abstract patterns design on silk, showcasing high-end vintage craftsmanship.',
    materials: '100% Silk',
    pickupProcess: 'Meet at Peter Hall lobby.',
    image: '/ties/Vintage Ties/Cool Abstract Vintage Tie.jpg',
    rating: 4.7,
    reviewsCount: 5,
    isFeatured: false,
    reviews: []
  },
  {
    id: 'tie-vint-7',
    name: 'Ducky Character Vintage Tie',
    seller: 'Legendary Ties',
    sellerRating: 4.9,
    sellerHall: 'Esther Hall',
    price: 12000,
    deposit: 4000,
    originalPrice: 16000,
    condition: 'Like New',
    category: 'Premium',
    color: 'Gold',
    stock: 1,
    description: 'Inspired by iconic vintage fashion, featuring playful yellow ducky patterns.',
    materials: 'Premium Silk',
    pickupProcess: 'Meet at Esther Hall lobby.',
    image: '/ties/Vintage Ties/Ducky Character Vintage Tie.jpg',
    rating: 5.0,
    reviewsCount: 11,
    isFeatured: true,
    reviews: []
  },
  {
    id: 'tie-vint-8',
    name: 'Floral Vintage Tie',
    seller: 'Dapper Vault',
    sellerRating: 4.8,
    sellerHall: 'Paul Hall',
    price: 7200,
    deposit: 2000,
    originalPrice: 9500,
    condition: 'Used',
    category: 'Premium',
    color: 'Crimson',
    stock: 3,
    description: 'A classic floral motif from the late 90s, offering vintage elegance.',
    materials: 'Satin-Silk Blend',
    pickupProcess: 'Meet at Paul Hall lobby.',
    image: '/ties/Vintage Ties/Floral Vintage Tie.jpg',
    rating: 4.4,
    reviewsCount: 8,
    isFeatured: false,
    reviews: []
  },
  {
    id: 'tie-vint-9',
    name: 'Green Eye Pattern Vintage Tie',
    seller: 'Sartorial Finds',
    sellerRating: 4.6,
    sellerHall: 'Joseph Hall',
    price: 8900,
    deposit: 2500,
    originalPrice: 12500,
    condition: 'Like New',
    category: 'Premium',
    color: 'Forest Green',
    stock: 1,
    description: 'An intriguing eye pattern overlay on deep green fabric for a highly unique look.',
    materials: '100% Woven Silk',
    pickupProcess: 'Meet at Joseph Hall lobby.',
    image: '/ties/Vintage Ties/Green Eye Pattern Vintage Tie.jpg',
    rating: 4.8,
    reviewsCount: 3,
    isFeatured: false,
    reviews: []
  },
  {
    id: 'tie-vint-10',
    name: 'Wavy Sea Blue Pattern Vintage Tie',
    seller: 'Vintage Collector',
    sellerRating: 4.7,
    sellerHall: 'Peter Hall',
    price: 9800,
    deposit: 3000,
    originalPrice: 14000,
    condition: 'Like New',
    category: 'Premium',
    color: 'Navy',
    stock: 1,
    description: 'A captivating wavy sea pattern in shades of blue, conveying calm and style.',
    materials: 'Pure Mulberry Silk',
    pickupProcess: 'Meet at Peter Hall lobby.',
    image: '/ties/Vintage Ties/Wavy Sea Blue Pattern Vintage Tie.jpg',
    rating: 4.9,
    reviewsCount: 9,
    isFeatured: true,
    reviews: []
  },
  {
    id: 'tie-vint-11',
    name: 'Wine Pattern Character Tie',
    seller: 'Legendary Ties',
    sellerRating: 4.9,
    sellerHall: 'Esther Hall',
    price: 9200,
    deposit: 3000,
    originalPrice: 13000,
    condition: 'Gently Used',
    category: 'Premium',
    color: 'Wine',
    stock: 2,
    description: 'A handsome wine-red tie decorated with distinctive character illustrations.',
    materials: 'Silk blend',
    pickupProcess: 'Meet at Esther Hall lobby.',
    image: '/ties/Vintage Ties/Wine Pattern Character Tie.jpg',
    rating: 4.7,
    reviewsCount: 6,
    isFeatured: false,
    reviews: []
  }
];
