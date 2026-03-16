import fs from "fs";
import path from "path";

export default function sitemap() {
    const baseUrl = "https://lol-db-beta.vercel.app";
  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/champions`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/privacy`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];

  let blogPages = [];
  try {
    const dataDir = path.join(process.cwd(), "data/posts");
    const files = fs.readdirSync(dataDir).filter(f => f.endsWith(".json"));
    blogPages = files.map(file => {
      const post = JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf-8"));
      return { url: `${baseUrl}/blog/${post.id}`, lastModified: new Date() };
    });
  } catch {
    blogPages = [
      { url: `${baseUrl}/blog/patch-15-5`, lastModified: new Date() },
      { url: `${baseUrl}/blog/tier-list-15-5`, lastModified: new Date() },
      { url: `${baseUrl}/blog/beginner-champions`, lastModified: new Date() },
    ];
  }

  return [...staticPages, ...blogPages];
}