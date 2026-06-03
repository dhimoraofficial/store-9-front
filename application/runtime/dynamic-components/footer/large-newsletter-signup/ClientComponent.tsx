"use client";

import React from 'react';
import { cx } from '../../_shared';

// Footer 3: large with newsletter signup
export default function Footer3({ className = '' }) {
  return (
    <footer className={cx('bg-indigo-900 text-white py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-3xl font-bold mb-4">Stay Connected</h3>
            <p className="text-indigo-200 mb-6">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-white text-indigo-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-100">
                Subscribe
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-indigo-200 hover:text-white">Home</a></li>
                <li><a href="#" className="text-indigo-200 hover:text-white">About</a></li>
                <li><a href="#" className="text-indigo-200 hover:text-white">Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="text-2xl hover:text-indigo-200">🐦</a>
                <a href="#" className="text-2xl hover:text-indigo-200">💼</a>
                <a href="#" className="text-2xl hover:text-indigo-200">📧</a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-indigo-800 pt-8 text-center text-indigo-300 text-sm">
          © 2025 Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
