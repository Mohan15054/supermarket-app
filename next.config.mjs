/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Set the basePath and assetPrefix for GitHub Pages
  // Replace 'your-repo-name' with your actual repository name
  basePath: '/supermarket-app',
  assetPrefix: '/supermarket-app/',
};

export default nextConfig;
