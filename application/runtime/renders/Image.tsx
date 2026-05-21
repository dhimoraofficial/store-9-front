import React from "react";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
    aspectRatio?: 'square' | 'video' | 'auto';
}

export default function AImage({
    src,
    alt,
    fallbackSrc,
    aspectRatio = 'auto',
    loading = 'lazy',
    className = '',
    onError,
    ...props
}: ImageProps) {
    const aspectVariants = {
        square: 'aspect-square object-cover',
        video: 'aspect-video object-cover',
        auto: '',
    };

    const computedClasses = [
        aspectVariants[aspectRatio],
        className
    ].filter(Boolean).join(' ');

    return (
        <img
            src={src}
            alt={alt}
            loading={loading}
            className={computedClasses}
            {...props}
        />
    );
}