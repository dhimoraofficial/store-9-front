"use client";

import React from 'react';
import { sampleTestimonials, cx } from '../../_shared';

// Testimonials 8: alternating side-by-side layout
export default function Testimonials8({ items = sampleTestimonials, className = '' }) {
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Client Experiences</h2>
        <div className="space-y-16">
          {items.map((item, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
              <div className="flex-shrink-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full" />
              <div className="flex-1">
                <p className="text-xl text-gray-700 mb-4 italic">"{item.quote}"</p>
                <p className="font-bold text-gray-900 text-lg">{item.author}</p>
                <p className="text-gray-600">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
