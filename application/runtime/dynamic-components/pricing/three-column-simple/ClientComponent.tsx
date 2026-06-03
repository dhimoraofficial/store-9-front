"use client";

import React from 'react';
import { cx } from '../../_shared';

// Pricing 1: 3-column simple pricing cards
export default function Pricing1({ className = '' }) {
  const plans = [
    { name: 'Starter', price: '$9', features: ['5 Projects', '10 GB Storage', 'Email Support'] },
    { name: 'Pro', price: '$29', features: ['Unlimited Projects', '100 GB Storage', 'Priority Support', 'Analytics'] },
    { name: 'Enterprise', price: '$99', features: ['Everything in Pro', 'Dedicated Manager', 'Custom Integration'] },
  ];
  return (
    <section className={cx('bg-gray-50 py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pricing Plans</h2>
          <p className="text-lg text-gray-600">Choose the plan that fits your needs</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold text-indigo-600 mb-6">{plan.price}<span className="text-lg text-gray-600">/mo</span></p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="text-gray-700">{f}</li>
                ))}
              </ul>
              <a href="#" className="block bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700">
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
