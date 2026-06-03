"use client";

import React from 'react';
import { cx } from '../../_shared';

// Footer 10: full-width with app download buttons
export default function Footer10({ className = '' }) {
  return (
    <footer className={cx('bg-gray-900 text-white py-12 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Brand</h3>
            <p className="text-gray-400 text-sm">
              Empowering businesses worldwide with innovative solutions.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Download Our App</h4>
            <div className="space-y-3">
              <a href="#" className="block bg-white text-gray-900 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-100">
                📱 App Store
              </a>
              <a href="#" className="block bg-white text-gray-900 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-100">
                🤖 Google Play
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">© 2025 Brand. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white text-xl">🐦</a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">📘</a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">💼</a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">📷</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
