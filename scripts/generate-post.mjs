import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const PATCH = "15.5";

const topics = [
  {
    id: `patch-${PATCH.replace(".", "-")}-summary`,
    title: `パッチ${PATCH} 変更点まとめ`,
    tag: "パッチノート",
    prompt: `League of Legendsのパッチ${PATCH}の変更点まとめ記事を日本語で書いてください。
以下の構成で書いてください：
- パッチの概要（2〜3文）
- バフされたチャンピオン（3〜5体、理由も含めて）
- ナーフされたチャンピオン（3〜5体、理由も含めて）
- アイテム・システム変更
- 今パッチの総評
- 600〜800文字程度
- ## で見出しを区切る`,
  },
  {
    id: `tier-list-${PATCH.replace(".", "-")}`,
    title: `パッチ${PATCH} 環境ティアリスト【ソロキュー向け】`,
    tag: "環境分析",
    prompt: `League of Legendsのパッチ${PATCH}のソロキュー向けティアリスト記事を日本語で書いてください。
以下の構成で書いてください：
- 現環境の特徴（2〜3文）
- ロール別Sティアチャンピオン（トップ・ジャングル・ミッド・ボット・サポート）
- 今パッチの注目チャンピオン3体（理由も含めて詳しく）
- 避けるべきチャンピオン
- まとめ
- 700〜900文字程度
- ## で見出しを区切る`,
  },
  {
    id: `patch-${PATCH.replace(".", "-")}-preview`,
    title: `パッチ${PATCH} 注目チャンピオン3選`,
    tag: "環境分析",
    prompt: `League of Legendsのパッチ${PATCH}で特に注目すべきチャンピオンを3体選んで日本語で解説してください。
以下の構成で書いてください：
- 選出理由の説明（2〜3文）
- 注目チャンピオン1（名前・強みポイント・おすすめレーン・立ち回りのコツ）
- 注目チャンピオン2（同上）
- 注目チャンピオン3（同上）
- まとめ
- 700〜900文字程度
- ## で見出しを区切る`,
  },
];

async function generatePost(topic) {
  console.log(`\n生成中: ${topic.title}`);

  const message = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 1024,
    messages: [{ role: "user", content: topic.prompt }],
  });

  return message.content[0].text;
}

async function verifyAccuracy(topic, content, round) {
  console.log(`内容確認中（${round}回目）: ${topic.title}`);

  const message = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 1024,
    messages: [{
      role: "user",
      content: `以下のLoL攻略記事の内容が正確か確認してください。

確認ポイント：
1. LoLのゲームルールや仕様が正しいか
2. チャンピオン・アイテムの説明が正確か
3. 攻略情報として役立つ内容か

問題があれば修正して返してください。問題がなければそのまま返してください。
記事の本文のみを返してください。

テーマ：${topic.title}
記事：
${content}`,
    }],
  });

  return message.content[0].text;
}

async function verifyJapanese(topic, content, round) {
  console.log(`日本語確認中（${round}回目）: ${topic.title}`);

  const message = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 1024,
    messages: [{
      role: "user",
      content: `以下のブログ記事の日本語を確認してください。

確認ポイント：
1. 日本語として自然で読みやすいか
2. 文法や表現がおかしくないか

問題があれば修正して返してください。問題がなければそのまま返してください。
記事の本文のみを返してください。

記事：
${content}`,
    }],
  });

  return message.content[0].text;
}

async function main() {
  const dataDir = "data/posts";
  fs.mkdirSync(dataDir, { recursive: true });

  const date = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  for (const topic of topics) {
    const filePath = path.join(dataDir, `${topic.id}.json`);

    if (fs.existsSync(filePath)) {
      console.log(`スキップ（既存）: ${topic.title}`);
      continue;
    }

    let content = await generatePost(topic);

    content = await verifyAccuracy(topic, content, 1);
    content = await verifyJapanese(topic, content, 1);
    content = await verifyAccuracy(topic, content, 2);
    content = await verifyJapanese(topic, content, 2);

    const post = {
      id: topic.id,
      title: topic.title,
      tag: topic.tag,
      date,
      description: topic.title,
      content,
    };

    fs.writeFileSync(filePath, JSON.stringify(post, null, 2), "utf-8");
    console.log(`保存完了: ${topic.title}`);
  }

  console.log(`\n全記事生成完了！`);
}

main();