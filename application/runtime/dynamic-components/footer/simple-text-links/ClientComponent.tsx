"use client";

import React from 'react';
import { cx } from '../../_shared';

// Footer 9: simple text-only links
export default function Footer9({ className = '' }) {
  const links = ['Home', 'About', 'Services', 'Blog', 'Contact', 'Privacy', 'Terms'];
  return (
    <footer className={cx('bg-gray-100 py-8 px-4', className)}>
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          {links.map((link) => (
            <a key={link} href="#" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
              {link}
            </a>
          ))}
        </div>
        <p className="text-gray-500 text-sm">© 2025 Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
}
