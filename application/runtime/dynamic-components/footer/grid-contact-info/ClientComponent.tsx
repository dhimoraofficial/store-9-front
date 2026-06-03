"use client";

import React from 'react';
import { cx } from '../../_shared';

// Footer 6: grid with contact info
export default function Footer6({ className = '' }) {
  return (
    <footer className={cx('bg-gray-800 text-white py-12 px-4', className)}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-bold text-lg mb-4">About Us</h4>
          <p className="text-gray-300 text-sm">
            We are a leading provider of innovative solutions for modern businesses.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4">Contact</h4>
          <p className="text-gray-300 text-sm mb-2">📧 hello@company.com</p>
          <p className="text-gray-300 text-sm mb-2">📞 +1 (555) 123-4567</p>
          <p className="text-gray-300 text-sm">📍 123 Main St, City, Country</p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-600">
              🐦
            </a>
            <a href="#" className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-600">
              📘
            </a>
            <a href="#" className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-600">
              💼
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
        © 2025 Company. All rights reserved.
      </div>
    </footer>
  );
}
