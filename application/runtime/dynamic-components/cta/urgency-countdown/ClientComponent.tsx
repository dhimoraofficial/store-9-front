"use client";

import React from 'react';
import { cx } from '../../_shared';

// CTA 10: urgency-driven with countdown style
export default function CTA10({ className = '' }) {
  return (
    <section className={cx('bg-red-600 text-white py-16 px-4', className)}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block bg-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          ⏰ Limited Time Offer
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Don't miss out!</h2>
        <p className="text-xl mb-8">Get 50% off your first year. Offer ends soon.</p>
        <a href="#" className="inline-block bg-white text-red-600 px-10 py-4 rounded-lg text-lg font-bold hover:bg-gray-100">
          Claim Your Discount
        </a>
      </div>
    </section>
  );
}
