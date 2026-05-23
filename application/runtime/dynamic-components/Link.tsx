import React from 'react';
import Link from 'next/link';

export interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** The target URL string or route path destination */
    href: string;
    /** Enforce external security parameters for outbound connections */
    isExternal?: boolean;
    label?: string;
    content?: string;
}

export default function ALink({
    href,
    isExternal = false,
    className = '',
    children,
    label,
    content,
    ...props
}: CustomLinkProps) {

    const resolvedChildren = children ?? content ?? label;

    if (isExternal || href.startsWith('http')) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props}>
                {resolvedChildren}
            </a>
        );
    }

    return (
        <Link href={href} className={className} {...props}>
            {resolvedChildren}
        </Link>
    );
}