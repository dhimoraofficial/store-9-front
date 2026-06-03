"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// About 9: minimal centered block
export default function About9({ className = '' }) {
  return (
    <section className={cx('bg-gray-100 py-20 px-4', className)}>
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <img src={placeholderImage(200, 200, 'Logo')} alt="Logo" className="w-24 h-24 mx-auto rounded-full shadow-md" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About Us</h2>
        <p className="text-lg text-gray-700 mb-6">
          We are a team of designers, developers, and dreamers creating products that people love.
        </p>
        <p className="text-gray-600">
          Our approach is simple: listen, create, iterate. We work closely with our clients to bring their vision to life.
        </p>
      </div>
    </section>
  );
}
