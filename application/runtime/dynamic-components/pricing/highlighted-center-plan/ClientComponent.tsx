"use client";

import React from 'react';
import { cx } from '../../_shared';

// Pricing 2: highlighted center plan
export default function Pricing2({ className = '' }) {
  const plans = [
    { name: 'Basic', price: '$10', featured: false },
    { name: 'Popular', price: '$25', featured: true },
    { name: 'Premium', price: '$50', featured: false },
  ];
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Choose Your Plan</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-lg p-8 text-center ${
                plan.featured
                  ? 'bg-gradient-to-b from-indigo-600 to-purple-600 text-white transform md:scale-110 shadow-2xl'
                  : 'bg-gray-50 text-gray-900 shadow-md'
              }`}
            >
              {plan.featured && <p className="text-sm font-semibold mb-2">MOST POPULAR</p>}
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-5xl font-bold mb-6">{plan.price}<span className="text-lg">/mo</span></p>
              <a
                href="#"
                className={`block px-6 py-3 rounded-md font-semibold ${
                  plan.featured ? 'bg-white text-indigo-600 hover:bg-gray-100' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Select Plan
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
