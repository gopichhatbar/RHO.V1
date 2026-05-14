import type { Plugin } from "vite";
import { rummyApps } from "../src/data/rummyApps";

const SITE_URL = "https://realgameapps.com";

interface Route {
  path: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number; 
}

const staticRoutes: Route[] = [ 
  { path: "/", changefreq: "daily", priority: 1.0 }, 
  { path: "/about", changefreq: "monthly", priority: 0.6 },
  { path: "/blog", changefreq: "weekly", priority: 0.7 },
  { path: "/contact", changefreq: "monthly", priority: 0.5 },
  { path: "/privacy", changefreq: "yearly", priority: 0.3 },
]; 

const buildSitemap = (): string => { 
  const today = new Date().toISOString().split("T")[0];

  const appRoutes: Route[] = rummyApps.map((app) => ({
    path: `/${app.slug}`,
    changefreq: "weekly",
    priority: 0.8,
  }));

  const urls = [...staticRoutes, ...appRoutes]
    .map(
      (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};

const buildRobots = (): string => `User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

export function sitemapPlugin(): Plugin {
  return {
    name: "Realgameapps-sitemap",
    apply: "build",
    generateBundle() {  
      this.emitFile({ 
        type: "asset",
        fileName: "sitemap.xml",
        source: buildSitemap(),
      });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: buildRobots(),
      });
    },
  };
}
