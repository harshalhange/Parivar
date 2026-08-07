import React, { useState } from 'react';
import { X, Lock, Package, ShoppingBag, Plus, Trash2, Edit, Save, CheckCircle2, ShieldAlert } from 'lucide-react';
import { FurnitureProduct, FurnitureOrder, CouponCode } from '../types';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  products: FurnitureProduct[];
  orders: FurnitureOrder[];
  onAddProduct: (product: FurnitureProduct) => void;
  onUpdateProduct: (product: FurnitureProduct) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateOrderStatus: (orderId: string, status: FurnitureOrder['status']) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  products,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus
}) => {
  if (!isOpen) return null;

  const [passphrase, setPassphrase] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'inventory'>('products');
  
  // Product Edit State
  const [editingProduct, setEditingProduct] = useState<FurnitureProduct | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passphrase === 'admin' || passphrase === 'parivar123') {
      setAuthenticated(true);
    } else {
      alert('Invalid admin passphrase. Try "admin" or "parivar123"');
    }
  };

  const handleSaveProductForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (isNewProduct) {
      onAddProduct(editingProduct);
    } else {
      onUpdateProduct(editingProduct);
    }

    setEditingProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white dark:bg-stone-900 border border-amber-300 dark:border-stone-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 md:p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            <h2 className="font-serif font-bold text-xl text-stone-900 dark:text-amber-50">
              Parivar Furniture Admin Portal
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!authenticated ? (
          /* Login Form */
          <form onSubmit={handleLogin} className="max-w-sm mx-auto py-8 space-y-4 text-center">
            <ShieldAlert className="w-12 h-12 text-amber-600 mx-auto" />
            <h3 className="font-bold text-stone-900 dark:text-amber-100 text-base">Enter Admin Passphrase</h3>
            <p className="text-xs text-stone-500">Access catalog editor, real-time inventory, and order management.</p>
            <input
              type="password"
              placeholder="Passphrase (e.g. admin)"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-600 text-center"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-[#2c1810] hover:bg-amber-900 text-amber-50 font-bold text-xs rounded-xl shadow transition"
            >
              Sign In to Admin Portal
            </button>
          </form>
        ) : (
          /* Dashboard Navigation & Tab Content */
          <div>
            {/* Tabs */}
            <div className="flex border-b border-stone-200 dark:border-stone-800 mb-6 font-semibold text-xs">
              <button
                onClick={() => { setActiveTab('products'); setEditingProduct(null); }}
                className={`pb-3 px-4 border-b-2 transition ${activeTab === 'products' ? 'border-amber-600 text-amber-700 dark:text-amber-400 font-bold' : 'border-transparent text-stone-500'}`}
              >
                Products Catalog ({products.length})
              </button>
              <button
                onClick={() => { setActiveTab('orders'); setEditingProduct(null); }}
                className={`pb-3 px-4 border-b-2 transition ${activeTab === 'orders' ? 'border-amber-600 text-amber-700 dark:text-amber-400 font-bold' : 'border-transparent text-stone-500'}`}
              >
                Customer Orders ({orders.length})
              </button>
              <button
                onClick={() => { setActiveTab('inventory'); setEditingProduct(null); }}
                className={`pb-3 px-4 border-b-2 transition ${activeTab === 'inventory' ? 'border-amber-600 text-amber-700 dark:text-amber-400 font-bold' : 'border-transparent text-stone-500'}`}
              >
                Stock & Inventory
              </button>
            </div>

            {/* TAB: PRODUCTS */}
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-stone-600 dark:text-stone-300">Catalog Items</span>
                  <button
                    onClick={() => {
                      setIsNewProduct(true);
                      setEditingProduct({
                        id: `prod-${Date.now().toString(36)}`,
                        name: '',
                        category: 'Bedroom',
                        price: 15000,
                        oldPrice: 20000,
                        image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=800&fit=crop',
                        desc: 'Handcrafted solid Sheesham wood furniture',
                        material: 'Solid Sheesham Wood',
                        room: 'Bedroom',
                        size: 'Queen Size',
                        delivery: '5-9 Days',
                        assembly: 'Easy self-assembly',
                        floorFit: 'Standard clearance',
                        inStock: true,
                        stockCount: 10,
                        variants: [
                          { name: 'Honey Finish', price: 15000, sku: 'HONEY-SKU', stock: 5 },
                          { name: 'Walnut Finish', price: 16000, sku: 'WALNUT-SKU', stock: 5 }
                        ]
                      });
                    }}
                    className="py-1.5 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs flex items-center gap-1 shadow"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add New Product
                  </button>
                </div>

                {editingProduct ? (
                  /* Edit Form */
                  <form onSubmit={handleSaveProductForm} className="bg-stone-50 dark:bg-stone-800 p-4 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-3 mb-6 text-xs">
                    <h3 className="font-bold text-sm text-stone-900 dark:text-amber-100">
                      {isNewProduct ? 'Create New Product' : 'Edit Product'}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold block mb-1">Product Title</label>
                        <input
                          type="text"
                          required
                          value={editingProduct.name}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-white dark:bg-stone-900 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="font-semibold block mb-1">Category</label>
                        <select
                          value={editingProduct.category}
                          onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                          className="w-full px-2.5 py-1.5 bg-white dark:bg-stone-900 border rounded-lg"
                        >
                          <option value="Bedroom">Bedroom</option>
                          <option value="Living Room">Living Room</option>
                          <option value="Dining">Dining</option>
                          <option value="Storage & Shelves">Storage & Shelves</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-semibold block mb-1">Price (₹)</label>
                        <input
                          type="number"
                          required
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                          className="w-full px-2.5 py-1.5 bg-white dark:bg-stone-900 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="font-semibold block mb-1">Stock Count</label>
                        <input
                          type="number"
                          value={editingProduct.stockCount}
                          onChange={(e) => setEditingProduct({ ...editingProduct, stockCount: Number(e.target.value) })}
                          className="w-full px-2.5 py-1.5 bg-white dark:bg-stone-900 border rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">Image URL</label>
                      <input
                        type="text"
                        value={editingProduct.image}
                        onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-white dark:bg-stone-900 border rounded-lg"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="px-3 py-1.5 bg-stone-200 dark:bg-stone-700 rounded-lg font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg font-bold flex items-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" /> Save Product
                      </button>
                    </div>
                  </form>
                ) : null}

                {/* Catalog Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500">
                        <th className="p-2">Item</th>
                        <th className="p-2">Category</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Stock</th>
                        <th className="p-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                      {products.map(p => (
                        <tr key={p.id}>
                          <td className="p-2 flex items-center gap-2">
                            <img src={p.image} alt={p.name} className="w-8 h-8 object-cover rounded" />
                            <span className="font-bold truncate max-w-[180px]">{p.name}</span>
                          </td>
                          <td className="p-2">{p.category}</td>
                          <td className="p-2 font-bold">₹ {p.price.toLocaleString('en-IN')}</td>
                          <td className="p-2 font-mono">{p.stockCount}</td>
                          <td className="p-2 text-right">
                            <button
                              onClick={() => { setIsNewProduct(false); setEditingProduct(p); }}
                              className="p-1 text-amber-700 hover:text-amber-900 mr-2"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onDeleteProduct(p.id)}
                              className="p-1 text-rose-600 hover:text-rose-800"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-3">
                {orders.length === 0 ? (
                  <p className="text-center py-8 text-xs text-stone-500">No orders recorded yet.</p>
                ) : (
                  orders.map(o => (
                    <div key={o.id} className="p-4 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200 dark:border-stone-700 text-xs">
                      <div className="flex justify-between items-start mb-2 pb-2 border-b border-stone-200 dark:border-stone-700">
                        <div>
                          <span className="font-bold text-amber-800 dark:text-amber-400">{o.id}</span>
                          <span className="text-stone-400 ml-2">{o.date}</span>
                          <p className="font-semibold text-stone-900 dark:text-amber-100 mt-0.5">
                            {o.customer.name} ({o.customer.phone})
                          </p>
                        </div>
                        <select
                          value={o.status}
                          onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as any)}
                          className="px-2 py-1 bg-white dark:bg-stone-900 border rounded-lg font-bold text-xs text-amber-800"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div className="space-y-1 my-2">
                        {o.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-stone-600 dark:text-stone-300">
                            <span>{item.name} ({item.variant}) × {item.qty}</span>
                            <span>₹ {(item.price * item.qty).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center font-bold text-xs pt-2 border-t border-stone-200 dark:border-stone-700">
                        <span>Total Paid</span>
                        <span className="text-amber-800 dark:text-amber-400">₹ {o.total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB: INVENTORY */}
            {activeTab === 'inventory' && (
              <div className="space-y-3 text-xs">
                <p className="text-stone-500 font-semibold mb-2">Real-time Stock Monitor</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {products.map(p => (
                    <div key={p.id} className="p-3 bg-stone-50 dark:bg-stone-800 rounded-xl border flex justify-between items-center">
                      <div>
                        <p className="font-bold text-stone-900 dark:text-amber-100">{p.name}</p>
                        <p className="text-stone-500 text-[11px]">{p.category}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={p.stockCount}
                          onChange={(e) => onUpdateProduct({ ...p, stockCount: Math.max(0, Number(e.target.value)) })}
                          className="w-16 px-2 py-1 bg-white dark:bg-stone-900 border rounded font-bold text-center"
                        />
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${p.stockCount > 5 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                          {p.stockCount > 5 ? 'OK' : 'Low Stock'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
