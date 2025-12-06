import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'products.json');

// PUT: Update product by ID
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const updates = await request.json();

        // Read existing products
        const fileContents = await fs.readFile(DATA_FILE, 'utf8');
        const products = JSON.parse(fileContents);

        // Find and update the product
        const productIndex = products.findIndex((p: any) => p.id === id);
        if (productIndex === -1) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        products[productIndex] = { ...products[productIndex], ...updates };

        // Write back to file
        await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2));

        return NextResponse.json(products[productIndex]);
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

// DELETE: Remove product by ID
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Read existing products
        const fileContents = await fs.readFile(DATA_FILE, 'utf8');
        const products = JSON.parse(fileContents);

        // Filter out the product to delete
        const updatedProducts = products.filter((p: any) => p.id !== id);

        // Write back to file
        await fs.writeFile(DATA_FILE, JSON.stringify(updatedProducts, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
