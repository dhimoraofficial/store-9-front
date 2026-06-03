"use client";

import React from 'react';
import { sampleTestimonials, cx } from '../../_shared';

// Testimonials 7: video-style cards with play button
export default function Testimonials7({ items = sampleTestimonials, className = '' }) {
  return (
    <section className={cx('bg-gray-900 text-white py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Video Testimonials</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="relative aspect-video bg-gray-700 flex items-center justify-center">
                <button className="text-6xl hover:text-gray-300">▶️</button>
              </div>
              <div className="p-6">
                <p className="mb-4">"{item.quote}"</p>
                <p className="font-bold">{item.author}</p>
                <p className="text-sm text-gray-400">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
