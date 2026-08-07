import React, { useState, useEffect } from 'react';
import { 
  User as UserIcon, 
  Package, 
  Heart, 
  MapPin, 
  Clock, 
  LogOut, 
  Printer, 
  RotateCcw, 
  CheckCircle2, 
  Plus, 
  Trash2,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Order } from '../types';

interface AccountPageProps {
  initialTab?: string;
  setActiveTab: (tab: string, param?: string) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  initialTab = 'orders',
  setActiveTab,
}) => {
  const { currentUser, profile, addresses, loginWithGoogle, loginAsGuest, logout, updateProfileData, saveAddress, deleteAddress, setDefaultAddress } = useAuth();
  const { wishlist, products, addToCart, formatPrice, showToast } = useStore();

  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'wishlist' | 'addresses' | 'profile'>(
    (initialTab as any) || 'orders'
  );

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Address form modal state
  const [showAddAddr, setShowAddAddr] = useState(false);
  const [addrLabel, setAddrLabel] = useState('Home');
  const [addrName, setAddrName] = useState(profile?.name || '');
  const [addrPhone, setAddrPhone] = useState(profile?.phone || '');
  const [addrText, setAddrText] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrPincode, setAddrPincode] = useState('');
  const [addrDefault, setAddrDefault] = useState(true);

  // Real-time listener for User Orders
  useEffect(() => {
    if (!currentUser) {
      setOrders([]);
      setOrdersLoading(false);
      return;
    }

    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef, 
      where('customer.phone', '==', profile?.phone || 'none'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: Order[] = [];
      snapshot.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() } as Order);
      });
      setOrders(list);
      setOrdersLoading(false);
    }, (err) => {
      // Fallback: search all orders
      const unSubAll = onSnapshot(collection(db, 'orders'), (snap) => {
        const list: Order[] = [];
        snap.forEach(d => {
          const data = d.data() as Order;
          if (data.customer?.email === currentUser.email || data.customer?.phone === profile?.phone) {
            list.push({ id: d.id, ...data });
          }
        });
        setOrders(list);
        setOrdersLoading(false);
      });
      return () => unSubAll();
    });

    return () => unsubscribe();
  }, [currentUser, profile]);

  const handleSaveAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrName || addrPhone.length !== 10 || !addrText || !addrCity || addrPincode.length !== 6) {
      alert('Please fill all required address fields correctly.');
      return;
    }

    await saveAddress({
      label: addrLabel,
      name: addrName.trim(),
      phone: addrPhone.trim(),
      address: addrText.trim(),
      city: addrCity.trim(),
      pincode: addrPincode.trim(),
      default: addrDefault
    });

    setShowAddAddr(false);
    setAddrText('');
    setAddrCity('');
    setAddrPincode('');
    showToast('Address saved to profile.');
  };

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  // If not logged in, show Auth Banner
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-[#faf7f0] dark:bg-[#241f1a] text-[#c9a227] rounded-full flex items-center justify-center mx-auto border border-[#e8e0d5] dark:border-[#3a322a]">
          <Lock className="w-8 h-8" />
        </div>

        <div>
          <h2 className="font-serif text-2xl font-bold text-[#2c1810] dark:text-white">Account Access</h2>
          <p className="text-xs text-gray-500 mt-1">
            Sign in to track furniture orders, manage delivery addresses, and sync wishlist.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={loginWithGoogle}
            className="w-full bg-[#2c1810] hover:bg-[#4a2c1a] text-white font-bold text-xs uppercase py-3.5 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-98"
          >
            <span>Sign in with Google</span>
          </button>

          <button
            onClick={loginAsGuest}
            className="w-full border border-[#e8e0d5] dark:border-[#3a322a] hover:border-[#c9a227] text-[#2c1810] dark:text-white font-bold text-xs uppercase py-3 rounded-xl transition-colors"
          >
            <span>Continue as Guest</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header Profile Bar */}
      <div className="bg-white dark:bg-[#1a120b] p-6 rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#2c1810] text-[#c9a227] font-bold text-lg flex items-center justify-center">
            {profile?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-[#2c1810] dark:text-white">
              {profile?.name || 'Valued Customer'}
            </h2>
            <p className="text-xs text-gray-500">
              {profile?.email || profile?.phone || 'Account Verified'}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="border border-[#e8e0d5] dark:border-[#3a322a] hover:border-red-600 text-xs font-bold text-red-600 px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Account Sub-Tabs */}
      <div className="space-y-6">
        <div className="flex border-b border-[#e8e0d5] dark:border-[#3a322a] gap-6 text-xs font-bold uppercase tracking-wider overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('orders')}
            className={`pb-3 flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap ${
              activeSubTab === 'orders'
                ? 'border-[#c9a227] text-[#c9a227]'
                : 'border-transparent text-gray-500 hover:text-[#2c1810] dark:hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('wishlist')}
            className={`pb-3 flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap ${
              activeSubTab === 'wishlist'
                ? 'border-[#c9a227] text-[#c9a227]'
                : 'border-transparent text-gray-500 hover:text-[#2c1810] dark:hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wishlist ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('addresses')}
            className={`pb-3 flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap ${
              activeSubTab === 'addresses'
                ? 'border-[#c9a227] text-[#c9a227]'
                : 'border-transparent text-gray-500 hover:text-[#2c1810] dark:hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Delivery Addresses ({addresses.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('profile')}
            className={`pb-3 flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap ${
              activeSubTab === 'profile'
                ? 'border-[#c9a227] text-[#c9a227]'
                : 'border-transparent text-gray-500 hover:text-[#2c1810] dark:hover:text-white'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>Profile Details</span>
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeSubTab === 'orders' && (
          <div className="space-y-4">
            {orders.length > 0 ? (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white dark:bg-[#1a120b] p-5 rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] shadow-xs space-y-4 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e8e0d5] dark:border-[#3a322a] pb-3">
                    <div>
                      <span className="font-bold text-[#2c1810] dark:text-white text-sm">
                        Order #{ord.id}
                      </span>
                      <span className="text-gray-400 block text-[11px]">{ord.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-full font-bold uppercase text-[10px] ${
                        ord.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : ord.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.status || 'Pending'}
                      </span>
                      <button
                        onClick={() => window.print()}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-500"
                        title="Print Invoice"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Itemized List */}
                  <div className="space-y-2">
                    {ord.items?.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <img src={it.image} alt={it.name} className="w-10 h-10 object-cover rounded-lg bg-gray-100" />
                          <div>
                            <div className="font-bold text-[#2c1810] dark:text-white">{it.name}</div>
                            <div className="text-[11px] text-gray-400">Finish: {it.variant} • Qty: {it.qty}</div>
                          </div>
                        </div>
                        <div className="font-bold text-[#2c1810] dark:text-[#c9a227]">
                          {formatPrice(it.price * it.qty)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex justify-between items-center border-t border-[#e8e0d5] dark:border-[#3a322a] pt-3 font-bold text-[#2c1810] dark:text-white">
                    <span>Total Amount Paid</span>
                    <span className="text-sm text-[#c9a227]">{formatPrice(ord.total)}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-white dark:bg-[#1a120b] rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] text-gray-500 text-xs">
                No orders placed yet. Select items from the catalog and place an order!
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeSubTab === 'wishlist' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.length > 0 ? (
              wishlistProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white dark:bg-[#1a120b] rounded-2xl overflow-hidden border border-[#e8e0d5] dark:border-[#3a322a] p-4 space-y-3 text-xs flex flex-col justify-between"
                >
                  <img src={prod.image} alt={prod.name} className="w-full aspect-square object-cover rounded-xl bg-gray-100" />
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#2c1810] dark:text-white">{prod.name}</h3>
                    <div className="font-bold text-[#c9a227] mt-1">{formatPrice(prod.price)}</div>
                  </div>
                  <button
                    onClick={() => addToCart(prod)}
                    className="w-full bg-[#2c1810] text-white font-bold py-2 rounded-lg uppercase tracking-wider text-[11px]"
                  >
                    Move to Cart
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full p-8 text-center bg-white dark:bg-[#1a120b] rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] text-gray-500 text-xs">
                Your wishlist is empty. Click the heart icon on any product to save it here!
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Addresses */}
        {activeSubTab === 'addresses' && (
          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#2c1810] dark:text-white">Saved Delivery Addresses</span>
              <button
                onClick={() => setShowAddAddr(true)}
                className="bg-[#2c1810] text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Address</span>
              </button>
            </div>

            {/* Address Modal / Form */}
            {showAddAddr && (
              <form onSubmit={handleSaveAddressSubmit} className="bg-[#faf8f5] dark:bg-[#241f1a] p-4 rounded-xl border border-[#e8e0d5] dark:border-[#3a322a] space-y-3">
                <div className="font-bold text-[#2c1810] dark:text-white">New Address</div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={addrLabel}
                    onChange={(e) => setAddrLabel(e.target.value)}
                    placeholder="Label (Home/Office)"
                    className="bg-white dark:bg-[#1a120b] border border-gray-300 dark:border-gray-700 rounded p-2 outline-none"
                  />
                  <input
                    type="text"
                    required
                    value={addrName}
                    onChange={(e) => setAddrName(e.target.value)}
                    placeholder="Full name"
                    className="bg-white dark:bg-[#1a120b] border border-gray-300 dark:border-gray-700 rounded p-2 outline-none"
                  />
                </div>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={addrPhone}
                  onChange={(e) => setAddrPhone(e.target.value)}
                  placeholder="10-digit Phone"
                  className="w-full bg-white dark:bg-[#1a120b] border border-gray-300 dark:border-gray-700 rounded p-2 outline-none"
                />
                <textarea
                  required
                  rows={2}
                  value={addrText}
                  onChange={(e) => setAddrText(e.target.value)}
                  placeholder="Full street address"
                  className="w-full bg-white dark:bg-[#1a120b] border border-gray-300 dark:border-gray-700 rounded p-2 outline-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={addrCity}
                    onChange={(e) => setAddrCity(e.target.value)}
                    placeholder="City"
                    className="bg-white dark:bg-[#1a120b] border border-gray-300 dark:border-gray-700 rounded p-2 outline-none"
                  />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={addrPincode}
                    onChange={(e) => setAddrPincode(e.target.value)}
                    placeholder="6-digit Pincode"
                    className="bg-white dark:bg-[#1a120b] border border-gray-300 dark:border-gray-700 rounded p-2 outline-none"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddAddr(false)}
                    className="px-3 py-1.5 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#c9a227] text-white font-bold px-4 py-1.5 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}

            {/* List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`bg-white dark:bg-[#1a120b] p-4 rounded-xl border space-y-2 relative ${
                    addr.default ? 'border-[#c9a227] bg-[#faf7f0]/30' : 'border-[#e8e0d5] dark:border-[#3a322a]'
                  }`}
                >
                  <div className="flex justify-between items-center font-bold text-[#2c1810] dark:text-white">
                    <span>{addr.label}</span>
                    {addr.default && (
                      <span className="text-[10px] bg-[#c9a227] text-white px-2 py-0.5 rounded uppercase">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{addr.name} • {addr.phone}</p>
                  <p className="text-gray-500">{addr.address}, {addr.city} - {addr.pincode}</p>
                  <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                    {!addr.default && (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-[11px] font-bold text-[#c9a227] hover:underline"
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="text-[11px] text-red-600 hover:underline flex items-center gap-1 ml-auto"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Profile Details */}
        {activeSubTab === 'profile' && (
          <div className="bg-white dark:bg-[#1a120b] p-6 rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] space-y-4 max-w-md text-xs">
            <h3 className="font-serif text-lg font-bold text-[#2c1810] dark:text-white">Profile Details</h3>
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-gray-600 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile?.name || ''}
                  onChange={(e) => updateProfileData({ ...profile!, name: e.target.value })}
                  className="w-full bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg p-2.5 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-600 dark:text-gray-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  maxLength={10}
                  value={profile?.phone || ''}
                  onChange={(e) => updateProfileData({ ...profile!, phone: e.target.value })}
                  className="w-full bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg p-2.5 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-600 dark:text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={profile?.email || ''}
                  onChange={(e) => updateProfileData({ ...profile!, email: e.target.value })}
                  className="w-full bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg p-2.5 text-xs outline-none"
                />
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
