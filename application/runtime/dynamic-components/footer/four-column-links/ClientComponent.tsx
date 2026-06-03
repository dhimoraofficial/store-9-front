"use client";

import React from 'react';
import { sampleLinks, cx } from '../../_shared';

// Footer 2: 4-column layout with links
export default function Footer2({ className = '' }) {
  const columns = [
    { title: 'Product', links: ['Features', 'Pricing', 'Updates'] },
    { title: 'Company', links: ['About', 'Careers', 'Press'] },
    { title: 'Resources', links: ['Blog', 'Docs', 'Support'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
  ];
  return (
    <footer className={cx('bg-gray-50 py-12 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {columns.map((col, i) => (
            <div key={i}>
              <h4 className="font-bold text-gray-900 mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t pt-8 text-center text-gray-600 text-sm">
          © 2025 Company Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
