"use client";

import React from 'react';
import { cx } from '../../_shared';

// CTA 1: centered block with large button
export default function CTA1({ className = '' }) {
  return (
    <section className={cx('bg-indigo-600 text-white py-20 px-4', className)}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to get started?</h2>
        <p className="text-lg md:text-xl mb-8">Join thousands of users already using our platform.</p>
        <a href="#" className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100">
          Get Started Now
        </a>
      </div>
    </section>
  );
}
