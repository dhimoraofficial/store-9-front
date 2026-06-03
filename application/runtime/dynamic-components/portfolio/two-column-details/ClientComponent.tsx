"use client";

import React from 'react';
import { samplePortfolio, cx } from '../../_shared';

// Portfolio 4: 2-column card layout with details
export default function Portfolio4({ items = samplePortfolio, className = '' }) {
  return (
    <section className={cx('bg-gray-100 py-16 px-4', className)}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Case Studies</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {items.slice(0, 6).map((item, i) => (
            <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.tags.join(' • ')}</p>
                <a href="#" className="text-blue-600 font-semibold hover:underline">
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
