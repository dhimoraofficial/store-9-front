"use client";

import React from 'react';
import { cx } from '../../_shared';

// CTA 5: minimal with border
export default function CTA5({ className = '' }) {
  return (
    <section className={cx('bg-white py-20 px-4', className)}>
      <div className="max-w-4xl mx-auto border-4 border-blue-600 rounded-lg p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Supercharge your workflow
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Get started in minutes with our easy setup.
        </p>
        <a href="#" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700">
          Get Started
        </a>
      </div>
    </section>
  );
}
