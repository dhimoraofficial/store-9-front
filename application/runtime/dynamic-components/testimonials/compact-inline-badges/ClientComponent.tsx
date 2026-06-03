"use client";

import React from 'react';
import { sampleTestimonials, cx } from '../../_shared';

// Testimonials 10: compact inline badges
export default function Testimonials10({ items = sampleTestimonials, className = '' }) {
  return (
    <section className={cx('bg-gray-50 py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Happy Customers</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[...items, ...items].map((item, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 text-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3" />
              <p className="text-sm text-gray-700 mb-2 italic">"{item.quote}"</p>
              <p className="font-semibold text-gray-900 text-sm">{item.author}</p>
              <p className="text-xs text-gray-600">{item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
