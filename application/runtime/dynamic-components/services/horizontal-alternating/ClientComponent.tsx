"use client";

import React from 'react';
import { sampleServices, cx } from '../../_shared';

// Services 3: horizontal cards with alternating layout
export default function Services3({ items = sampleServices, className = '' }) {
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Solutions</h2>
        <div className="space-y-12">
          {items.map((item, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
              <div className="flex-1">
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-lg">{item.desc}</p>
              </div>
              <div className="flex-1 bg-gray-100 rounded-lg h-64 flex items-center justify-center text-gray-400">
                Image Placeholder
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
