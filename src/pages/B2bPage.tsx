import React, { useState } from 'react';
import { Briefcase, Plus, Trash2, Send, CheckCircle2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useStore } from '../context/StoreContext';

export const B2bPage: React.FC = () => {
  const { showToast } = useStore();

  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Hotel & Resort Furnishing');
  
  const [lineItems, setLineItems] = useState<{ category: string; quantity: number; notes: string }[]>([
    { category: 'Solid Sheesham Beds', quantity: 10, notes: 'Honey finish with box storage' }
  ]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const addLineItem = () => {
    setLineItems([...lineItems, { category: 'Bookshelves', quantity: 5, notes: '' }]);
  };

  const removeLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const handleB2bSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactPerson || phone.replace(/\D/g, '').length !== 10) {
      alert('Please fill company name, contact person, and 10-digit phone.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'b2bQuotes'), {
        companyName: companyName.trim(),
        contactPerson: contactPerson.trim(),
        phone: phone.replace(/\D/g, ''),
        email: email.trim(),
        projectType,
        items: lineItems,
        status: 'New',
        createdAt: serverTimestamp()
      });

      setSubmitted(true);
      showToast('B2B Quote Request submitted successfully!');
    } catch (err: any) {
      console.error('B2B submit error:', err);
      alert('Error submitting quote. Please try WhatsApp direct inquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      <div className="bg-[#2c1810] text-white p-8 rounded-2xl text-center space-y-3 relative shadow-lg">
        <div className="w-12 h-12 bg-[#c9a227]/20 rounded-full flex items-center justify-center mx-auto border border-[#c9a227]/40 text-[#c9a227]">
          <Briefcase className="w-6 h-6" />
        </div>
        <h1 className="font-serif text-3xl font-bold">B2B Bulk Furniture Partnerships</h1>
        <p className="text-xs text-[#ccc] max-w-xl mx-auto">
          Equipping hotels, boutique resorts, corporate offices, and interior design studios with premium solid wood furniture at wholesale factory pricing.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white dark:bg-[#1a120b] p-8 rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-[#2c1810] dark:text-white">Quote Request Received!</h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Our commercial accounts team will review your quantities and reach out on <strong>+91 {phone}</strong> within 24 hours with custom pricing.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-[#2c1810] text-white font-bold text-xs uppercase px-6 py-2.5 rounded-xl"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleB2bSubmit} className="bg-white dark:bg-[#1a120b] p-6 sm:p-8 rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] shadow-sm space-y-6 text-xs">
          
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#2c1810] dark:text-white">1. Company &amp; Contact Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Company / Studio Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Royal Heritage Resort"
                  className="w-full bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg p-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Contact Person *</label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="Full name"
                  className="w-full bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg p-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile"
                  className="w-full bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg p-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Business Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="purchase@company.com"
                  className="w-full bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg p-2.5 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#e8e0d5] dark:border-[#3a322a]">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-[#2c1810] dark:text-white">2. Furniture Requirements</h3>
              <button
                type="button"
                onClick={addLineItem}
                className="bg-[#2c1810] text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-3">
              {lineItems.map((item, idx) => (
                <div key={idx} className="bg-[#faf8f5] dark:bg-[#241f1a] p-3 rounded-xl border border-[#e8e0d5] dark:border-[#3a322a] grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                  <div className="sm:col-span-5">
                    <input
                      type="text"
                      value={item.category}
                      onChange={(e) => {
                        const next = [...lineItems];
                        next[idx].category = e.target.value;
                        setLineItems(next);
                      }}
                      placeholder="Furniture Category/Item"
                      className="w-full bg-white dark:bg-[#1a120b] border border-gray-300 dark:border-gray-700 rounded p-2 outline-none"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => {
                        const next = [...lineItems];
                        next[idx].quantity = Number(e.target.value);
                        setLineItems(next);
                      }}
                      placeholder="Quantity"
                      className="w-full bg-white dark:bg-[#1a120b] border border-gray-300 dark:border-gray-700 rounded p-2 outline-none"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      value={item.notes}
                      onChange={(e) => {
                        const next = [...lineItems];
                        next[idx].notes = e.target.value;
                        setLineItems(next);
                      }}
                      placeholder="Specifications/Finish"
                      className="w-full bg-white dark:bg-[#1a120b] border border-gray-300 dark:border-gray-700 rounded p-2 outline-none"
                    />
                  </div>
                  <div className="sm:col-span-1 text-right">
                    <button
                      type="button"
                      onClick={() => removeLineItem(idx)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c9a227] hover:bg-[#b8911f] text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? 'Submitting...' : 'Request Wholesale Commercial Quote'}</span>
          </button>

        </form>
      )}

    </div>
  );
};
