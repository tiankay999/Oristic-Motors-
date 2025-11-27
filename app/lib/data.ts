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
        description: 'Premium quality bone straight hair, silky and smooth. Perfect for a glamorous look.',
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
        description: 'Chic oversized sunglasses for a glamorous look. UV protection included.',
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
        description: 'Soft velvet turban, perfect for any occasion. Comfortable and stylish.',
        image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&q=80&w=800',
        isFeatured: false,
        stock: 50,
    },
    {
        id: '4',
        name: 'Leather Crossbody Bag',
        slug: 'leather-crossbody-bag',
        price: 450,
        category: 'bags',
        description: 'Genuine leather crossbody bag with gold accents. Spacious and elegant.',
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
        description: 'Elegant gold heels for your special events. Comfortable fit.',
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
        description: 'Rejuvenating serum for glowing skin. All natural ingredients.',
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
        description: '100% silk scarf with unique patterns. Soft and luxurious.',
        image: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&q=80&w=800',
        isFeatured: false,
        stock: 30,
    },
    {
        id: '8',
        name:'Authentic Scarf',
        slug: 'authentic-scarf',
        price: 200,
        category: 'scarfs',
        description: '100% silk scarf with unique patterns. Soft and luxurious.',
        image: 'https://eu-images.contentstack.com/v3/assets/blt7dcd2cfbc90d45de/bltf3590877fe05ae6f/633ec071c3ed6a1034872f1c/1-1saren.jpg?format=pjpg&auto=webp&quality=75%2C90&width=3840',
        isFeatured: true,
        stock: 30,
    },
];

export const categories = [
    { name: 'Wigs', slug: 'wigs', image: 'https://i.ebayimg.com/images/g/WaUAAOSwoIRnW~~N/s-l400.jpg' },
    { name: 'Sunglasses', slug: 'sunglasses', image: 'https://images2.ray-ban.com//cdn-record-files-pi/1d3147b3-6d35-46eb-8108-a35801354564/06a95c2b-5871-4d1f-a347-ad33014afe0c/0RB3016__W0366__STD__shad__qt.png?impolicy=RB_Product_clone&width=700&bgc=%23f2f2f2' },
    { name: 'Turbans', slug: 'turbans', image: 'https://m.media-amazon.com/images/I/61JX2D4alRL.jpg' },
    { name: 'Bags', slug: 'bags', image: 'https://images-na.ssl-images-amazon.com/images/I/81sNMpZnPQL._UL500_.jpg' },
    { name: 'Footwear', slug: 'footwear', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800' },
    { name: 'Skincare', slug: 'skincare', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800' },
    { name: 'Scarfs', slug: 'scarfs', image: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&q=80&w=800' },
];
