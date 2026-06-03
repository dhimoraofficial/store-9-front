"use client";

import React from 'react';
import { cx } from '../../_shared';

// CTA 6: full-width banner with form input
export default function CTA6({ className = '' }) {
  return (
    <section className={cx('bg-yellow-400 py-12 px-4', className)}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Subscribe to our newsletter
        </h2>
        <p className="text-lg text-gray-800 mb-6">Get the latest updates delivered to your inbox.</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-md border-2 border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <button className="bg-gray-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
