import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), "data/posts");
    if (!fs.existsSync(dataDir)) return Response.json([]);

    const files = fs.readdirSync(dataDir).filter(f => f.endsWith(".json"));
    const posts = files.map(file => {
      const content = fs.readFileSync(path.join(dataDir, file), "utf-8");
      return JSON.parse(content);
    });

    posts.sort((a, b) => b.id.localeCompare(a.id));
    return Response.json(posts);
  } catch {
    return Response.json([]);
  }
}