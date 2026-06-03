"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// Hero 4: minimal centered with badges
export default function Hero4({ className = '' }) {
  return (
    <section className={cx('bg-white py-24 px-4', className)}>
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <span>🎉</span>
          <span>Now in beta</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6">
          Simplify your workflow
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          All-in-one platform for modern teams.
        </p>
        <a href="#" className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800">
          Get early access
        </a>
      </div>
    </section>
  );
}
