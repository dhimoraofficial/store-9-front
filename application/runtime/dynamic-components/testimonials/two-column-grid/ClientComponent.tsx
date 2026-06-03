"use client";

import React from 'react';
import { sampleTestimonials, cx } from '../../_shared';

// Testimonials 1: simple 2-column grid
export default function Testimonials1({ items = sampleTestimonials, className = '' }) {
  return (
    <section className={cx('bg-gray-50 py-16 px-4', className)}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 mb-4 italic">"{item.quote}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4" />
                <div>
                  <p className="font-semibold text-gray-900">{item.author}</p>
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
