"use client";

import React from 'react';
import { sampleLinks, cx } from '../../_shared';

// Footer 1: simple centered layout
export default function Footer1({ className = '' }) {
  return (
    <footer className={cx('bg-gray-900 text-white py-12 px-4', className)}>
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4">Brand</h3>
        <div className="flex justify-center space-x-6 mb-6">
          {sampleLinks.slice(0, 4).map((link) => (
            <a key={link} href="#" className="hover:text-gray-300">
              {link}
            </a>
          ))}
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          <a href="#" className="text-2xl hover:text-gray-300">🐦</a>
          <a href="#" className="text-2xl hover:text-gray-300">📘</a>
          <a href="#" className="text-2xl hover:text-gray-300">📷</a>
        </div>
        <p className="text-gray-400 text-sm">© 2025 Brand. All rights reserved.</p>
      </div>
    </footer>
  );
}
