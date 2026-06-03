"use client";

import React from 'react';
import { sampleTestimonials, cx } from '../../_shared';

// Testimonials 2: centered single card with navigation dots
export default function Testimonials2({ items = sampleTestimonials, className = '' }) {
  const [current, setCurrent] = React.useState(0);
  const item = items[current];
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Customer Reviews</h2>
        <div className="bg-gray-50 rounded-lg p-8 md:p-12">
          <p className="text-xl text-gray-700 mb-6 italic">"{item.quote}"</p>
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4" />
          <p className="font-bold text-gray-900">{item.author}</p>
          <p className="text-sm text-gray-600">{item.role}</p>
        </div>
        <div className="flex justify-center space-x-2 mt-6">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full ${i === current ? 'bg-indigo-600' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
