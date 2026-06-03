"use client";

import React from 'react';
import { samplePortfolio, cx } from '../../_shared';

// Portfolio 2: masonry layout
export default function Portfolio2({ items = samplePortfolio, className = '' }) {
  return (
    <section className={cx('bg-gray-50 py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Featured Work</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className={`relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow ${
                i % 5 === 0 ? 'md:row-span-2' : ''
              }`}
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <p className="text-gray-200 text-sm">{item.tags.join(' • ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
