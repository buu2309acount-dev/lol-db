"use client";
import Link from "next/link";
const posts = [
  {
    id: "patch-15-5",
    title: "パッチ15.5 変更点まとめ",
    date: "2026年3月16日",
    description: "今パッチの主要な変更点をチャンピオンごとにまとめました。",
  },
  {
    id: "tier-list-15-5",
    title: "パッチ15.5 ティアリスト【ソロキュー向け】",
    date: "2026年3月16日",
    description: "現環境でソロキューにおすすめのチャンピオンをロール別に紹介します。",
  },
  {
    id: "beginner-champions",
    title: "初心者におすすめのチャンピオン10選",
    date: "2026年3月16日",
    description: "LoLを始めたばかりの方に向けて、扱いやすいチャンピオンを紹介します。",
  },
];

export default function Blog() {
  return (
    <main style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>ブログ</h1>
      <p style={{ color: "#888", marginBottom: "32px", fontSize: "14px" }}>パッチ情報・攻略記事</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {posts.map(post => (
          <Link key={post.id} href={`/blog/${post.id}`} style={{ textDecoration: "none" }}>
            <div style={{
              background: "#1a1a2e",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid transparent",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#C89B3C"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
            >
              <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>{post.date}</div>
              <div style={{ fontSize: "18px", fontWeight: "bold", color: "#C89B3C", marginBottom: "8px" }}>{post.title}</div>
              <div style={{ fontSize: "14px", color: "#ccc" }}>{post.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}