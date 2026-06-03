"use client";

import React from 'react';
import { cx } from '../../_shared';

// CTA 9: two-button choice layout
export default function CTA9({ className = '' }) {
  return (
    <section className={cx('bg-gray-800 text-white py-20 px-4', className)}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Choose your plan</h2>
        <p className="text-lg md:text-xl text-gray-300 mb-10">
          Start with a free trial or go premium for unlimited access.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-gray-700 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Free</h3>
            <p className="text-gray-300 mb-6">Perfect for getting started.</p>
            <a href="#" className="block bg-white text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-100">
              Start Free
            </a>
          </div>
          <div className="bg-indigo-600 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Premium</h3>
            <p className="text-indigo-100 mb-6">Unlock all features.</p>
            <a href="#" className="block bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100">
              Go Premium
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
