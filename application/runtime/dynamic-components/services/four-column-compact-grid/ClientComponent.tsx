"use client";

import React from 'react';
import { sampleServices, cx } from '../../_shared';

// Services 9: 4-column compact grid
export default function Services9({ items = sampleServices, className = '' }) {
  return (
    <section className={cx('bg-indigo-50 py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Comprehensive Solutions</h2>
          <p className="text-gray-600">Tailored to your needs</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...items, ...items.slice(0, 1)].map((item, i) => (
            <div key={i} className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
