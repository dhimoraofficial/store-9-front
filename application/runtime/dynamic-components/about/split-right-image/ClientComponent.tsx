"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// About 1: split layout (text left, image right)
export default function About1({ className = '' }) {
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Our Company</h2>
          <p className="text-lg text-gray-700 mb-4">
            We are dedicated to providing innovative solutions that help businesses thrive in the digital age.
          </p>
          <p className="text-gray-600 mb-6">
            Founded in 2020, we've helped over 1,000 companies transform their operations and reach new heights.
          </p>
          <a href="#" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700">
            Learn More
          </a>
        </div>
        <div>
          <img src={placeholderImage(600, 400, 'About')} alt="About" className="rounded-lg shadow-lg w-full" />
        </div>
      </div>
    </section>
  );
}
