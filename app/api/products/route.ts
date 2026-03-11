import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

// Enable ISR (Incremental Static Regeneration) - revalidate every 60 seconds
export const revalidate = 60;

// GET: Fetch all products from the backend API
export async function GET() {
    try {
        const response = await fetch(`${BACKEND_URL}/products`, {
            cache: 'no-store' // Fetch fresh data for now, or use 'force-cache' with revalidate
        });

        if (!response.ok) {
            throw new Error(`Backend responded with status: ${response.status}`);
        }

        const products = await response.json();

        // Pass the response through to the frontend
        return NextResponse.json(products, {
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
            },
        });
    } catch (error) {
        console.error('Critical error in GET /api/products proxy:', error);
        return NextResponse.json({ error: 'Failed to fetch products from backend' }, { status: 500 });
    }
}

// POST: Add new product to the backend API
export async function POST(request: Request) {
    try {
        const productData = await request.json();

        const response = await fetch(`${BACKEND_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Backend responded with status: ${response.status} - ${errorText}`);
        }

        const newProduct = await response.json();

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error('Error proxying product creation:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to proxy add product';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
