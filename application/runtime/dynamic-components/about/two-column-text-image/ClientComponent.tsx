"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// About 8: two-column text with side image
export default function About8({ className = '' }) {
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <p className="text-lg text-gray-700">
              We combine years of industry expertise with a fresh, innovative approach. Our team is committed to delivering results that exceed expectations.
            </p>
            <p className="text-lg text-gray-700">
              From startups to enterprise clients, we tailor our solutions to meet your unique needs and help you achieve your goals faster.
            </p>
            <p className="text-lg text-gray-700">
              With a focus on quality, reliability, and customer satisfaction, we're proud to be a trusted partner for businesses worldwide.
            </p>
          </div>
          <div>
            <img src={placeholderImage(400, 500, 'Why Us')} alt="Why Us" className="rounded-lg shadow-lg w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
