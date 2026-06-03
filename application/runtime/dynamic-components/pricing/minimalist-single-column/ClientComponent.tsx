"use client";

import React from 'react';
import { cx } from '../../_shared';

// Pricing 5: minimalist single-column
export default function Pricing5({ className = '' }) {
  const plans = ['Starter - $10/mo', 'Business - $30/mo', 'Enterprise - Custom'];
  return (
    <section className={cx('bg-gray-900 text-white py-20 px-4', className)}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">Simple Pricing</h2>
        <div className="space-y-4">
          {plans.map((plan, i) => (
            <div key={i} className="bg-gray-800 rounded-lg p-6 flex items-center justify-between">
              <p className="text-xl font-semibold">{plan}</p>
              <a href="#" className="bg-white text-gray-900 px-6 py-2 rounded-md font-semibold hover:bg-gray-100">
                Choose
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
