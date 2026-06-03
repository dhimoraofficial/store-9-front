"use client";

import React from 'react';
import { sampleTestimonials, cx } from '../../_shared';

// Testimonials 3: 3-column compact grid with stars
export default function Testimonials3({ items = sampleTestimonials, className = '' }) {
  const allItems = [...items, ...items.slice(0, 1)];
  return (
    <section className={cx('bg-indigo-900 text-white py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Trusted By Many</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allItems.map((item, i) => (
            <div key={i} className="bg-indigo-800 rounded-lg p-6">
              <div className="flex mb-3">
                {[...Array(5)].map((_, s) => (
                  <span key={s} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="mb-4 italic">"{item.quote}"</p>
              <p className="font-semibold">{item.author}</p>
              <p className="text-sm text-indigo-200">{item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
