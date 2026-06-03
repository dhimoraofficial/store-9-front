"use client";

import React from 'react';
import { cx } from '../../_shared';

// Footer 4: minimal single row
export default function Footer4({ className = '' }) {
  return (
    <footer className={cx('bg-white border-t py-6 px-4', className)}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-600 text-sm">© 2025 Brand. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Privacy</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Terms</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Contact</a>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-900">🐦</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">📷</a>
        </div>
      </div>
    </footer>
  );
}
