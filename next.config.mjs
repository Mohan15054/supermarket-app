/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // ✅ needed for static export
  trailingSlash: true,       // ✅ helps avoid 404s on GitHub Pages
  images: {
    unoptimized: true,       // ✅ required (no Image Optimization on GH Pages)
  },
  basePath: '/supermarket-app/docs',   // ✅ repo name as base path
  assetPrefix: '/supermarket-app/docs/', // ✅ ensures static assets load correctly
};

export default nextConfig;
