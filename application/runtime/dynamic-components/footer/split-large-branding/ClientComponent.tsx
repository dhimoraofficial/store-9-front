"use client";

import React from 'react';
import { cx } from '../../_shared';

// Footer 7: split with large branding
export default function Footer7({ className = '' }) {
  return (
    <footer className={cx('bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-4xl font-bold mb-4">Let's Build Together</h3>
          <p className="text-blue-100 mb-6">
            Join our community of creators and innovators.
          </p>
          <a href="#" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100">
            Get Started
          </a>
        </div>
        <div className="text-right">
          <h4 className="font-bold mb-4">Connect With Us</h4>
          <div className="flex justify-end space-x-4 mb-6">
            <a href="#" className="text-3xl hover:text-blue-200">🐦</a>
            <a href="#" className="text-3xl hover:text-blue-200">📘</a>
            <a href="#" className="text-3xl hover:text-blue-200">📧</a>
          </div>
          <p className="text-blue-100 text-sm">© 2025 Brand Inc.</p>
        </div>
      </div>
    </footer>
  );
}
