"use client"

import React, { useState } from "react";
import { BaseProps } from "../type";

export interface ParsedImageProps extends BaseProps {
    src?: string;
    alt?: string;
    loading?: "lazy" | "eager";
    fallbackSrc?: string;
    priority?: "true" | "false";
    style?: React.CSSProperties;
}

export default function AImage({
    src,
    alt = "",
    loading = "lazy",
    fallbackSrc,
    priority = "false",
    style,
    id,
    className = "",
}: ParsedImageProps) {
    const [imgSrc, setImgSrc] = useState(src);

    const handleError = () => {
        if (fallbackSrc) {
            setImgSrc(fallbackSrc);
        }
    };

    return (
        <img
            id={id}
            src={imgSrc}
            alt={alt}
            loading={priority === "true" ? undefined : loading}
            onError={handleError}
            className={className}
            style={style}
        />
    );
}

export interface ImageProps {
    fallbackSrc?: string;
    aspectRatio?: 'square' | 'video' | 'auto';
}
