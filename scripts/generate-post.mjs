import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const topics = [
  "LoLのトップレーンで勝つための立ち回り方",
  "LoLのミッドレーン最強チャンピオン5選",
  "LoLのランク戦で勝率を上げる10のコツ",
  "LoLのアイテムビルドの基本的な考え方",
  "LoLのチャンピオン別おすすめルーン解説",
];

async function generatePost(topic) {
  console.log(`\n生成中: ${topic}`);

  const message = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `League of Legendsの攻略ブログ記事を日本語で書いてください。
テーマ：${topic}

以下の形式で書いてください：
- 読みやすい見出しと本文
- 初心者向けにわかりやすく
- 600〜800文字程度
- ## で見出しを区切る`,
      },
    ],
  });

  return message.content[0].text;
}

async function verifyJapanese(topic, content, round) {
  console.log(`日本語確認中（${round}回目）: ${topic}`);

  const message = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `以下のブログ記事の日本語を確認してください。

確認ポイント：
1. 日本語として自然で読みやすいか
2. 文法や表現がおかしくないか
3. 読者に伝わりやすいか

問題があれば修正した記事を返してください。問題がなければそのまま返してください。
記事の本文のみを返してください。

記事：
${content}`,
      },
    ],
  });

  return message.content[0].text;
}

async function verifyAccuracy(topic, content, round) {
  console.log(`内容の正確さ確認中（${round}回目）: ${topic}`);

  const message = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `以下のLoL攻略ブログ記事の内容が正確かどうか確認してください。

確認ポイント：
1. LoLのゲームルールや仕様が正しいか
2. チャンピオン・アイテム・スキルの説明が正確か
3. 攻略情報として実際に役立つ内容か
4. 誤った情報や古い情報が含まれていないか

問題があれば修正した記事を返してください。問題がなければそのまま返してください。
記事の本文のみを返してください。

テーマ：${topic}
記事：
${content}`,
      },
    ],
  });

  return message.content[0].text;
}

async function main() {
  const dataDir = "data/posts";
  fs.mkdirSync(dataDir, { recursive: true });

  for (const topic of topics) {
    const id = `post-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const date = new Date().toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let content = await generatePost(topic);

    content = await verifyAccuracy(topic, content, 1);
    content = await verifyAccuracy(topic, content, 2);

    content = await verifyJapanese(topic, content, 1);

    const post = { id, title: topic, date, content };
    const filePath = path.join(dataDir, `${id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(post, null, 2), "utf-8");

    console.log(`保存完了: ${filePath}`);
  }

  console.log(`\n全記事生成完了！`);
}

main();