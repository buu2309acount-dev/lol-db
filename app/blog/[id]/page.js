import Link from "next/link";
import { getPost } from "./getData";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = getPost(id);
  if (!post) return { title: "記事が見つかりません | LoL攻略ブログ" };
  return {
    title: `${post.title} | LoL攻略ブログ`,
    description: post.content?.substring(0, 100),
    openGraph: {
      title: `${post.title} | LoL攻略ブログ`,
      description: post.content?.substring(0, 100),
      url: `https://lol-db-beta.vercel.app/blog/${id}`,
      siteName: "LoL攻略ブログ",
      images: [
        {
          url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg",
          width: 1215,
          height: 717,
          alt: post.title,
        },
      ],
      locale: "ja_JP",
      type: "article",
    },
  };
}

export default async function BlogPost({ params }) {
  const { id } = await params;
  const post = getPost(id);

  if (!post) return (
    <main style={{ padding: "40px 20px" }}>
      <p style={{ color: "#888" }}>記事が見つかりませんでした。</p>
      <Link href="/blog" style={{ color: "#C89B3C" }}>ブログ一覧に戻る</Link>
    </main>
  );

  return (
    <main style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/blog" style={{ color: "#C89B3C", textDecoration: "none", fontSize: "14px" }}>
        ← ブログ一覧に戻る
      </Link>
      <div style={{ marginTop: "24px" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "12px", color: "#888" }}>{post.date}</div>
          {post.tag && (
            <span style={{
              fontSize: "11px", padding: "2px 8px", borderRadius: "999px",
              background: post.tag === "パッチノート" ? "#1a2e1a" : post.tag === "環境分析" ? "#2e1a1a" : "#1a1a2e",
              color: post.tag === "パッチノート" ? "#4caf50" : post.tag === "環境分析" ? "#f44336" : "#C89B3C",
              border: `1px solid ${post.tag === "パッチノート" ? "#4caf50" : post.tag === "環境分析" ? "#f44336" : "#C89B3C"}`
            }}>
              {post.tag}
            </span>
          )}
        </div>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#C89B3C", marginBottom: "24px" }}>{post.title}</h1>
        <div style={{ color: "#ccc", lineHeight: "2", fontSize: "15px", whiteSpace: "pre-line" }}>
          {post.content}
        </div>
      </div>
    </main>
  );
}