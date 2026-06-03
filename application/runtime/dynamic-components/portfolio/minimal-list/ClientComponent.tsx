"use client";

import React from 'react';
import { samplePortfolio, cx } from '../../_shared';

// Portfolio 7: minimal list layout
export default function Portfolio7({ items = samplePortfolio, className = '' }) {
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Projects</h2>
        <div className="space-y-8">
          {items.map((item, i) => (
            <div key={i} className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.tags.join(' • ')}</p>
                </div>
                <a href="#" className="text-blue-600 font-semibold hover:underline ml-4">
                  View →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
