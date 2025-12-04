'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { Product } from '../lib/data';

export default function AdminPage() {
    const router = useRouter();
    const { isAuthenticated, logout } = useAuth();
    const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const [showAddModal, setShowAddModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingProductId, setEditingProductId] = useState<string | null>(null);
    const [imageMode, setImageMode] = useState<'url' | 'upload'>('url');
    const [imagePreview, setImagePreview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        price: '',
        category: 'wigs' as Product['category'],
        description: '',
        image: '',
        isFeatured: false,
        stock: '',
        discountPercent: '',
    });

    // Orders state
    const [orders, setOrders] = useState<any[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [showOrderModal, setShowOrderModal] = useState(false);

    // Check authentication
    useEffect(() => {
        if (!isAuthenticated && !localStorage.getItem('adminToken')) {
            // We check localStorage directly here as a fallback or initial check
            // But ideally we rely on isAdmin from context. 
            // However, context might take a moment to load.
            // Let's rely on the context's isAdmin if possible, or redirect if not admin.
        }
    }, [isAuthenticated, router]);

    // Better approach: Protect the route based on isAdmin
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin/login');
        }
    }, [router]);

    const handleDeleteProduct = (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    const handleEditProduct = (product: Product) => {
        setIsEditMode(true);
        setEditingProductId(product.id.toString());
        setFormData({
            name: product.name,
            slug: product.slug,
            price: product.price.toString(),
            category: product.category,
            description: product.description,
            image: product.image,
            isFeatured: product.isFeatured || false,
            stock: product.stock?.toString() || '0',
            discountPercent: product.discountPercent?.toString() || '0',
        });
        setImagePreview(product.image);
        setShowAddModal(true);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormData({ ...formData, image: base64String });
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        try {
            if (isEditMode && editingProductId) {
                // Update existing product
                await updateProduct(editingProductId, {
                    name: formData.name,
                    slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
                    price: parseFloat(formData.price),
                    category: formData.category,
                    description: formData.description,
                    image: formData.image,
                    isFeatured: formData.isFeatured,
                    stock: parseInt(formData.stock),
                    discountPercent: parseInt(formData.discountPercent) || 0,
                });
                setMessage({ type: 'success', text: 'Product updated successfully!' });
            } else {
                // Add new product
                await addProduct({
                    name: formData.name,
                    slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
                    price: parseFloat(formData.price),
                    category: formData.category,
                    description: formData.description,
                    image: formData.image,
                    isFeatured: formData.isFeatured,
                    stock: parseInt(formData.stock),
                    discountPercent: parseInt(formData.discountPercent) || 0,
                });
                setMessage({ type: 'success', text: 'Product added successfully!' });
            }

            // Reset form
            setShowAddModal(false);
            setIsEditMode(false);
            setEditingProductId(null);
            setImageMode('url');
            setImagePreview('');
            setFormData({
                name: '',
                slug: '',
                price: '',
                category: 'wigs',
                description: '',
                image: '',
                isFeatured: false,
                stock: '',
                discountPercent: '',
            });

            // Clear message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: `Failed to ${isEditMode ? 'update' : 'add'} product. Please try again.` });
            console.error('Error submitting product:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Fetch orders
    useEffect(() => {
        if (activeTab === 'orders') {
            fetch('http://localhost:5006/all-orders')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setOrders(data);
                    }
                })
                .catch(err => console.error('Error fetching orders:', err));
        }
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-champagne-light flex">
            {/* Sidebar */}
            <aside className="w-64 bg-champagne border-r border-champagne-dark/30 hidden md:block">
                <div className="p-8">
                    <h2 className="font-serif text-2xl font-bold text-luxury-black">Admin</h2>
                    <button
                        onClick={logout}
                        className="mt-4 text-sm text-luxury-black/60 hover:text-luxury-black transition-colors"
                    >
                        Logout
                    </button>
                </div>
                <nav className="mt-4 px-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${activeTab === 'products'
                            ? 'bg-luxury-black text-white shadow-md'
                            : 'text-luxury-black/70 hover:bg-champagne-dark/20'
                            }`}
                    >
                        Products
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${activeTab === 'orders'
                            ? 'bg-luxury-black text-white shadow-md'
                            : 'text-luxury-black/70 hover:bg-champagne-dark/20'
                            }`}
                    >
                        Orders
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="md:hidden mb-6 flex gap-4">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`px-4 py-2 rounded-full ${activeTab === 'products' ? 'bg-luxury-black text-white' : 'bg-white text-luxury-black'}`}
                    >
                        Products
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`px-4 py-2 rounded-full ${activeTab === 'orders' ? 'bg-luxury-black text-white' : 'bg-white text-luxury-black'}`}
                    >
                        Orders
                    </button>
                </div>

                {activeTab === 'products' ? (
                    <div>
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="font-serif text-3xl font-bold text-luxury-black">Products</h1>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="bg-luxury-black text-white px-6 py-2.5 rounded-full hover:bg-luxury-black/90 shadow-md transition-all"
                            >
                                Add New Product
                            </button>
                        </div>

                        {/* Success/Error Message */}
                        {message && (
                            <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                                <p className="font-medium">{message.text}</p>
                            </div>
                        )}

                        {/* Products List - Responsive */}
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-champagne-dark/30">
                            {/* Desktop Table View */}
                            <table className="min-w-full divide-y divide-champagne-dark/30 hidden md:table">
                                <thead className="bg-champagne">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-luxury-black uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-luxury-black uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-luxury-black uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-luxury-black uppercase tracking-wider">Stock</th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-luxury-black uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-champagne-dark/30">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-champagne-light/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-luxury-black">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                                        <img src={product.image} alt="" className="h-full w-full object-cover" />
                                                    </div>
                                                    {product.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-black/70 capitalize">{product.category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-black/70">₵{product.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-black/70">{product.stock}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex gap-2 justify-end">
                                                    <button onClick={() => handleEditProduct(product)} className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-full transition-colors">Edit</button>
                                                    <button onClick={() => handleDeleteProduct(product.id.toString())} className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-full transition-colors">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Mobile Card View */}
                            <div className="md:hidden divide-y divide-champagne-dark/30">
                                {products.map((product) => (
                                    <div key={product.id} className="p-4 flex flex-col gap-3">
                                        <div className="flex items-start gap-4">
                                            <div className="h-20 w-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-base font-medium text-luxury-black truncate">{product.name}</h3>
                                                <p className="text-sm text-luxury-black/60 capitalize">{product.category}</p>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-sm font-bold text-luxury-black">₵{product.price}</span>
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">Stock: {product.stock}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 pt-2">
                                            <button
                                                onClick={() => handleEditProduct(product)}
                                                className="flex-1 text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id.toString())}
                                                className="flex-1 text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1 className="font-serif text-3xl font-bold text-luxury-black mb-8">Orders</h1>
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-champagne-dark/30">
                            {/* Desktop Table View */}
                            <table className="min-w-full divide-y divide-champagne-dark/30 hidden md:table">
                                <thead className="bg-champagne">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-luxury-black uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-luxury-black uppercase tracking-wider">Customer</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-luxury-black uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-luxury-black uppercase tracking-wider">Total</th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-luxury-black uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-champagne-dark/30">
                                    {orders.map((order: any) => (
                                        <tr key={order.id} className="hover:bg-champagne-light/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-luxury-black">#{order.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-black/70">
                                                {order.firstName} {order.lastName}<br />
                                                <span className="text-xs text-gray-500">{order.email}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-black/70">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-black/70">₵{order.totalAmount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => {
                                                        setSelectedOrder(order);
                                                        setShowOrderModal(true);
                                                    }}
                                                    className="text-luxury-black hover:text-luxury-black/70 bg-gray-100 px-3 py-1 rounded-full transition-colors"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Mobile Card View */}
                            <div className="md:hidden divide-y divide-champagne-dark/30">
                                {orders.map((order: any) => (
                                    <div key={order.id} className="p-4 flex flex-col gap-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-base font-medium text-luxury-black">Order #{order.id}</h3>
                                                <p className="text-sm text-luxury-black/60">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <span className="text-base font-bold text-luxury-black">₵{order.totalAmount}</span>
                                        </div>
                                        <div className="text-sm text-luxury-black/80">
                                            <p className="font-medium">{order.firstName} {order.lastName}</p>
                                            <p className="text-xs text-gray-500">{order.email}</p>
                                        </div>
                                        <div className="pt-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setShowOrderModal(true);
                                                }}
                                                className="w-full bg-luxury-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-luxury-black/90 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                View Order Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Add Product Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
                        <h2 className="font-serif text-2xl font-bold text-luxury-black mb-6">{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-luxury-black mb-1">Product Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 text-black border border-champagne-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-luxury-black mb-1">Slug (optional)</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="auto-generated from name if empty"
                                    className="w-full px-4 py-2 text-black border border-champagne-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-luxury-black mb-1">Price (₵) *</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full px-4 py-2 text-black border border-champagne-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-luxury-black mb-1">Stock *</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        className="w-full px-4 py-2 text-black border border-champagne-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-luxury-black mb-1">Discount (%)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.discountPercent}
                                    onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
                                    placeholder="0"
                                    className="w-full px-4 py-2 text-black border border-champagne-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black"
                                />
                                <p className="text-xs text-luxury-black/60 mt-1">Enter discount percentage (e.g., 20 for 20% off)</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-luxury-black mb-1">Category *</label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Product['category'] })}
                                    className="w-full px-4 py-2 border border-champagne-dark  text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black"
                                >
                                    <option value="wigs">Wigs</option>
                                    <option value="sunglasses">Sunglasses</option>
                                    <option value="turbans">Turbans</option>
                                    <option value="bags">Bags</option>
                                    <option value="footwear">Footwear</option>
                                    <option value="skincare">Skincare</option>
                                    <option value="scarfs">Scarfs</option>
                                    <option value="more">More (Jewelry & Accessories)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-luxury-black mb-1">Description *</label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-champagne-dark text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-luxury-black mb-2">Product Image *</label>

                                {/* Tab Buttons */}
                                <div className="flex gap-2 mb-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImageMode('url');
                                            setImagePreview('');
                                        }}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${imageMode === 'url'
                                            ? 'bg-luxury-black text-white'
                                            : 'bg-champagne text-luxury-black hover:bg-champagne-dark'
                                            }`}
                                    >
                                        Image URL
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setImageMode('upload')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${imageMode === 'upload'
                                            ? 'bg-luxury-black text-white'
                                            : 'bg-champagne text-luxury-black hover:bg-champagne-dark'
                                            }`}
                                    >
                                        Upload from Device
                                    </button>
                                </div>

                                {/* URL Input */}
                                {imageMode === 'url' && (
                                    <input
                                        type="url"
                                        required={imageMode === 'url'}
                                        value={formData.image}
                                        onChange={(e) => {
                                            setFormData({ ...formData, image: e.target.value });
                                            setImagePreview(e.target.value);
                                        }}
                                        placeholder="https://images.unsplash.com/..."
                                        className="w-full px-4 py-2 border text-black border-champagne-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black"
                                    />
                                )}

                                {/* File Upload */}
                                {imageMode === 'upload' && (
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            required={imageMode === 'upload' && !formData.image}
                                            onChange={handleImageUpload}
                                            className="w-full px-4 py-2 border text-black border-champagne-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-luxury-black file:text-white hover:file:bg-luxury-black/90"
                                        />
                                        <p className="mt-1 text-xs text-luxury-black/60">
                                            Upload an image from your device (JPG, PNG, WebP)
                                        </p>
                                    </div>
                                )}

                                {/* Image Preview */}
                                {(imagePreview || formData.image) && (
                                    <div className="mt-3">
                                        <p className="text-xs font-medium text-luxury-black mb-2">Preview:</p>
                                        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-champagne-dark/20">
                                            <img
                                                src={imagePreview || formData.image}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={formData.isFeatured}
                                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                    className="mr-2"
                                />
                                <label htmlFor="featured" className="text-sm font-medium text-luxury-black">Featured Product</label>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 bg-luxury-black text-white px-6 py-3 rounded-full hover:bg-luxury-black/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Product' : 'Add Product')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setIsEditMode(false);
                                        setEditingProductId(null);
                                        setMessage(null);
                                        setFormData({
                                            name: '',
                                            slug: '',
                                            price: '',
                                            category: 'wigs',
                                            description: '',
                                            image: '',
                                            isFeatured: false,
                                            stock: '',
                                            discountPercent: '',
                                        });
                                        setImagePreview('');
                                    }}
                                    disabled={isSubmitting}
                                    className="flex-1 bg-champagne-dark text-luxury-black px-6 py-3 rounded-full hover:bg-champagne-dark/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Order Details Modal */}
            {showOrderModal && selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="font-serif text-2xl font-bold text-luxury-black">Order Details</h2>
                                <p className="text-sm text-gray-500">#{selectedOrder.id}</p>
                            </div>
                            <button
                                onClick={() => setShowOrderModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Customer Info */}
                            <div className="bg-champagne-light/30 p-4 rounded-xl border border-champagne-dark/20">
                                <h3 className="font-medium text-luxury-black mb-3 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-luxury-black/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Customer Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500">Name</p>
                                        <p className="font-medium text-luxury-black">{selectedOrder.firstName} {selectedOrder.lastName}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Email</p>
                                        <p className="font-medium text-luxury-black">{selectedOrder.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Phone</p>
                                        <p className="font-medium text-luxury-black">{selectedOrder.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Address</p>
                                        <p className="font-medium text-luxury-black">{selectedOrder.address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="font-medium text-luxury-black mb-3 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-luxury-black/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Ordered Items
                                </h3>
                                <div className="border border-champagne-dark/20 rounded-xl overflow-hidden">
                                    <table className="min-w-full divide-y divide-champagne-dark/20">
                                        <thead className="bg-champagne-light/50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Qty</th>
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-champagne-dark/20 bg-white">
                                            {selectedOrder.items && Array.isArray(selectedOrder.items) ? (
                                                selectedOrder.items.map((item: any, index: number) => (
                                                    <tr key={index}>
                                                        <td className="px-4 py-3 text-sm text-luxury-black">{item.name || 'Product Name'}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-500 text-right">₵{item.price}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-500 text-right">{item.quantity}</td>
                                                        <td className="px-4 py-3 text-sm font-medium text-luxury-black text-right">₵{item.price * item.quantity}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500 text-sm">
                                                        No item details available for this order.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                        <tfoot className="bg-champagne-light/30">
                                            <tr>
                                                <td colSpan={3} className="px-4 py-3 text-sm font-bold text-luxury-black text-right">Total Amount</td>
                                                <td className="px-4 py-3 text-sm font-bold text-luxury-black text-right">₵{selectedOrder.totalAmount}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={() => setShowOrderModal(false)}
                                className="bg-luxury-black text-white px-6 py-2.5 rounded-full hover:bg-luxury-black/90 transition-all"
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
