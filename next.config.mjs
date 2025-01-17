/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Ensure React strict mode is enabled globally
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'capsulepost.in',
        pathname: '/**', // Allow all paths from capsulepost.in
      },
      {
        protocol: 'https',
        hostname: 'landingfoliocom.imgix.net',
        pathname: '/account123/**', // Specific path example
      },
      {
        protocol: 'https',
        hostname: 'loading.io',
        pathname: '/**', // Allow all paths from loading.io
      },
    ],
  },
};

// Use ES module export syntax
export default nextConfig;
{/*
  /** @type {import('next').NextConfig} */
/*const nextConfig = {
  images: {
    reactStrictMode: true, // Ensure React strict mode is enabled
    remotePatterns: [
      {/*
        
        protocol: 'https',
        hostname: 'landingfoliocom.imgix.net', 
        port: '',
        pathname: '/account123/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'loading.io',
        pathname: '/**', // Allow all paths from your domainconst nextConfig 
        port: '',
        search: '',
  

      },
      {
        protocol: 'https',
        hostname: 'capsulepost.in',
        pathname: '/**', // Allow all paths from your domainconst nextConfig = {
          port: '',
        search: '',
 
      },
    ],
  },
};
*/}

