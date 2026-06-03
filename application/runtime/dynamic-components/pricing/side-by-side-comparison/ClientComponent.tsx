"use client";

import React from 'react';
import { cx } from '../../_shared';

// Pricing 10: side-by-side with detailed comparison
export default function Pricing10({ className = '' }) {
  const plans = [
    { name: 'Standard', price: '$25', color: 'blue', features: ['10 Users', 'Email Support', '100 GB Storage'] },
    { name: 'Premium', price: '$75', color: 'purple', features: ['Unlimited Users', '24/7 Support', '1 TB Storage', 'Custom Branding'] },
  ];
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Compare Plans</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`border-4 border-${plan.color}-500 rounded-lg p-8`}>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-5xl font-bold text-gray-900 mb-6">
                {plan.price}<span className="text-xl text-gray-600">/mo</span>
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start">
                    <span className={`text-${plan.color}-600 mr-2 text-xl`}>✓</span>
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className={`block text-center bg-${plan.color}-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-${plan.color}-700`}>
                Subscribe Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
