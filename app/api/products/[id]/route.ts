import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

// PUT: Update product by ID via backend API
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const updates = await request.json();

        const response = await fetch(`${BACKEND_URL}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Backend responded with status: ${response.status} - ${errorText}`);
        }

        const updatedProduct = await response.json();

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error('Error proxying product update:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to proxy update product';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

// DELETE: Remove product by ID via backend API
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const response = await fetch(`${BACKEND_URL}/products/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Backend responded with status: ${response.status} - ${errorText}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error proxying product deletion:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to proxy delete product';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
