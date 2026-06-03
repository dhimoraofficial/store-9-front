"use client";

import React from 'react';
import { cx } from '../../_shared';

// Pricing 6: bordered cards with check marks
export default function Pricing6({ className = '' }) {
  const plans = [
    { name: 'Personal', price: '$12', features: ['1 User', '5 Projects', 'Basic Support'] },
    { name: 'Team', price: '$39', features: ['10 Users', 'Unlimited Projects', 'Priority Support', 'Analytics'] },
  ];
  return (
    <section className={cx('bg-blue-50 py-16 px-4', className)}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Affordable Plans</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className="bg-white border-2 border-blue-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-4xl font-bold text-blue-600 mb-6">{plan.price}<span className="text-lg text-gray-600">/month</span></p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className="block text-center bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700">
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
