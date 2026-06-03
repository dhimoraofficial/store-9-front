"use client";

import React, { useState } from 'react';
import { cx } from '../../_shared';

// Pricing 3: toggle monthly/yearly
export default function Pricing3({ className = '' }) {
  const [yearly, setYearly] = useState(false);
  const plans = [
    { name: 'Basic', monthly: 15, yearly: 150 },
    { name: 'Pro', monthly: 30, yearly: 300 },
  ];
  return (
    <section className={cx('bg-gray-100 py-16 px-4', className)}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">Flexible Pricing</h2>
        <div className="flex justify-center items-center space-x-4 mb-12">
          <span className={`font-semibold ${!yearly ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
          <button
            onClick={() => setYearly(!yearly)}
            className="w-14 h-8 bg-indigo-600 rounded-full relative"
          >
            <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all ${yearly ? 'right-1' : 'left-1'}`} />
          </button>
          <span className={`font-semibold ${yearly ? 'text-gray-900' : 'text-gray-500'}`}>Yearly (Save 20%)</span>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
              <p className="text-5xl font-bold text-indigo-600 mb-6">
                ${yearly ? plan.yearly : plan.monthly}
                <span className="text-lg text-gray-600">/{yearly ? 'year' : 'mo'}</span>
              </p>
              <a href="#" className="block bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700">
                Subscribe
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
