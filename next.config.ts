import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "evotqfydmmastmhizxkz.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/player-images/**", // Locks it down to my specific bucket
      },
      // For placeholder images
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
