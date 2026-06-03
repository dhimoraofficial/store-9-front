"use client";

import React from 'react';
import { samplePortfolio, cx } from '../../_shared';

// Portfolio 3: horizontal scrollable cards
export default function Portfolio3({ items = samplePortfolio, className = '' }) {
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Recent Projects</h2>
        <div className="flex overflow-x-auto space-x-6 pb-4">
          {items.map((item, i) => (
            <div key={i} className="shrink-0 w-80">
              <img src={item.image} alt={item.title} className="w-full h-56 object-cover rounded-lg shadow-md mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.tags.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
