"use client";

import React from 'react';
import { samplePortfolio, cx } from '../../_shared';

// Portfolio 5: full-width stacked with alternating layouts
export default function Portfolio5({ items = samplePortfolio, className = '' }) {
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Selected Works</h2>
        <div className="space-y-16">
          {items.slice(0, 4).map((item, i) => (
            <div key={i} className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
              <div className={i % 2 === 0 ? 'order-1' : 'order-2'}>
                <img src={item.image} alt={item.title} className="rounded-lg shadow-xl w-full" />
              </div>
              <div className={i % 2 === 0 ? 'order-2' : 'order-1'}>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.tags.join(', ')}</p>
                <p className="text-lg text-gray-700 mb-6">
                  A comprehensive project showcasing our expertise and attention to detail.
                </p>
                <a href="#" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800">
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
