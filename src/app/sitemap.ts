import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";
import { getAllWorkSlugs } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries = getAllSlugs().map((slug) => ({
    url: `https://originstudios.dev/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const workEntries = getAllWorkSlugs().map((slug) => ({
    url: `https://originstudios.dev/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://originstudios.dev",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://originstudios.dev/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogEntries,
    {
      url: "https://originstudios.dev/work",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...workEntries,
    {
      url: "https://originstudios.dev/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://originstudios.dev/terms",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
