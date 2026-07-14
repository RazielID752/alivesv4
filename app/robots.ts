import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    host: "https://marcosuxdesign.com",
    rules: {
      allow: "/",
      userAgent: "*",
    },
    sitemap: "https://marcosuxdesign.com/sitemap.xml",
  };
}
