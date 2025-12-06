import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'products.json');

// Enable ISR (Incremental Static Regeneration) - revalidate every 60 seconds
export const revalidate = 60;

// Ensure data directory exists
async function ensureDataDir() {
    const dataDir = path.join(process.cwd(), 'data');
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }
}

// GET: Fetch all products
export async function GET() {
    try {
        await ensureDataDir();

        try {
            const fileContents = await fs.readFile(DATA_FILE, 'utf8');
            const products = JSON.parse(fileContents);
            console.log(`Successfully loaded ${products.length} products`);

            // Add aggressive caching headers for CDN and browser caching
            return NextResponse.json(products, {
                headers: {
                    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
                },
            });
        } catch (error) {
            // File doesn't exist, initialize with empty array
            console.log('Products file not found, initializing with empty array');
            console.error('File read error:', error);
            await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));

            return NextResponse.json([], {
                headers: {
                    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
                },
            });
        }
    } catch (error) {
        console.error('Critical error in GET /api/products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

// POST: Add new product
export async function POST(request: Request) {
    try {
        await ensureDataDir();
        const newProduct = await request.json();

        let products = [];

        // Read existing products or initialize empty array
        try {
            const fileContents = await fs.readFile(DATA_FILE, 'utf8');
            products = JSON.parse(fileContents);
        } catch (error) {
            // File doesn't exist yet, start with empty array
            console.log('Initializing new products file');
            products = [];
        }

        // Add new product
        products.push(newProduct);

        // Write back to file
        await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2));

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error('Error adding product:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to add product';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
