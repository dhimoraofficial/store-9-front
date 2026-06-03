"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// Hero 7: card-style centered block with shadow
export default function Hero7({ className = '' }) {
  return (
    <section className={cx('bg-gray-100 py-20 px-4', className)}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Unlock your potential
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of professionals who trust our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700">
              Sign Up Free
            </a>
            <a href="#" className="bg-gray-200 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-300">
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
