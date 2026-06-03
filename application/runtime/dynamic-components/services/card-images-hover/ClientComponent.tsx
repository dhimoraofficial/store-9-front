"use client";

import React from 'react';
import { sampleServices, placeholderImage, cx } from '../../_shared';

// Services 2: card layout with images and hover effects
export default function Services2({ items = sampleServices, className = '' }) {
  return (
    <section className={cx('bg-gray-50 py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">What We Offer</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
              <img src={placeholderImage(400, 250, item.title)} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-6">
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
