"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const staticPosts = {
  "patch-15-5": {
    title: "パッチ15.5 変更点まとめ",
    date: "2026年3月16日",
    content: `パッチ15.5では多くのチャンピオンに調整が入りました。今回は主要な変更点をまとめます。

## バフされたチャンピオン

ジャックス：基本攻撃力が60から64に増加。序盤の強さが増し、ソロレーンでの存在感が高まりました。

ラックス：Eスキルのクールダウンが短縮。より積極的なポークが可能になりました。

## ナーフされたチャンピオン

ケイン：Rスキルのダメージが10%減少。高すぎたキャリー性能が調整されました。

ゼリ：移動速度が少し低下。機動力が高すぎた点が修正されました。

## まとめ

今パッチはファイター系チャンピオンが強化される傾向にあります。ジャックスやレネクトンなどのソロレーナーが活躍しやすい環境です。`,
  },
  "tier-list-15-5": {
    title: "パッチ15.5 ティアリスト【ソロキュー向け】",
    date: "2026年3月16日",
    content: `パッチ15.5のソロキュー向けティアリストをご紹介します。

## トップレーン
Sティア：ジャックス、レネクトン、ダリウス
Aティア：フィオラ、カミール、ガレン

## ジャングル
Sティア：ヴァイ、ヘカリム、グレイブス
Aティア：ニダリー、エコー、リー・シン

## ミッドレーン
Sティア：アニー、ベイガー、ラックス
Aティア：ゾーイ、シンドラ、ヴィクター

## ボットレーン
Sティア：ジン、ケイトリン、ミス・フォーチュン
Aティア：ジジ、カイサ、アッシュ

## サポート
Sティア：ナミ、ルル、ソラカ
Aティア：レオナ、タリック、ブラウム

## まとめ
今環境はコントロール系メイジとファイターが強い傾向です。初心者にはガレンやアニーなど扱いやすいチャンピオンをおすすめします。`,
  },
  "beginner-champions": {
    title: "初心者におすすめのチャンピオン10選",
    date: "2026年3月16日",
    content: `LoLを始めたばかりの方に向けて、扱いやすいチャンピオンを10体紹介します。

## 1. ガレン（トップ）
シンプルなスキル構成で、HPが高く死ににくいです。タンクとして活躍でき、初心者でも貢献しやすいチャンピオンです。

## 2. アッシュ（ボット）
マークスマンの基本を学ぶのに最適です。Rスキルのスタンが使いやすく、集団戦での貢献度が高いです。

## 3. アニー（ミッド）
スキルがシンプルで覚えやすいです。ティバーズの召喚タイミングを覚えれば初心者でも活躍できます。

## 4. ナミ（サポート）
回復とCCを兼ね備えたサポートです。味方を助けながらLoLの基本を学べます。

## 5. ヴァイ（ジャングル）
ジャングルの基本ルートを学びやすいチャンピオンです。Rスキルで確実にターゲットを追いかけられます。

## まとめ
まずは1〜2体に絞って練習するのがおすすめです。基本操作に慣れたら少しずつ難しいチャンピオンに挑戦してみましょう！`,
  },
};

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(staticPosts[id] || null);

  useEffect(() => {
    if (!staticPosts[id]) {
      fetch("/api/posts")
        .then(res => res.json())
        .then(data => {
          const found = data.find(p => p.id === id);
          if (found) setPost(found);
        })
        .catch(() => {});
    }
  }, [id]);

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
        <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>{post.date}</div>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#C89B3C", marginBottom: "24px" }}>{post.title}</h1>
        <div style={{ color: "#ccc", lineHeight: "2", fontSize: "15px", whiteSpace: "pre-line" }}>
          {post.content}
        </div>
      </div>
    </main>
  );
}