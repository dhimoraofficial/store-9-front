import React from 'react';
import { BaseProps } from './type';

/**
 * IconProps - Icon component props
 */
export interface IconProps extends BaseProps {
    label: string;
    size?: number | string;
    color?: string;
}

export default async function AIcon({ label, size, color }: IconProps) {
    const Lucide = await import("lucide-react");
    const ICO = (Lucide as any)?.[label];

    if (!ICO) return null;

    return React.createElement(ICO, { size: size || 16, color });
}
