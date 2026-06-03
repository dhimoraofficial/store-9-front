"use client";

import React from 'react';
import { sampleTestimonials, cx } from '../../_shared';

// Testimonials 6: masonry-style grid with varying card sizes
export default function Testimonials6({ items = sampleTestimonials, className = '' }) {
  return (
    <section className={cx('bg-gradient-to-b from-blue-50 to-white py-16 px-4', className)}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Hear From Our Customers</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className={`bg-white rounded-lg shadow-lg p-6 ${i === 0 ? 'md:col-span-2' : ''}`}
            >
              <p className="text-gray-700 mb-4 text-lg">"{item.quote}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-200 rounded-full mr-4" />
                <div>
                  <p className="font-bold text-gray-900">{item.author}</p>
                  <p className="text-sm text-gray-600">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
