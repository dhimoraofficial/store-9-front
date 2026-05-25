import React from 'react';
import * as Lucide from 'lucide-react';
import { BaseProps } from './type';

/**
 * IconProps - Icon component props
 */
export interface IconProps extends BaseProps {
    label: string;
    size?: number | string;
    color?: string;
}

export default function AIcon({ label, size, color }: IconProps) {
    const ICO = (Lucide as any)?.[label];

    if (!ICO) return null;

    return React.createElement(ICO, { size: size || 16, color });
}
