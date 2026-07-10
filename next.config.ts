// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "http://192.168.18.38:3000/",
    "roundup-slideshow-rendition.ngrok-free.dev",
  ],
  devIndicators: false,
};

export default nextConfig;
