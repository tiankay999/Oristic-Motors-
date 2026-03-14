'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Product } from '../lib/data';

interface Order {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    totalAmount: number;
    items: any[];
    createdAt: string;
}

const CAR_CATEGORIES = [
    { value: 'suv', label: 'SUV' },
    { value: 'hatchback', label: 'Hatchback' },
    { value: 'crossover', label: 'Crossover' },
    { value: 'convertible', label: 'Convertible' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'sports-car', label: 'Sports Car' },
    { value: 'coupe', label: 'Coupe' },
    { value: 'minivan', label: 'Minivan' },
];

export default function AdminPage() {
    const { isAdmin, adminToken, isLoading: authLoading } = useAuth();
    const { products, addProduct, updateProduct, deleteProduct, isLoading: productsLoading } = useProducts();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'vehicles' | 'orders'>('vehicles');
    const [orders, setOrders] = useState<Order[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(false);

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'suv',
        stock: '',
        discountPercent: '0',
        images: ['', '', '', '', '', ''],
    });

    useEffect(() => {
        if (!authLoading && !isAdmin) {
            router.push('/admin/login');
        }
    }, [authLoading, isAdmin, router]);

    useEffect(() => {
        if (activeTab === 'orders' && adminToken) {
            setOrdersLoading(true);
            fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006'}/all-orders`, {
                headers: { 'Authorization': `Bearer ${adminToken}` },
            })
                .then(res => res.json())
                .then(data => {
                    setOrders(Array.isArray(data) ? data : []);
                    setOrdersLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setOrdersLoading(false);
                });
        }
    }, [activeTab, adminToken]);

    const openAddModal = () => {
        setEditingProduct(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            category: 'suv',
            stock: '',
            discountPercent: '0',
            images: ['', '', '', '', '', ''],
        });
        setShowModal(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            category: product.category,
            stock: product.stock.toString(),
            discountPercent: (product.discountPercent || 0).toString(),
            images: [
                product.images?.[0] || '',
                product.images?.[1] || '',
                product.images?.[2] || '',
                product.images?.[3] || '',
                product.images?.[4] || '',
                product.images?.[5] || '',
            ],
        });
        setShowModal(true);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setIsUploading(true);
        const uploadData = new FormData();
        Array.from(e.target.files).forEach(file => {
            uploadData.append('images', file);
        });

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: uploadData,
            });
            const data = await res.json();

            if (res.ok && data.urls) {
                // Find empty slots and fill them
                const newImages = [...formData.images];
                let urlIndex = 0;

                for (let i = 0; i < newImages.length && urlIndex < data.urls.length; i++) {
                    if (!newImages[i].trim()) {
                        // Ensure full backend URL
                        const url = data.urls[urlIndex].startsWith('/')
                            ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006'}${data.urls[urlIndex]}`
                            : data.urls[urlIndex];
                        newImages[i] = url;
                        urlIndex++;
                    }
                }

                setFormData({ ...formData, images: newImages });
            } else {
                alert(data.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload Error:', error);
            alert('Failed to upload images');
        } finally {
            setIsUploading(false);
            e.target.value = ''; // Reset input
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validImages = formData.images.filter(img => img.trim());
        const slug = formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

        const productData: any = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            stock: parseInt(formData.stock),
            discountPercent: parseInt(formData.discountPercent) || 0,
            images: validImages,
            slug,
            isFeatured: false,
        };

        if (editingProduct) {
            await updateProduct(editingProduct.id, productData);
        } else {
            productData.id = Date.now().toString();
            await addProduct(productData);
        }

        setShowModal(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to remove this vehicle?')) {
            await deleteProduct(id);
        }
    };

    if (authLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-oristic-black">
                <p className="text-white/60 animate-pulse font-serif">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-oristic-black py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="font-serif text-3xl font-bold text-white">
                        <span className="text-oristic-gold">Oristic</span> Dashboard
                    </h1>
                    <button
                        onClick={openAddModal}
                        className="rounded-full bg-oristic-gold px-6 py-2.5 text-sm font-semibold text-oristic-black hover:bg-oristic-gold-light transition-all"
                    >
                        + Add Vehicle
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 border-b border-oristic-gray/30 mb-8">
                    <button
                        onClick={() => setActiveTab('vehicles')}
                        className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'vehicles' ? 'text-oristic-gold border-b-2 border-oristic-gold' : 'text-white/50 hover:text-white'}`}
                    >
                        Vehicles ({products.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'orders' ? 'text-oristic-gold border-b-2 border-oristic-gold' : 'text-white/50 hover:text-white'}`}
                    >
                        Orders ({orders.length})
                    </button>
                </div>

                {/* Vehicles Tab */}
                {activeTab === 'vehicles' && (
                    <div>
                        {productsLoading ? (
                            <p className="text-white/50 animate-pulse">Loading vehicles...</p>
                        ) : products.length === 0 ? (
                            <div className="rounded-xl border border-oristic-gray/30 bg-oristic-dark p-12 text-center">
                                <p className="text-white/40 font-serif text-lg">No vehicles in inventory</p>
                                <button onClick={openAddModal} className="mt-4 text-oristic-gold hover:text-oristic-gold-light text-sm font-medium">
                                    Add your first vehicle →
                                </button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto rounded-xl border border-oristic-gray/30 bg-oristic-dark">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="border-b border-oristic-gray/30">
                                            <th className="px-6 py-4 text-left text-xs font-medium text-white/50 uppercase tracking-wider">Vehicle</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-white/50 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-white/50 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-white/50 uppercase tracking-wider">Stock</th>
                                            <th className="px-6 py-4 text-right text-xs font-medium text-white/50 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-oristic-gray/20">
                                        {products.map((product) => (
                                            <tr key={product.id} className="hover:bg-oristic-gray/10 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative h-12 w-16 rounded-lg overflow-hidden bg-oristic-gray/20 flex-shrink-0">
                                                            <Image
                                                                src={(product.images && product.images[0]) || '/placeholder.jpg'}
                                                                alt={product.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <span className="text-sm font-medium text-white">{product.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs uppercase tracking-wider text-oristic-gold bg-oristic-gold/10 px-2 py-1 rounded-full">
                                                        {product.category?.replace('-', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-white">
                                                    ₵{product.price?.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                        {product.stock}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    <button
                                                        onClick={() => openEditModal(product)}
                                                        className="text-xs text-oristic-gold hover:text-oristic-gold-light transition-colors font-medium"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="text-xs text-red-400 hover:text-red-300 transition-colors font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div>
                        {ordersLoading ? (
                            <p className="text-white/50 animate-pulse">Loading orders...</p>
                        ) : orders.length === 0 ? (
                            <div className="rounded-xl border border-oristic-gray/30 bg-oristic-dark p-12 text-center">
                                <p className="text-white/40 font-serif text-lg">No orders yet</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            setShowOrderModal(true);
                                        }}
                                        className="rounded-xl border border-oristic-gray/30 bg-oristic-dark p-6 cursor-pointer hover:border-oristic-gold/30 transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-white/50">Order #{order.id}</p>
                                                <p className="text-white font-medium mt-1">
                                                    {order.firstName} {order.lastName}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-serif text-lg font-bold text-oristic-gold">
                                                    ₵{Number(order.totalAmount).toLocaleString()}
                                                </p>
                                                <p className="text-xs text-white/40">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Add/Edit Vehicle Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-oristic-dark border border-oristic-gold/20 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-oristic-gray/30">
                            <div className="flex justify-between items-center">
                                <h2 className="font-serif text-xl font-bold text-white">
                                    {editingProduct ? 'Edit' : 'Add'} <span className="text-oristic-gold">Vehicle</span>
                                </h2>
                                <button onClick={() => setShowModal(false)} className="text-white/50 hover:text-white">
                                    ✕
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-1">Vehicle Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full rounded-md border-oristic-gray bg-oristic-black text-white px-4 py-2.5 text-sm focus:border-oristic-gold focus:ring-oristic-gold"
                                    placeholder="e.g. 2024 BMW M5"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    rows={3}
                                    className="w-full rounded-md border-oristic-gray bg-oristic-black text-white px-4 py-2.5 text-sm focus:border-oristic-gold focus:ring-oristic-gold"
                                    placeholder="Describe the vehicle..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-1">Price (₵)</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        required
                                        className="w-full rounded-md border-oristic-gray bg-oristic-black text-white px-4 py-2.5 text-sm focus:border-oristic-gold focus:ring-oristic-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-1">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full rounded-md border-oristic-gray bg-oristic-black text-white px-4 py-2.5 text-sm focus:border-oristic-gold focus:ring-oristic-gold"
                                    >
                                        {CAR_CATEGORIES.map((cat) => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-1">Stock</label>
                                    <input
                                        type="number"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        required
                                        className="w-full rounded-md border-oristic-gray bg-oristic-black text-white px-4 py-2.5 text-sm focus:border-oristic-gold focus:ring-oristic-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-1">Discount %</label>
                                    <input
                                        type="number"
                                        value={formData.discountPercent}
                                        onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
                                        className="w-full rounded-md border-oristic-gray bg-oristic-black text-white px-4 py-2.5 text-sm focus:border-oristic-gold focus:ring-oristic-gold"
                                    />
                                </div>
                            </div>

                            {/* Images Section */}
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">Vehicle Images (up to 6)</label>

                                {/* Upload Box */}
                                <div className="mb-4">
                                    <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer bg-oristic-black/50 transition-colors ${isUploading ? 'border-oristic-gold/50 cursor-wait' : 'border-oristic-gray/50 hover:border-oristic-gold/50'}`}>
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            {isUploading ? (
                                                <p className="text-sm text-oristic-gold animate-pulse font-medium">Uploading Images...</p>
                                            ) : (
                                                <>
                                                    <svg className="w-8 h-8 mb-3 text-oristic-gold/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-white/70"><span className="font-semibold text-oristic-gold">Click to upload</span> gallery images</p>
                                                    <p className="text-xs text-white/40">PNG, JPG or WEBP (Max 5MB)</p>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={isUploading}
                                        />
                                    </label>
                                    <div className="text-center mt-3 text-xs text-white/50 uppercase tracking-widest font-semibold flex items-center gap-2 before:flex-1 before:h-px before:bg-oristic-gray/30 after:flex-1 after:h-px after:bg-oristic-gray/30">
                                        Or Enter URLs Below
                                    </div>
                                </div>

                                {/* Image Slots Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    {formData.images.map((img, index) => (
                                        <div key={index} className="relative flex items-center border border-oristic-gray/30 rounded-md bg-oristic-black overflow-hidden group focus-within:border-oristic-gold focus-within:ring-1 focus-within:ring-oristic-gold">
                                            {img ? (
                                                <div className="relative w-12 h-full min-h-[40px] flex-shrink-0 bg-oristic-dark border-r border-oristic-gray/30">
                                                    <Image
                                                        src={img}
                                                        alt={`Preview ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized={img.startsWith('http')}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-12 h-full min-h-[40px] flex-shrink-0 bg-oristic-gray/10 flex items-center justify-center text-white/20 text-xs font-mono border-r border-oristic-gray/30">
                                                    {index + 1}
                                                </div>
                                            )}
                                            <input
                                                type="text"
                                                value={img}
                                                onChange={(e) => {
                                                    const newImages = [...formData.images];
                                                    newImages[index] = e.target.value;
                                                    setFormData({ ...formData, images: newImages });
                                                }}
                                                className="w-full bg-transparent text-white px-3 py-2 text-xs focus:outline-none"
                                                placeholder={`Image URL ${index + 1}${index === 0 ? ' (req)' : ''}`}
                                                required={index === 0}
                                            />
                                            {img && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newImages = [...formData.images];
                                                        newImages[index] = '';
                                                        setFormData({ ...formData, images: newImages });
                                                    }}
                                                    className="absolute right-2 text-white/30 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity bg-oristic-black rounded-full"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 rounded-full border border-oristic-gray/50 px-4 py-2.5 text-sm font-medium text-white/70 hover:border-white/50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 rounded-full bg-oristic-gold px-4 py-2.5 text-sm font-semibold text-oristic-black hover:bg-oristic-gold-light transition-all"
                                >
                                    {editingProduct ? 'Update Vehicle' : 'Add Vehicle'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Order Detail Modal */}
            {showOrderModal && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-oristic-dark border border-oristic-gold/20 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-oristic-gray/30">
                            <div className="flex justify-between items-center">
                                <h2 className="font-serif text-xl font-bold text-white">
                                    Order <span className="text-oristic-gold">#{selectedOrder.id}</span>
                                </h2>
                                <button onClick={() => setShowOrderModal(false)} className="text-white/50 hover:text-white">
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-white/50">Customer</span>
                                    <p className="text-white font-medium">{selectedOrder.firstName} {selectedOrder.lastName}</p>
                                </div>
                                <div>
                                    <span className="text-white/50">Email</span>
                                    <p className="text-white font-medium">{selectedOrder.email}</p>
                                </div>
                                <div>
                                    <span className="text-white/50">Phone</span>
                                    <p className="text-white font-medium">{selectedOrder.phone}</p>
                                </div>
                                <div>
                                    <span className="text-white/50">Address</span>
                                    <p className="text-white font-medium">{selectedOrder.address}</p>
                                </div>
                            </div>

                            <div className="border-t border-oristic-gray/30 pt-4">
                                <h3 className="text-sm font-medium text-white/50 mb-3">Items</h3>
                                {selectedOrder.items && (Array.isArray(selectedOrder.items) ? selectedOrder.items : JSON.parse(selectedOrder.items as any)).map((item: any, idx: number) => (
                                    <div key={idx} className="flex justify-between text-sm py-2 border-b border-oristic-gray/20 last:border-0">
                                        <span className="text-white">{item.name || item.productname} × {item.quantity}</span>
                                        <span className="text-oristic-gold">₵{(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-oristic-gray/30 pt-4 flex justify-between">
                                <span className="font-serif text-lg font-bold text-white">Total</span>
                                <span className="font-serif text-lg font-bold text-oristic-gold">₵{Number(selectedOrder.totalAmount).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
