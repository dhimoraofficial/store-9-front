"use client";

import React from 'react';
import { cx } from '../../_shared';

// CTA 8: compact inline banner
export default function CTA8({ className = '' }) {
  return (
    <section className={cx('bg-green-600 text-white py-8 px-4', className)}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold mb-1">Try it risk-free for 30 days</h3>
          <p className="text-green-100">Money-back guarantee. No questions asked.</p>
        </div>
        <a href="#" className="bg-white text-green-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 whitespace-nowrap">
          Start Trial
        </a>
      </div>
    </section>
  );
}
