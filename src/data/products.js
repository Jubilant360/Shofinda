export const CATEGORIES = [
  { id: 'all', name: 'All Categories', slug: 'all' },
  { id: 'electronics', name: 'Electronics & Audio', slug: 'electronics' },
  { id: 'luxury-tech', name: 'Luxury & Wearables', slug: 'luxury-tech' },
  { id: 'gaming', name: 'Gaming & Setup', slug: 'gaming' },
  { id: 'fashion', name: 'Apparel & Accessories', slug: 'fashion' }
];

export const PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Aether Sound Studio Wireless Headphones',
    slug: 'aether-sound-studio-headphones',
    categoryId: 'electronics',
    categoryName: 'Electronics & Audio',
    price: 349.99,
    originalPrice: 429.99,
    rating: 4.9,
    reviewsCount: 142,
    stockQuantity: 18,
    isFeatured: true,
    badgeText: 'BEST SELLER',
    badgeType: 'orange',
    imageUrl: '/images/headphones.jpg',
    secondaryImages: [
      '/images/headphones.jpg',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'
    ],
    description: 'Experience studio-grade acoustic precision with active spatial noise-canceling, ultra-soft memory foam earcups, and custom 40mm titanium drivers. Delivers 45-hour battery life with 10-minute fast charging.',
    specs: [
      { label: 'Battery Life', value: '45 Hours ANC On' },
      { label: 'Connectivity', value: 'Bluetooth 5.3 + 3.5mm Low-Latency' },
      { label: 'Active Noise Cancellation', value: 'Hybrid Adaptive 45dB' },
      { label: 'Weight', value: '265g' }
    ]
  },
  {
    id: 'prod-2',
    title: 'Orion X Pro Flagship Smartphone 5G',
    slug: 'orion-x-pro-smartphone',
    categoryId: 'luxury-tech',
    categoryName: 'Luxury & Wearables',
    price: 1199.00,
    originalPrice: 1299.00,
    rating: 4.8,
    reviewsCount: 98,
    stockQuantity: 7,
    isFeatured: true,
    badgeText: 'FLAGSHIP',
    badgeType: 'blue',
    imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80'
    ],
    description: 'Crafted with aerospace-grade titanium bezel, 120Hz Dynamic AMOLED display, 200MP Quad AI Camera Array, and Snapdragon 8 Gen 3 processor.',
    specs: [
      { label: 'Display', value: '6.8" 120Hz LTPO AMOLED' },
      { label: 'Camera', value: '200MP Main + 50MP Periscope 10x' },
      { label: 'Storage', value: '512GB UFS 4.0' },
      { label: 'Water Resistance', value: 'IP68 Certified' }
    ]
  },
  {
    id: 'prod-3',
    title: 'Chronos Apex Titanium Smartwatch V2',
    slug: 'chronos-apex-smartwatch',
    categoryId: 'luxury-tech',
    categoryName: 'Luxury & Wearables',
    price: 499.00,
    originalPrice: 599.00,
    rating: 4.7,
    reviewsCount: 65,
    stockQuantity: 12,
    isFeatured: true,
    badgeText: 'NEW',
    badgeType: 'purple',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80'
    ],
    description: 'Continuous ECG bio-sensor, Sapphire Crystal glass, 100m water resistance, and real-time offline GPS navigation wrapped in hand-polished grade 5 titanium.',
    specs: [
      { label: 'Display', value: '1.4" Always-On Sapphire Glass' },
      { label: 'Sensors', value: 'ECG, SpO2, HRV, Depth & Altimeter' },
      { label: 'Battery', value: 'Up to 14 Days Typical Use' }
    ]
  },
  {
    id: 'prod-4',
    title: 'Vortex RGB Curved Ultrawide Gaming Monitor 34"',
    slug: 'vortex-rgb-ultrawide-monitor',
    categoryId: 'gaming',
    categoryName: 'Gaming & Setup',
    price: 849.99,
    originalPrice: 999.99,
    rating: 4.9,
    reviewsCount: 210,
    stockQuantity: 5,
    isFeatured: true,
    badgeText: 'GAMING PICK',
    badgeType: 'orange',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&q=80'
    ],
    description: '34-inch QD-OLED 1800R curved monitor delivering 0.03ms response time, 240Hz refresh rate, HDR1000 peak brightness, and ambient backlighting sync.',
    specs: [
      { label: 'Panel', value: '34" WQHD QD-OLED 3440x1440' },
      { label: 'Refresh Rate', value: '240Hz Native G-Sync / FreeSync' },
      { label: 'Response Time', value: '0.03ms GTG' }
    ]
  },
  {
    id: 'prod-5',
    title: 'CyberDeck Hotswap Mechanical Keyboard (Gateron Switches)',
    slug: 'cyberdeck-mechanical-keyboard',
    categoryId: 'gaming',
    categoryName: 'Gaming & Setup',
    price: 189.50,
    originalPrice: 220.00,
    rating: 4.6,
    reviewsCount: 84,
    stockQuantity: 24,
    isFeatured: false,
    badgeText: 'POPULAR',
    badgeType: 'blue',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    secondaryImages: [],
    description: 'Gasket-mounted aluminum chassis with PBT double-shot keycaps, hot-swappable PCB, customizable per-key RGB, and tri-mode wireless connectivity.',
    specs: [
      { label: 'Mounting', value: 'Silicone Gasket Mount' },
      { label: 'Switches', value: 'Lubed Gateron Oil Kings' },
      { label: 'Battery', value: '4000mAh Wireless' }
    ]
  },
  {
    id: 'prod-6',
    title: 'Zenith Minimalist Italian Leather Messenger Bag',
    slug: 'zenith-leather-messenger-bag',
    categoryId: 'fashion',
    categoryName: 'Apparel & Accessories',
    price: 279.00,
    originalPrice: 340.00,
    rating: 4.9,
    reviewsCount: 52,
    stockQuantity: 9,
    isFeatured: false,
    badgeText: 'LUXURY',
    badgeType: 'purple',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
    secondaryImages: [],
    description: 'Handcrafted from full-grain Tuscan leather with magnetic quick-release clasps, dedicated padded 16-inch laptop compartment, and weatherproof lining.',
    specs: [
      { label: 'Material', value: '100% Full-Grain Tuscan Leather' },
      { label: 'Capacity', value: '18 Liters' },
      { label: 'Warranty', value: 'Lifetime Guarantee' }
    ]
  },
  {
    id: 'prod-7',
    title: 'AeroLight Carbon Fiber Smart Backpack',
    slug: 'aerolight-carbon-backpack',
    categoryId: 'fashion',
    categoryName: 'Apparel & Accessories',
    price: 159.00,
    originalPrice: 199.00,
    rating: 4.7,
    reviewsCount: 119,
    stockQuantity: 15,
    isFeatured: false,
    badgeText: 'WATERPROOF',
    badgeType: 'blue',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    secondaryImages: [],
    description: 'Ultra lightweight ergonomic backpack with integrated USB-C 100W fast charge port, TSA combination lock, and hidden anti-theft back pocket.',
    specs: [
      { label: 'Material', value: 'Ballistic Carbon Weave Nylon' },
      { label: 'Ports', value: 'External USB-C 100W Power Pass-through' }
    ]
  },
  {
    id: 'prod-8',
    title: 'Lumina Studio AI Smart Desk Lamp',
    slug: 'lumina-studio-smart-desk-lamp',
    categoryId: 'electronics',
    categoryName: 'Electronics & Audio',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviewsCount: 76,
    stockQuantity: 30,
    isFeatured: false,
    badgeText: 'SMART HOME',
    badgeType: 'orange',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    secondaryImages: [],
    description: 'Adaptive ambient temperature sensor auto-adjusts light warmth based on circadian rhythms. Features built-in 15W Qi wireless charger base.',
    specs: [
      { label: 'Brightness', value: '1200 Lumens CRI > 97' },
      { label: 'Charging Base', value: '15W Qi Fast Wireless' }
    ]
  }
];
