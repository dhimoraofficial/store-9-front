"use client";

import React from 'react';
import { cx } from '../../_shared';

// Pricing 7: horizontal card layout
export default function Pricing7({ className = '' }) {
  const plans = [
    { name: 'Lite', price: '$5', desc: 'For individuals' },
    { name: 'Standard', price: '$15', desc: 'For small teams' },
    { name: 'Pro', price: '$35', desc: 'For large organizations' },
  ];
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Pricing Options</h2>
        <div className="space-y-6">
          {plans.map((plan, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center justify-between bg-gray-50 rounded-lg p-6 shadow-md">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-gray-600">{plan.desc}</p>
              </div>
              <div className="text-3xl font-bold text-indigo-600 my-4 md:my-0">{plan.price}/mo</div>
              <a href="#" className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700">
                Select
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
