import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || phone.length !== 10 || !message) return;
    setSent(true);
    showToast('Inquiry sent successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl font-bold text-[#2c1810] dark:text-white">Contact Parivar Furniture</h1>
        <p className="text-xs text-gray-500">
          Have questions about custom solid wood dimensions, finishes, or order status? We are here to help!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Contact Info */}
        <div className="bg-[#faf8f5] dark:bg-[#241f1a] p-6 rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] space-y-6 text-xs">
          <h3 className="font-serif text-lg font-bold text-[#2c1810] dark:text-white">Customer Support</h3>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#c9a227] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#2c1810] dark:text-white">Direct Phone Support</strong>
                <a href="tel:+917028616607" className="hover:underline text-[#c9a227] font-bold">
                  +91 70286 16607
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-[#25D366] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#2c1810] dark:text-white">WhatsApp Chat &amp; Orders</strong>
                <a href="https://wa.me/917028616607" target="_blank" rel="noopener noreferrer" className="hover:underline text-[#25D366] font-bold">
                  Chat on WhatsApp (+91 70286 16607)
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#c9a227] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#2c1810] dark:text-white">Email Address</strong>
                <span>support@parivarfurniture.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#c9a227] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#2c1810] dark:text-white">Working Hours</strong>
                <span>Monday – Saturday: 10:00 AM – 8:00 PM IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-[#1a120b] p-6 rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] shadow-sm text-xs">
          {sent ? (
            <div className="text-center space-y-3 py-8">
              <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-[#2c1810] dark:text-white">Message Sent!</h3>
              <p className="text-xs text-gray-500">Thank you for contacting us. We will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#2c1810] dark:text-white">Send Us an Inquiry</h3>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Your Message / Question *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about custom sizes, finishes, or room planning..."
                  className="w-full bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg p-2.5 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2c1810] hover:bg-[#4a2c1a] text-white font-bold py-3 rounded-xl uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
