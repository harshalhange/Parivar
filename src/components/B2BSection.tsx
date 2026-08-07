import React, { useState } from 'react';
import { Building2, Send, CheckCircle } from 'lucide-react';
import { submitLead } from '../services/api';

export const B2BSection: React.FC = () => {
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState('10-25 pieces');
  const [category, setCategory] = useState('Bedroom Suite');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !name.trim() || phone.replace(/\D/g, '').length !== 10) {
      alert('Please fill out all required company & contact fields.');
      return;
    }

    await submitLead('b2b', {
      company: company.trim(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.replace(/\D/g, '').slice(0, 10),
      quantity,
      category,
      note: note.trim()
    });

    setSubmitted(true);
  };

  return (
    <section className="py-12 bg-amber-900/10 dark:bg-stone-900/50 border-y border-amber-200/60 dark:border-stone-800">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200/60 dark:bg-amber-950 text-amber-900 dark:text-amber-200 rounded-full text-xs font-bold mb-2">
            <Building2 className="w-3.5 h-3.5" /> B2B Commercial & Bulk Orders
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-amber-50">
            Bulk Sheesham Furniture for Hotels, Resellers & Architects
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-2xl mx-auto mt-2">
            Direct manufacturer supply with custom dimensions, bespoke polish finishes, MOQ starting from 10 pieces, and dedicated logistics.
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-amber-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h3 className="font-bold text-stone-900 dark:text-amber-100 text-lg">B2B Inquiry Received!</h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Our commercial partnership manager will contact you on <strong>+91 {phone}</strong> within 2 business hours with catalog pricing.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Company / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Grand Heritage Hotels / Studio Design"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3.5 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Patel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Work Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vikram@grandheritage.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Phone / WhatsApp Number (10 digits) *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3.5 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Estimated Order Quantity
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3.5 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  >
                    <option value="10-25 pieces">10 - 25 pieces (MOQ Package)</option>
                    <option value="25-50 pieces">25 - 50 pieces (Hotel / Resort)</option>
                    <option value="50+ pieces">50+ pieces (Commercial Project)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Category Requirement
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  >
                    <option value="Bedroom Suite">Beds & Bedroom Suites</option>
                    <option value="Living Room Tables">Coffee & Center Tables</option>
                    <option value="Display Shelves">Bookshelves & Display Units</option>
                    <option value="Custom Mixed">Custom Commercial Design</option>
                  </select>
                </div>

              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Project Notes & Polish Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details regarding target delivery date, custom wood polish, or CAD drawing specifications..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3.5 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#2c1810] hover:bg-amber-900 text-amber-50 font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <Send className="w-4 h-4 text-amber-400" />
                Submit Bulk Quote Request
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
