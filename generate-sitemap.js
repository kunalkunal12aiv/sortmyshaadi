const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/venues', changefreq: 'weekly', priority: 0.8 },
  { url: '/decor', changefreq: 'weekly', priority: 0.8 },
  { url: '/budget-calculator', changefreq: 'monthly', priority: 0.7 },
  { url: '/signin', changefreq: 'monthly', priority: 0.5 },
  { url: '/signup', changefreq: 'monthly', priority: 0.5 },
  // Add more routes as needed
];

const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');
const sitemapStream = new SitemapStream({ hostname: 'https://sortmyshaadi.com' });
const writeStream = createWriteStream(sitemapPath);

sitemapStream.pipe(writeStream);

links.forEach((link) => sitemapStream.write(link));
sitemapStream.end();

streamToPromise(sitemapStream)
  .then(() => console.log('Sitemap created successfully!'))
  .catch((err) => console.error('Error creating sitemap:', err));
