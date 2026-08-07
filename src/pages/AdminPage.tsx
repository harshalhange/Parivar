import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  Tag, 
  Briefcase, 
  TrendingUp, 
  Lock,
  RefreshCw
} from 'lucide-react';
import { collection, onSnapshot, doc, updateDoc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Product, Order, Coupon } from '../types';
import { useStore } from '../context/StoreContext';

export const AdminPage: React.FC = () => {
  const { products, formatPrice, showToast } = useStore();

  const [pinKey, setPinKey] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [b2bQuotes, setB2bQuotes] = useState<any[]>([]);
  const [adminTab, setAdminTab] = useState<'stats' | 'orders' | 'products' | 'b2b'>('stats');

  // Product Edit Form state
  const [editingProd, setEditingProd] = useState<Partial<Product> | null>(null);

  // Authenticate simple admin key
  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinKey.trim() === '70286' || pinKey.trim() === 'admin123' || pinKey.trim() === 'parivar') {
      setIsAdminAuthenticated(true);
      showToast('Admin access granted.');
    } else {
      alert('Invalid admin PIN key.');
    }
  };

  // Live Firestore listeners
  useEffect(() => {
    if (!isAdminAuthenticated) return;

    // Listen Orders
    const unSubOrders = onSnapshot(
      query(collection(db, 'orders'), orderBy('createdAt', 'desc')),
      (snap) => {
        const list: Order[] = [];
        snap.forEach(d => list.push({ id: d.id, ...d.data() } as Order));
        setOrders(list);
      },
      (err) => {
        console.warn('Orders listener error:', err);
      }
    );

    // Listen B2B Quotes
    const unSubB2b = onSnapshot(
      collection(db, 'b2bQuotes'),
      (snap) => {
        const list: any[] = [];
        snap.forEach(d => list.push({ id: d.id, ...d.data() }));
        setB2bQuotes(list);
      },
      (err) => {
        console.warn('B2B Quotes listener error:', err);
      }
    );

    return () => {
      unSubOrders();
      unSubB2b();
    };
  }, [isAdminAuthenticated]);

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status });
      showToast(`Order status updated to ${status}`);
    } catch (err: any) {
      console.error('Update order error:', err);
      alert('Failed to update order status');
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProd?.name || !editingProd?.price) return;

    try {
      const id = editingProd.id || `prod_${Date.now()}`;
      await setDoc(doc(db, 'products', id), {
        ...editingProd,
        id,
        price: Number(editingProd.price),
        oldPrice: editingProd.oldPrice ? Number(editingProd.oldPrice) : undefined,
        stock: Number(editingProd.stock || 10),
        inStock: Number(editingProd.stock || 10) > 0,
        category: editingProd.category || 'Bedroom',
        image: editingProd.image || 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600'
      }, { merge: true });

      setEditingProd(null);
      showToast('Product saved to Firestore catalog.');
    } catch (err: any) {
      console.error('Save product error:', err);
      alert('Failed to save product.');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product from catalog?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      showToast('Product removed.');
    } catch (err: any) {
      console.error('Delete product error:', err);
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-[#2c1810] text-[#c9a227] rounded-full flex items-center justify-center mx-auto border border-[#c9a227]">
          <Lock className="w-8 h-8" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#2c1810] dark:text-white">Admin Management Portal</h2>
          <p className="text-xs text-gray-500 mt-1">Enter administrative passcode to manage products, orders, and quotes.</p>
        </div>

        <form onSubmit={handleAdminAuth} className="space-y-3">
          <input
            type="password"
            required
            value={pinKey}
            onChange={(e) => setPinKey(e.target.value)}
            placeholder="Enter Admin Passcode (e.g. 70286)"
            className="w-full bg-white dark:bg-[#1a120b] border border-[#e8e0d5] dark:border-[#3a322a] rounded-xl p-3 text-center text-sm outline-none focus:border-[#c9a227]"
          />
          <button
            type="submit"
            className="w-full bg-[#2c1810] text-white font-bold text-xs uppercase py-3 rounded-xl hover:bg-[#4a2c1a]"
          >
            Access Portal
          </button>
        </form>
      </div>
    );
  }

  const totalRevenue = (orders || []).reduce((sum, o) => sum + (o?.total || 0), 0);
  const lowStockCount = products.filter(p => p.stock < 5).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      <div className="bg-[#2c1810] text-white p-6 rounded-2xl flex justify-between items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold">Parivar Admin Dashboard</h1>
          <p className="text-xs text-[#ccc]">Real-time Inventory &amp; Order Sync</p>
        </div>
        <button
          onClick={() => setIsAdminAuthenticated(false)}
          className="text-xs font-bold text-red-400 border border-red-400/40 px-3 py-1.5 rounded-lg"
        >
          Exit Admin
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="bg-white dark:bg-[#1a120b] p-4 rounded-xl border border-[#e8e0d5] dark:border-[#3a322a] shadow-xs">
          <span className="text-gray-400 font-bold block">Total Revenue</span>
          <span className="text-xl font-extrabold text-[#2c1810] dark:text-[#c9a227]">{formatPrice(totalRevenue)}</span>
        </div>
        <div className="bg-white dark:bg-[#1a120b] p-4 rounded-xl border border-[#e8e0d5] dark:border-[#3a322a] shadow-xs">
          <span className="text-gray-400 font-bold block">Total Orders</span>
          <span className="text-xl font-extrabold text-[#2c1810] dark:text-white">{orders.length}</span>
        </div>
        <div className="bg-white dark:bg-[#1a120b] p-4 rounded-xl border border-[#e8e0d5] dark:border-[#3a322a] shadow-xs">
          <span className="text-gray-400 font-bold block">Product Catalog</span>
          <span className="text-xl font-extrabold text-[#2c1810] dark:text-white">{products.length} Items</span>
        </div>
        <div className="bg-white dark:bg-[#1a120b] p-4 rounded-xl border border-[#e8e0d5] dark:border-[#3a322a] shadow-xs">
          <span className="text-gray-400 font-bold block">Low Stock Alert</span>
          <span className="text-xl font-extrabold text-amber-600">{lowStockCount} Items</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="space-y-6">
        <div className="flex border-b border-[#e8e0d5] dark:border-[#3a322a] gap-6 text-xs font-bold uppercase">
          <button
            onClick={() => setAdminTab('stats')}
            className={`pb-3 ${adminTab === 'stats' ? 'border-b-2 border-[#c9a227] text-[#c9a227]' : 'text-gray-500'}`}
          >
            Overview Stats
          </button>
          <button
            onClick={() => setAdminTab('orders')}
            className={`pb-3 ${adminTab === 'orders' ? 'border-b-2 border-[#c9a227] text-[#c9a227]' : 'text-gray-500'}`}
          >
            Live Orders ({orders.length})
          </button>
          <button
            onClick={() => setAdminTab('products')}
            className={`pb-3 ${adminTab === 'products' ? 'border-b-2 border-[#c9a227] text-[#c9a227]' : 'text-gray-500'}`}
          >
            Manage Catalog ({products.length})
          </button>
          <button
            onClick={() => setAdminTab('b2b')}
            className={`pb-3 ${adminTab === 'b2b' ? 'border-b-2 border-[#c9a227] text-[#c9a227]' : 'text-gray-500'}`}
          >
            B2B Inquiries ({b2bQuotes.length})
          </button>
        </div>

        {/* Tab: Orders */}
        {adminTab === 'orders' && (
          <div className="space-y-4 text-xs">
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white dark:bg-[#1a120b] p-4 rounded-xl border border-[#e8e0d5] dark:border-[#3a322a] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="font-bold text-[#2c1810] dark:text-white text-sm">
                    Order #{ord.id} • {ord.customer?.name} ({ord.customer?.phone})
                  </div>
                  <div className="text-gray-500">
                    {ord.customer?.address}, {ord.customer?.city} - {ord.customer?.pincode}
                  </div>
                  <div className="text-[#c9a227] font-bold mt-1">Total: {formatPrice(ord.total)}</div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold">Status:</span>
                  <select
                    value={ord.status || 'Pending'}
                    onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                    className="bg-[#faf8f5] dark:bg-[#241f1a] border border-gray-300 rounded px-2 py-1 text-xs outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Products */}
        {adminTab === 'products' && (
          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#2c1810] dark:text-white">Catalog Manager</span>
              <button
                onClick={() => setEditingProd({ name: '', price: 10000, category: 'Bedroom', stock: 10, inStock: true })}
                className="bg-[#2c1810] text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Furniture Item</span>
              </button>
            </div>

            {/* Form */}
            {editingProd && (
              <form onSubmit={handleSaveProduct} className="bg-[#faf8f5] dark:bg-[#241f1a] p-4 rounded-xl border border-[#e8e0d5] dark:border-[#3a322a] space-y-3">
                <div className="font-bold text-[#2c1810] dark:text-white">Edit Product Details</div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={editingProd.name || ''}
                    onChange={(e) => setEditingProd({ ...editingProd, name: e.target.value })}
                    placeholder="Furniture Item Name"
                    className="bg-white dark:bg-[#1a120b] border p-2 rounded"
                  />
                  <input
                    type="number"
                    required
                    value={editingProd.price || ''}
                    onChange={(e) => setEditingProd({ ...editingProd, price: Number(e.target.value) })}
                    placeholder="Selling Price (₹)"
                    className="bg-white dark:bg-[#1a120b] border p-2 rounded"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={editingProd.category || 'Bedroom'}
                    onChange={(e) => setEditingProd({ ...editingProd, category: e.target.value as any })}
                    className="bg-white dark:bg-[#1a120b] border p-2 rounded"
                  >
                    <option value="Bedroom">Bedroom</option>
                    <option value="Living Room">Living Room</option>
                    <option value="Storage & Tables">Storage &amp; Tables</option>
                  </select>
                  <input
                    type="number"
                    value={editingProd.stock || 10}
                    onChange={(e) => setEditingProd({ ...editingProd, stock: Number(e.target.value) })}
                    placeholder="Stock Qty"
                    className="bg-white dark:bg-[#1a120b] border p-2 rounded"
                  />
                </div>
                <input
                  type="text"
                  value={editingProd.image || ''}
                  onChange={(e) => setEditingProd({ ...editingProd, image: e.target.value })}
                  placeholder="Image URL"
                  className="w-full bg-white dark:bg-[#1a120b] border p-2 rounded"
                />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setEditingProd(null)} className="px-3 py-1.5 border rounded">Cancel</button>
                  <button type="submit" className="bg-[#c9a227] text-white font-bold px-4 py-1.5 rounded">Save</button>
                </div>
              </form>
            )}

            {/* List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((p) => (
                <div key={p.id} className="bg-white dark:bg-[#1a120b] p-3 rounded-xl border border-[#e8e0d5] dark:border-[#3a322a] flex items-center justify-between gap-3">
                  <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[#2c1810] dark:text-white truncate">{p.name}</div>
                    <div className="text-gray-500">{formatPrice(p.price)} • Stock: {p.stock}</div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => setEditingProd(p)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded">
                      <Edit3 className="w-4 h-4 text-blue-600" />
                    </button>
                    <button onClick={() => handleDeleteProduct(p.id)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
