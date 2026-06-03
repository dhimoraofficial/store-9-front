"use client";

import React from 'react';
import { sampleServices, cx } from '../../_shared';

// Services 8: stacked layout with left-aligned text
export default function Services8({ items = sampleServices, className = '' }) {
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">What We Do Best</h2>
        <div className="space-y-10">
          {items.map((item, i) => (
            <div key={i} className="border-l-4 border-blue-500 pl-6">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
              </div>
              <p className="text-gray-600 text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
