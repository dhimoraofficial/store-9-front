"use client";

import React from 'react';
import { cx } from '../../_shared';

// Footer 8: stacked with badge/logo grid
export default function Footer8({ className = '' }) {
  const partners = ['Partner A', 'Partner B', 'Partner C', 'Partner D'];
  return (
    <footer className={cx('bg-white py-12 px-4', className)}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Trusted By</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {partners.map((p) => (
              <span key={p} className="text-gray-400 font-semibold text-lg">
                {p}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t pt-8">
          <p className="text-gray-600 text-sm">© 2025 Your Brand. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
