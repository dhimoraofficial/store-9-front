"use client";

import React from 'react';
import { sampleTestimonials, cx } from '../../_shared';

// Testimonials 4: horizontal scrollable cards
export default function Testimonials4({ items = sampleTestimonials, className = '' }) {
  return (
    <section className={cx('bg-gray-100 py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Client Feedback</h2>
        <div className="flex overflow-x-auto space-x-6 pb-4">
          {[...items, ...items].map((item, i) => (
            <div key={i} className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 mb-4">"{item.quote}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{item.author}</p>
                  <p className="text-xs text-gray-600">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
