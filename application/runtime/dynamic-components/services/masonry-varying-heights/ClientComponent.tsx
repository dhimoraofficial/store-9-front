"use client";

import React from 'react';
import { sampleServices, cx } from '../../_shared';

// Services 10: masonry-style layout with varying heights
export default function Services10({ items = sampleServices, className = '' }) {
  return (
    <section className={cx('bg-gray-100 py-16 px-4', className)}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Explore Our Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className={`bg-white rounded-lg p-8 shadow-md ${i === 0 ? 'md:row-span-2' : ''}`}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
              {i === 0 && (
                <p className="mt-4 text-gray-600">
                  Additional details for featured service. This card spans two rows.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
