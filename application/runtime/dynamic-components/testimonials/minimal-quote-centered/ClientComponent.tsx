"use client";

import React from 'react';
import { sampleTestimonials, cx } from '../../_shared';

// Testimonials 9: minimal quote cards centered
export default function Testimonials9({ items = sampleTestimonials, className = '' }) {
  return (
    <section className={cx('bg-yellow-50 py-16 px-4', className)}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Kind Words</h2>
        <div className="space-y-8">
          {items.map((item, i) => (
            <div key={i} className="bg-white border-2 border-yellow-300 rounded-lg p-8 text-center">
              <p className="text-3xl text-yellow-600 mb-4">"</p>
              <p className="text-lg text-gray-700 mb-4">{item.quote}</p>
              <p className="font-bold text-gray-900">{item.author}</p>
              <p className="text-sm text-gray-600">{item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
