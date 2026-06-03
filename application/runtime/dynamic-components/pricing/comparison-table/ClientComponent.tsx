"use client";

import React from 'react';
import { cx } from '../../_shared';

// Pricing 4: comparison table
export default function Pricing4({ className = '' }) {
  const features = ['Feature A', 'Feature B', 'Feature C', 'Feature D'];
  const plans = [
    { name: 'Free', price: '$0', checks: [true, false, false, false] },
    { name: 'Pro', price: '$20', checks: [true, true, true, false] },
    { name: 'Enterprise', price: '$50', checks: [true, true, true, true] },
  ];
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Compare Plans</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2">
                <th className="text-left p-4 font-bold text-gray-900">Features</th>
                {plans.map((plan, i) => (
                  <th key={i} className="p-4 text-center">
                    <div className="font-bold text-xl text-gray-900">{plan.name}</div>
                    <div className="text-2xl font-bold text-indigo-600">{plan.price}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr key={i} className="border-b">
                  <td className="p-4 text-gray-700">{feature}</td>
                  {plans.map((plan, j) => (
                    <td key={j} className="p-4 text-center">
                      {plan.checks[i] ? <span className="text-green-600 text-2xl">✓</span> : <span className="text-gray-300 text-2xl">✗</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
