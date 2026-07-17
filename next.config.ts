import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "substackcdn.com",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "substack-post-media.s3.amazonaws.com",
        pathname: "/public/images/**",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "a.ltrbxd.com",
        pathname: "/resized/**",
      },
    ],
  },
  // Old routes kept alive so shared links — post permalinks especially — survive
  // the renames to /cinematography and /cinema-journalism.
  async redirects() {
    return [
      { source: "/film", destination: "/cinematography", permanent: true },
      { source: "/reel", destination: "/cinematography", permanent: true },
      {
        source: "/cinematic-analysis",
        destination: "/cinema-journalism",
        permanent: true,
      },
      {
        source: "/cinematic-analysis/:slug",
        destination: "/cinema-journalism/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
