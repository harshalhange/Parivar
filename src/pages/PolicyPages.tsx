import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, Truck, RotateCcw, HelpCircle } from 'lucide-react';

interface PolicyPagesProps {
  policyType: 'shipping' | 'returns' | 'faq' | 'terms';
}

export const PolicyPages: React.FC<PolicyPagesProps> = ({ policyType }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is the furniture made from 100% genuine solid Sheesham wood?',
      a: 'Yes, all our bed frames, bookshelves, and storage units are constructed using 100% seasoned solid Sheesham and Mango wood, ensuring lifetime durability and rich natural grain patterns.'
    },
    {
      q: 'How does shipping work across India?',
      a: 'We offer free door-to-door insured shipping across all major Indian pincodes. Deliveries typically take 7 to 15 business days depending on destination and wood seasoning status.'
    },
    {
      q: 'Can I request custom sizes or finish modifications?',
      a: 'Yes! We specialize in custom furniture adjustments. Reach out to our team on WhatsApp (+91 70286 16607) to discuss custom mattress dimensions or finish shades.'
    },
    {
      q: 'What is the return policy for defective items?',
      a: 'We offer a 7-day easy return or replacement guarantee for any transit damages or manufacturing defects upon delivery inspection.'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8 text-xs">
      
      {policyType === 'faq' && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="font-serif text-3xl font-bold text-[#2c1810] dark:text-white">Frequently Asked Questions</h1>
            <p className="text-gray-500">Everything you need to know about purchasing solid wood furniture</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#1a120b] rounded-xl border border-[#e8e0d5] dark:border-[#3a322a] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-[#2c1810] dark:text-white flex justify-between items-center"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>

                {openFaq === idx && (
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {policyType === 'shipping' && (
        <div className="bg-white dark:bg-[#1a120b] p-8 rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] space-y-4">
          <h1 className="font-serif text-2xl font-bold text-[#2c1810] dark:text-white flex items-center gap-2">
            <Truck className="w-6 h-6 text-[#c9a227]" />
            <span>Shipping &amp; Delivery Policy</span>
          </h1>
          <div className="space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>• <strong>Free Pan-India Delivery:</strong> All orders enjoy free insured shipping across India.</p>
            <p>• <strong>Dispatch Timelines:</strong> In-stock furniture pieces are dispatched within 48 hours. Made-to-order items require 7 to 12 days for final hand-polishing and inspection.</p>
            <p>• <strong>Doorstep Inspection:</strong> Please inspect the packaging and furniture upon arrival before signing off with our logistics partner.</p>
          </div>
        </div>
      )}

      {policyType === 'returns' && (
        <div className="bg-white dark:bg-[#1a120b] p-8 rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] space-y-4">
          <h1 className="font-serif text-2xl font-bold text-[#2c1810] dark:text-white flex items-center gap-2">
            <RotateCcw className="w-6 h-6 text-[#c9a227]" />
            <span>7-Day Return &amp; Exchange Policy</span>
          </h1>
          <div className="space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>• We take extreme pride in our solid wood craftsmanship. If your product arrives damaged or with a defect, contact us within 7 days for a full replacement or refund.</p>
            <p>• To initiate a return, send an unboxing photo/video to support@parivarfurniture.com or WhatsApp +91 70286 16607.</p>
          </div>
        </div>
      )}

      {policyType === 'terms' && (
        <div className="bg-white dark:bg-[#1a120b] p-8 rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] space-y-4">
          <h1 className="font-serif text-2xl font-bold text-[#2c1810] dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#c9a227]" />
            <span>Terms &amp; Security Guarantee</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Parivar Furniture adheres strictly to OWASP security standards, PCI-DSS compliance guidelines, and GDPR data privacy principles. All transactions and customer records are protected with Firestore security rules and encrypted transport.
          </p>
        </div>
      )}

    </div>
  );
};
