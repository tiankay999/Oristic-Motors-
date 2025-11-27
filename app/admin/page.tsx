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
    const { products, addProduct, deleteProduct } = useProducts();
    const [showAddModal, setShowAddModal] = useState(false);
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
    });

    // Mock Orders
    const [orders] = useState([
        { id: 'ORD-001', customer: 'Jane Doe', total: 1650, status: 'Completed', date: '2023-10-25' },
        { id: 'ORD-002', customer: 'John Smith', total: 450, status: 'Pending', date: '2023-10-26' },
    ]);

    // Check authentication
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/admin/login');
        }
    }, [isAuthenticated, router]);

    const handleDeleteProduct = (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
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
            await addProduct({
                name: formData.name,
                slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
                price: parseFloat(formData.price),
                category: formData.category,
                description: formData.description,
                image: formData.image,
                isFeatured: formData.isFeatured,
                stock: parseInt(formData.stock),
            });

            // Show success message
            setMessage({ type: 'success', text: 'Product added successfully!' });

            // Reset form
            setShowAddModal(false);
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
            });

            // Clear message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to add product. Please try again.' });
            console.error('Error submitting product:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

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

                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-champagne-dark/30">
                            <table className="min-w-full divide-y divide-champagne-dark/30">
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
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-luxury-black">{product.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-black/70 capitalize">{product.category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-black/70">₵{product.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-black/70">{product.stock}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1 className="font-serif text-3xl font-bold text-luxury-black mb-8">Orders</h1>
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-champagne-dark/30">
                            <table className="min-w-full divide-y divide-champagne-dark/30">
                                <thead className="bg-champagne">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-luxury-black uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-luxury-black uppercase tracking-wider">Customer</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-luxury-black uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-luxury-black uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-luxury-black uppercase tracking-wider">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-champagne-dark/30">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-champagne-light/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-luxury-black">{order.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-black/70">{order.customer}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-black/70">{order.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-black/70">₵{order.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            {/* Add Product Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
                        <h2 className="font-serif text-2xl font-bold text-luxury-black mb-6">Add New Product</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-luxury-black mb-1">Product Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-champagne-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-luxury-black mb-1">Slug (optional)</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="auto-generated from name if empty"
                                    className="w-full px-4 py-2 border border-champagne-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black"
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
                                        className="w-full px-4 py-2 border border-champagne-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-luxury-black mb-1">Stock *</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        className="w-full px-4 py-2 border border-champagne-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-luxury-black mb-1">Category *</label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Product['category'] })}
                                    className="w-full px-4 py-2 border border-champagne-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black"
                                >
                                    <option value="wigs">Wigs</option>
                                    <option value="sunglasses">Sunglasses</option>
                                    <option value="turbans">Turbans</option>
                                    <option value="bags">Bags</option>
                                    <option value="footwear">Footwear</option>
                                    <option value="skincare">Skincare</option>
                                    <option value="scarfs">Scarfs</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-luxury-black mb-1">Description *</label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-champagne-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black"
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
                                        className="w-full px-4 py-2 border border-champagne-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black"
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
                                            className="w-full px-4 py-2 border border-champagne-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-luxury-black file:text-white hover:file:bg-luxury-black/90"
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
                                    {isSubmitting ? 'Adding Product...' : 'Add Product'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setMessage(null);
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
        </div>
    );
}
