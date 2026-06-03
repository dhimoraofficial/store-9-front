"use client";

import React from 'react';
import { cx } from '../../_shared';

// Pricing 8: 4-column compact layout
export default function Pricing8({ className = '' }) {
  const plans = ['Free', 'Starter', 'Growth', 'Scale'];
  return (
    <section className={cx('bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Choose Your Tier</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <div key={i} className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-4">{plan}</h3>
              <p className="text-3xl font-bold mb-6">${i * 10}{i === 0 ? '' : '/mo'}</p>
              <a href="#" className="block bg-white text-indigo-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100">
                Choose Plan
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
