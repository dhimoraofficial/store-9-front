"use client";

import React from 'react';
import { samplePortfolio, cx } from '../../_shared';

// Portfolio 9: compact 5-column grid
export default function Portfolio9({ items = samplePortfolio, className = '' }) {
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {items.map((item, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-110 transition-transform" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
