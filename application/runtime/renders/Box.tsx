import React, { ReactNode } from 'react';
import { BaseProps } from './type';

export interface BoxProps extends BaseProps {
    padding?: '0' | '100' | '200' | '300' | '400' | '500';
    background?: 'surface' | 'subdued' | 'transparent' | 'brand';
    borderRadius?: 'none' | 'base' | 'full';
    border?: 'none' | 'base' | 'divider';
    children?: ReactNode;
}

export default function ABox({
    padding = '0',
    background = 'transparent',
    borderRadius = 'none',
    border = 'none',
    children,
    id,
    dataTestId,
    className = '',
    style
}: BoxProps) {
    const paddingClasses = {
        '0': 'p-0',
        '100': 'p-2',
        '200': 'p-4',
        '300': 'p-6',
        '400': 'p-8',
        '500': 'p-12',
    };

    const bgClasses = {
        surface: 'bg-white',
        subdued: 'bg-gray-50',
        transparent: 'bg-transparent',
        brand: 'bg-slate-900',
    };

    const roundedClasses = {
        none: 'rounded-none',
        base: 'rounded-md',
        full: 'rounded-full',
    };

    const borderClasses = {
        none: 'border-0',
        base: 'border border-gray-300',
        divider: 'border-b border-gray-200',
    };

    const combinedClassName = [
        'block',
        paddingClasses[padding],
        bgClasses[background],
        roundedClasses[borderRadius],
        borderClasses[border],
        className
    ].filter(Boolean).join(' ');

    return (
        <div id={id} data-testid={dataTestId} className={combinedClassName} style={style}>
            {children}
        </div>
    );
}