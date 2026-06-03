"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// CTA 3: background image with overlay
export default function CTA3({ className = '' }) {
  return (
    <section
      className={cx('relative bg-cover bg-center py-24 px-4', className)}
      style={{ backgroundImage: `url(${placeholderImage(1920, 600, 'CTA Background')})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <div className="relative max-w-3xl mx-auto text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Transform your business</h2>
        <p className="text-xl mb-8">Experience the difference with our powerful platform.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#" className="bg-white text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100">
            Learn More
          </a>
          <a href="#" className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-gray-900">
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  );
}
