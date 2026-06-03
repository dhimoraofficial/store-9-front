"use client";

import React from 'react';
import { sampleTestimonials, cx } from '../../_shared';

// Testimonials 5: stacked list with large quotes
export default function Testimonials5({ items = sampleTestimonials, className = '' }) {
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Success Stories</h2>
        <div className="space-y-12">
          {items.map((item, i) => (
            <div key={i} className="border-l-4 border-green-500 pl-6">
              <p className="text-2xl text-gray-700 font-light mb-4 italic">"{item.quote}"</p>
              <p className="font-bold text-gray-900 text-lg">{item.author}</p>
              <p className="text-gray-600">{item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
