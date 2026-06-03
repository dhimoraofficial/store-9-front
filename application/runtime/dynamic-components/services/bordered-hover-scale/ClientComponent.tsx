"use client";

import React from 'react';
import { sampleServices, cx } from '../../_shared';

// Services 7: bordered boxes with hover scale
export default function Services7({ items = sampleServices, className = '' }) {
  return (
    <section className={cx('bg-gray-50 py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Services We Provide</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="border-2 border-gray-200 rounded-lg p-6 hover:border-indigo-500 hover:scale-105 transition-transform bg-white"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
              <a href="#" className="inline-block mt-4 text-indigo-600 font-medium hover:underline">
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
