/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    assetPrefix: './',
    output:"export",
    distDir:"/extension/next",
    images:{
        unoptimized:true
    }
};

export default nextConfig;
