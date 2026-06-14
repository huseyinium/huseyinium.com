/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://huseyinium.com',
  generateRobotsTxt: true,
  outDir: './out',
}
