export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    category: 'wigs' | 'sunglasses' | 'turbans' | 'bags' | 'footwear' | 'skincare' | 'scarfs';
    description: string;
    image: string;
    isFeatured: boolean;
    discountPercent?: number;
    stock: number;
}

export interface Order {
    id: string;
    customerName: string;
    items: { productId: string; quantity: number }[];
    total: number;
    status: 'pending' | 'completed' | 'cancelled';
    date: string;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Luxury Silk Bone Straight Wig',
        slug: 'luxury-silk-bone-straight-wig',
        price: 1500,
        category: 'wigs',
        description: 'Premium quality bone straight hair, silky and smooth.',
        image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=800',
        isFeatured: true,
        stock: 10,
    },
    {
        id: '2',
        name: 'Oversized Cat-Eye Sunglasses',
        slug: 'oversized-cat-eye-sunglasses',
        price: 150,
        category: 'sunglasses',
        description: 'Chic oversized sunglasses for a glamorous look.',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
        isFeatured: true,
        stock: 25,
    },
    {
        id: '3',
        name: 'Velvet Turban',
        slug: 'velvet-turban',
        price: 80,
        category: 'turbans',
        description: 'Soft velvet turban, perfect for any occasion.',
        image: 'https://images.unsplash.com/photo-1566958761012-1829685434e3?auto=format&fit=crop&q=80&w=800',
        isFeatured: false,
        stock: 50,
    },
    {
        id: '4',
        name: 'Leather Crossbody Bag',
        slug: 'leather-crossbody-bag',
        price: 450,
        category: 'bags',
        description: 'Genuine leather crossbody bag with gold accents.',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
        isFeatured: true,
        stock: 15,
    },
    {
        id: '5',
        name: 'Strappy Gold Heels',
        slug: 'strappy-gold-heels',
        price: 300,
        category: 'footwear',
        description: 'Elegant gold heels for your special events.',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
        isFeatured: false,
        stock: 20,
    },
    {
        id: '6',
        name: 'Hydrating Face Serum',
        slug: 'hydrating-face-serum',
        price: 120,
        category: 'skincare',
        description: 'Rejuvenating serum for glowing skin.',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
        isFeatured: true,
        stock: 40,
    },
    {
        id: '7',
        name: 'Silk Scarf',
        slug: 'silk-scarf',
        price: 90,
        category: 'scarfs',
        description: '100% silk scarf with unique patterns.',
        image: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&q=80&w=800',
        isFeatured: false,
        stock: 30,
    },
];

export const categories = [
    { name: 'Wigs', slug: 'wigs' },
    { name: 'Sunglasses', slug: 'sunglasses' },
    { name: 'Turbans', slug: 'turbans' },
    { name: 'Bags', slug: 'bags' },
    { name: 'Footwear', slug: 'footwear' },
    { name: 'Skincare', slug: 'skincare' },
    { name: 'Scarfs', slug: 'scarfs' },
];
