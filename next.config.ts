import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'pub-377e27553b6d484ca091c41cacb6c8e7.r2.dev',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
            },
        ]
    }
};

export default nextConfig;
