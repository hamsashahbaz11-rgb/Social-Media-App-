import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 images: {
    // This allows Next.js's Image component to optimize images from specified remote domains.
    remotePatterns: [
      {
        protocol: 'https', // Specifies the protocol (e.g., 'http', 'https')
        hostname: 'ik.imagekit.io', // The hostname of your image source
        // The pathname allows you to specify a path prefix.
        // '/**' means any path under the hostname is allowed.
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
