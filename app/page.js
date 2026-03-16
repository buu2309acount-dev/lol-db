"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const staticPosts = [
  {
    id: "patch-15-5",
    title: "パッチ15.5 変更点まとめ",
    date: "2026年3月16日",
    description: "今パッチの主要な変更点をチャンピオンごとにまとめました。",
    tag: "パッチノート",
  },
  {
    id: "tier-list-15-5",
    title: "パッチ15.5 ティアリスト【ソロキュー向け】",
    date: "2026年3月16日",
    description: "現環境でソロキューにおすすめのチャンピオンをロール別に紹介します。",
    tag: "環境分析",
  },
  {
    id: "beginner-champions",
    title: "初心者におすすめのチャンピオン10選",
    date: "2026年3月16日",
    description: "LoLを始めたばかりの方に向けて、扱いやすいチャンピオンを紹介します。",
    tag: "攻略",
  },
];

const tagColors = {
  "パッチノート": { bg: "#1a2e1a", color: "#4caf50", border: "#4caf50" },
  "環境分析": { bg: "#2e1a1a", color: "#f44336", border: "#f44336" },
  "攻略": { bg: "#1a1a2e", color: "#C89B3C", border: "#C89B3C" },
};

export default function Home() {
  const [generatedPosts, setGeneratedPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => setGeneratedPosts(data.map(p => ({ ...p, tag: "攻略" }))))
      .catch(() => {});
  }, []);

  const allPosts = [...staticPosts, ...generatedPosts];

  return (
    <main style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#C89B3C", marginBottom: "8px" }}>
          LoL攻略ブログ
        </h1>
        <p style={{ color: "#888", fontSize: "15px" }}>
          パッチノート・環境分析・攻略情報を毎パッチ更新
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
        {/* メイン記事一覧 */}
        <div style={{ flex: 2, minWidth: "300px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", borderBottom: "1px solid #333", paddingBottom: "8px" }}>
            最新記事
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {allPosts.map(post => {
              const tagStyle = tagColors[post.tag] || tagColors["攻略"];
              return (
                <Link key={post.id} href={`/blog/${post.id}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    background: "#1a1a2e",
                    borderRadius: "12px",
                    padding: "20px",
                    border: "1px solid transparent",
                    transition: "border-color 0.15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#C89B3C"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "12px", color: "#888" }}>{post.date}</span>
                      <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "999px", background: tagStyle.bg, color: tagStyle.color, border: `1px solid ${tagStyle.border}` }}>
                        {post.tag}
                      </span>
                    </div>
                    <div style={{ fontSize: "17px", fontWeight: "bold", color: "#fff", marginBottom: "6px" }}>{post.title}</div>
                    <div style={{ fontSize: "13px", color: "#aaa" }}>{post.description || post.content?.substring(0, 80) + "..."}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* サイドバー */}
        <div style={{ flex: 1, minWidth: "200px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", borderBottom: "1px solid #333", paddingBottom: "8px" }}>
            カテゴリ
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "32px" }}>
            {Object.entries(tagColors).map(([tag, style]) => (
              <div key={tag} style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}`, padding: "8px 14px", borderRadius: "8px", fontSize: "14px" }}>
                {tag}
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", borderBottom: "1px solid #333", paddingBottom: "8px" }}>
            チャンピオンDB
          </h2>
          <Link href="/champions" style={{ textDecoration: "none" }}>
            <div style={{ background: "#1a1a2e", borderRadius: "8px", padding: "14px", color: "#C89B3C", fontSize: "14px", border: "1px solid #333" }}>
              チャンピオン一覧を見る →
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}