"use client";

import React from 'react';
import { sampleServices, cx } from '../../_shared';

// Services 6: minimal grid with large icons
export default function Services6({ items = sampleServices, className = '' }) {
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-16">Core Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {items.map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-7xl mb-6">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
