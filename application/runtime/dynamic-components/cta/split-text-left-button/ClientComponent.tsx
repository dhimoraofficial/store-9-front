"use client";

import React from 'react';
import { cx } from '../../_shared';

// CTA 2: split layout (text left, button right)
export default function CTA2({ className = '' }) {
  return (
    <section className={cx('bg-gray-900 text-white py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start your free trial today</h2>
          <p className="text-lg text-gray-300">No credit card required. Cancel anytime.</p>
        </div>
        <div className="flex-shrink-0">
          <a href="#" className="bg-green-500 text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-green-600">
            Sign Up Free
          </a>
        </div>
      </div>
    </section>
  );
}
