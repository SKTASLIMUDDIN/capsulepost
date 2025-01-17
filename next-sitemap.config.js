/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://yourdomain.com', // Replace with your domain
    generateRobotsTxt: true, // Generates robots.txt file
    sitemapSize: 7000, // Maximum number of URLs per sitemap file
    exclude: ['/admin/*'], // Exclude pages or paths
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' },
        { userAgent: '*', disallow: '/admin/*' },
      ],
    },
  };
  