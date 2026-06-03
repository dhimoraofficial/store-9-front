"use client";

import React from 'react';
import { samplePortfolio, cx } from '../../_shared';

// Portfolio 8: large featured + small grid
export default function Portfolio8({ items = samplePortfolio, className = '' }) {
  const [featured, ...rest] = items;
  return (
    <section className={cx('bg-gray-900 text-white py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Showcase</h2>
        <div className="mb-8">
          <div className="relative group overflow-hidden rounded-lg">
            <img src={featured.image} alt={featured.title} className="w-full h-96 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-2">{featured.title}</h3>
                <p>{featured.tags.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {rest.slice(0, 4).map((item, i) => (
            <div key={i} className="relative rounded-lg overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-3">
                <p className="text-sm font-semibold">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
