import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'products.json');

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
        const fileContents = await fs.readFile(DATA_FILE, 'utf8');
        const products = JSON.parse(fileContents);
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error reading products:', error);
        return NextResponse.json([], { status: 500 });
    }
}

// POST: Add new product
export async function POST(request: Request) {
    try {
        await ensureDataDir();
        const newProduct = await request.json();

        // Read existing products
        const fileContents = await fs.readFile(DATA_FILE, 'utf8');
        const products = JSON.parse(fileContents);

        // Add new product
        products.push(newProduct);

        // Write back to file
        await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2));

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error('Error adding product:', error);
        return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
    }
}
