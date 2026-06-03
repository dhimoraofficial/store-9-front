"use client";

import React from 'react';
import { cx } from '../../_shared';

// CTA 7: side-by-side with icon
export default function CTA7({ className = '' }) {
  return (
    <section className={cx('bg-blue-50 py-16 px-4', className)}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
          <span className="text-7xl">🚀</span>
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Launch your project today
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Everything you need to build and deploy in minutes.
          </p>
          <a href="#" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700">
            Start Building
          </a>
        </div>
      </div>
    </section>
  );
}
