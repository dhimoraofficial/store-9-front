"use client";

import React from 'react';
import { cx } from '../../_shared';

// Footer 5: dark with logo and social icons
export default function Footer5({ className = '' }) {
  return (
    <footer className={cx('bg-black text-white py-12 px-4', className)}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">🚀 StartupCo</h3>
            <p className="text-gray-400">Building the future, today.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-3xl hover:text-gray-400">🐦</a>
            <a href="#" className="text-3xl hover:text-gray-400">📘</a>
            <a href="#" className="text-3xl hover:text-gray-400">💼</a>
            <a href="#" className="text-3xl hover:text-gray-400">📷</a>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          © 2025 StartupCo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
