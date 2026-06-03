"use client";

import React from 'react';
import { sampleServices, cx } from '../../_shared';

// Services 5: list layout with numbered items
export default function Services5({ items = sampleServices, className = '' }) {
  return (
    <section className={cx('bg-gradient-to-b from-white to-gray-50 py-16 px-4', className)}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600">Simple steps to get started</p>
        </div>
        <div className="space-y-8">
          {items.map((item, i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                {i + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
