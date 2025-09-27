// Get the domain from environment or default
function getDomain(request?: Request): string {
  if (request) {
    const url = new URL(request.url);
    return url.origin;
  }
  
  // Fallback for build time or when request is not available
  return process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com' // Replace with your actual domain
    : 'http://localhost:5173';
}

export function generateRobotsTxt(baseUrl?: string, request?: Request): string {
  const domain = baseUrl || getDomain(request);
  
  return `User-agent: *
Allow: /
Allow: /auth/login
Allow: /auth/register
Disallow: /auth/reset
Disallow: /dashboard
Disallow: /admin
Disallow: /api

# Sitemap
Sitemap: ${domain}/sitemap.xml

# Crawl-delay for politeness
Crawl-delay: 1`;
}

export function generateSitemap(baseUrl?: string, request?: Request): string {
  const domain = baseUrl || getDomain(request);
  const lastmod = new Date().toISOString();
  
  const urls = [
    {
      loc: `${domain}/`,
      lastmod,
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      loc: `${domain}/auth/login`,
      lastmod,
      changefreq: 'monthly', 
      priority: '0.8'
    },
    {
      loc: `${domain}/auth/register`,
      lastmod,
      changefreq: 'monthly',
      priority: '0.8'
    }
  ];

  const urlElements = urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlElements}
</urlset>`;
}