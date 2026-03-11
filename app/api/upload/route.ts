import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        // Forward the formdata to the backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006'}/api/upload-images`, {
            method: 'POST',
            body: formData,
            // Don't set Content-Type header manually, fetch will set it beautifully with the boundary
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Backend responded with ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Proxy upload error:', error);
        return NextResponse.json(
            { message: error.message || 'Failed to upload images' },
            { status: 500 }
        );
    }
}
