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

export default function Blog() {
  const [generatedPosts, setGeneratedPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => setGeneratedPosts(data.map(p => ({ ...p, tag: p.tag || "攻略" }))))
      .catch(() => {});

    const params = new URLSearchParams(window.location.search);
    const tag = params.get("tag");
    if (tag) setSelectedTag(tag);
  }, []);

  const allPosts = [...staticPosts, ...generatedPosts];
  const filtered = selectedTag ? allPosts.filter(p => p.tag === selectedTag) : allPosts;

  return (
    <main style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>ブログ記事一覧</h1>
      <p style={{ color: "#888", marginBottom: "24px", fontSize: "14px" }}>{filtered.length}件の記事</p>

      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        <button
          onClick={() => setSelectedTag("")}
          style={{ padding: "6px 14px", borderRadius: "999px", border: "1px solid #333", background: !selectedTag ? "#C89B3C" : "#1a1a2e", color: !selectedTag ? "#000" : "#ccc", cursor: "pointer", fontSize: "13px" }}
        >
          すべて
        </button>
        {Object.entries(tagColors).map(([tag, style]) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? "" : tag)}
            style={{ padding: "6px 14px", borderRadius: "999px", border: `1px solid ${style.border}`, background: selectedTag === tag ? style.bg : "#1a1a2e", color: style.color, cursor: "pointer", fontSize: "13px" }}
          >
            {tag}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filtered.map(post => {
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
    </main>
  );
}