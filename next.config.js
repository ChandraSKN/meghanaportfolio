/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: "/meghanaportfolio", // ← IMPORTANT for GitHub Pages
};

module.exports = nextConfig;
