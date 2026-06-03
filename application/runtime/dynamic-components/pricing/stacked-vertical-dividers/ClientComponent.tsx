"use client";

import React from 'react';
import { cx } from '../../_shared';

// Pricing 9: stacked vertical cards with dividers
export default function Pricing9({ className = '' }) {
  const tiers = [
    { name: 'Hobby', price: 'Free', features: ['1 Project', '1 GB Storage'] },
    { name: 'Professional', price: '$19/mo', features: ['10 Projects', '50 GB Storage', 'Priority Support'] },
    { name: 'Business', price: '$49/mo', features: ['Unlimited', '500 GB Storage', 'Dedicated Support', 'SLA'] },
  ];
  return (
    <section className={cx('bg-gray-50 py-16 px-4', className)}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Select a Plan</h2>
        <div className="bg-white rounded-lg shadow-lg divide-y">
          {tiers.map((tier, i) => (
            <div key={i} className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                <p className="text-2xl font-bold text-green-600">{tier.price}</p>
              </div>
              <ul className="space-y-2 mb-6">
                {tier.features.map((f, j) => (
                  <li key={j} className="text-gray-700">• {f}</li>
                ))}
              </ul>
              <a href="#" className="block text-center bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700">
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
