"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const recommendedBuilds = {
  Assassin: {
    items: ["ダークシール", "セラフのエンブレイス", "ルインドキング", "ラバドンのデスキャップ"],
    runes: ["電撃", "テイスト・オブ・ブラッド", "アイボール・コレクション", "ラヴェナス・ハンター"],
  },
  Fighter: {
    items: ["トリニティフォース", "デスダンス", "ガーゴイルストーンプレート", "ステアラック"],
    runes: ["征服者", "凱旋", "レジェンド：鉄壁", "ラスト・スタンド"],
  },
  Mage: {
    items: ["ルーデンのテンペスト", "シャドーフレイム", "ラバドンのデスキャップ", "ヴォイドスタッフ"],
    runes: ["アークコメット", "マナフローバンド", "トランスセンデンス", "スコーチ"],
  },
  Marksman: {
    items: ["クラーケンスレイヤー", "ガンブレード", "インフィニティエッジ", "モータルリマインダー"],
    runes: ["レサル・テンポ", "血の味", "アイボール・コレクション", "カットダウン"],
  },
  Support: {
    items: ["サポーターアイテム", "ソラリのスラッシュ", "リデンプション", "ミカエルのるつぼ"],
    runes: ["後ろ盾", "デモリッシュ", "コンディショニング", "オーバーグロース"],
  },
  Tank: {
    items: ["サンファイアイージス", "ソーンメイル", "ガーゴイルストーンプレート", "ウォームオグ・アーマー"],
    runes: ["グレイシャル・オーグメント", "魔法の靴", "ビスケット配達", "アプローチの速度"],
  },
};

export default function ChampionDetail() {
  const { id } = useParams();
  const [champ, setChamp] = useState(null);
  const [version, setVersion] = useState("");
  const [splashIndex, setSplashIndex] = useState(0);

  useEffect(() => {
    async function load() {
      const vRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
      const versions = await vRes.json();
      const v = versions[0];
      setVersion(v);
      const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${v}/data/ja_JP/champion/${id}.json`);
      const data = await res.json();
      setChamp(data.data[id]);
    }
    load();
  }, [id]);

  if (!champ) return <div style={{ padding: "40px", color: "#888" }}>読み込み中...</div>;

  const roleJP = { Assassin:"アサシン", Fighter:"ファイター", Mage:"メイジ", Marksman:"マークスマン", Support:"サポート", Tank:"タンク" };
  const keyJP = { Q: "Q", W: "W", E: "E", R: "R（ult）" };
  const spellKeys = ["Q", "W", "E", "R"];
  const stats = champ.stats;
  const build = recommendedBuilds[champ.tags[0]] || recommendedBuilds["Fighter"];

  const statList = [
    ["HP", stats.hp],
    ["HP（成長）", stats.hpperlevel],
    ["HP再生", stats.hpregen],
    ["HP再生（成長）", stats.hpregenperlevel],
    ["マナ", stats.mp],
    ["マナ（成長）", stats.mpperlevel],
    ["マナ再生", stats.mpregen],
    ["マナ再生（成長）", stats.mpregenperlevel],
    ["攻撃力", stats.attackdamage],
    ["攻撃力（成長）", stats.attackdamageperlevel],
    ["攻撃速度", stats.attackspeed],
    ["攻撃速度（成長）", stats.attackspeedperlevel],
    ["アーマー", stats.armor],
    ["アーマー（成長）", stats.armorperlevel],
    ["魔法抵抗力", stats.spellblock],
    ["魔法抵抗力（成長）", stats.spellblockperlevel],
    ["移動速度", stats.movespeed],
    ["攻撃射程", stats.attackrange],
  ].filter(([, value]) => value !== undefined && value !== null && value !== 0);

  const splashes = champ.skins || [];

  return (
    <main style={{ padding: "0", maxWidth: "100%", margin: "0 auto" }}>

      {/* スプラッシュアート */}
      <div style={{ position: "relative", width: "100%", height: "400px", overflow: "hidden" }}>
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${splashIndex}.jpg`}
          alt={champ.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, #0a0a1a)" }} />
        <div style={{ position: "absolute", bottom: "24px", left: "24px" }}>
          <h1 style={{ fontSize: "40px", fontWeight: "bold", color: "#C89B3C", margin: 0 }}>{champ.name}</h1>
          <p style={{ color: "#aaa", margin: "4px 0 12px" }}>{champ.title}</p>
          <div style={{ display: "flex", gap: "6px" }}>
            {champ.tags.map(t => (
              <span key={t} style={{ background: "rgba(200,155,60,0.2)", color: "#C89B3C", padding: "3px 10px", borderRadius: "999px", fontSize: "12px", border: "1px solid #C89B3C" }}>
                {roleJP[t] || t}
              </span>
            ))}
          </div>
        </div>
        {/* スキン切り替えボタン */}
        {splashes.length > 1 && (
          <div style={{ position: "absolute", bottom: "24px", right: "24px", display: "flex", gap: "6px" }}>
            {splashes.map((skin, i) => (
              <button
                key={i}
                onClick={() => setSplashIndex(skin.num)}
                style={{ width: "8px", height: "8px", borderRadius: "50%", border: "none", cursor: "pointer", background: splashIndex === skin.num ? "#C89B3C" : "#666", padding: 0 }}
              />
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: "32px 24px", maxWidth: "1000px", margin: "0 auto" }}>
        <Link href="/champions" style={{ color: "#C89B3C", textDecoration: "none", fontSize: "14px" }}>
          ← チャンピオン一覧に戻る
        </Link>

        {/* 説明文 */}
        <p style={{ color: "#ccc", lineHeight: "1.8", fontSize: "15px", margin: "24px 0 32px" }}>{champ.blurb}</p>

        {/* スキル一覧 */}
        <h2 style={{ fontSize: "20px", fontWeight: "bold", margin: "0 0 16px", color: "#C89B3C" }}>スキル</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
          {/* パッシブ */}
          <div style={{ display: "flex", gap: "16px", background: "#1a1a2e", borderRadius: "10px", padding: "16px", alignItems: "flex-start" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${champ.passive.image.full}`}
                alt={champ.passive.name}
                style={{ width: "56px", height: "56px", borderRadius: "8px", border: "2px solid #444" }}
              />
              <span style={{ position: "absolute", bottom: "-8px", left: "50%", transform: "translateX(-50%)", background: "#333", color: "#aaa", fontSize: "10px", padding: "1px 6px", borderRadius: "4px" }}>P</span>
            </div>
            <div>
              <div style={{ fontWeight: "bold", color: "#C89B3C", marginBottom: "4px" }}>{champ.passive.name}</div>
              <div style={{ fontSize: "13px", color: "#aaa", lineHeight: "1.6" }}>{champ.passive.description.replace(/<[^>]+>/g, "")}</div>
            </div>
          </div>

          {/* Q/W/E/R */}
          {champ.spells.map((spell, i) => (
            <div key={i} style={{ display: "flex", gap: "16px", background: "#1a1a2e", borderRadius: "10px", padding: "16px", alignItems: "flex-start" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`}
                  alt={spell.name}
                  style={{ width: "56px", height: "56px", borderRadius: "8px", border: "2px solid #C89B3C" }}
                />
                <span style={{ position: "absolute", bottom: "-8px", left: "50%", transform: "translateX(-50%)", background: "#C89B3C", color: "#000", fontSize: "10px", fontWeight: "bold", padding: "1px 6px", borderRadius: "4px" }}>{spellKeys[i]}</span>
              </div>
              <div>
                <div style={{ fontWeight: "bold", color: "#C89B3C", marginBottom: "4px" }}>{spell.name}</div>
                <div style={{ fontSize: "13px", color: "#aaa", lineHeight: "1.6" }}>{spell.description.replace(/<[^>]+>/g, "")}</div>
                <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                  <span style={{ fontSize: "11px", color: "#888" }}>CD: {spell.cooldownBurn}s</span>
                  <span style={{ fontSize: "11px", color: "#888" }}>コスト: {spell.costBurn}</span>
                  <span style={{ fontSize: "11px", color: "#888" }}>射程: {spell.rangeBurn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* おすすめビルド */}
        <h2 style={{ fontSize: "20px", fontWeight: "bold", margin: "0 0 16px", color: "#C89B3C" }}>おすすめビルド</h2>
        <div style={{ background: "#1a1a2e", borderRadius: "10px", padding: "20px", marginBottom: "32px" }}>
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "13px", color: "#888", marginBottom: "8px" }}>アイテム</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {build.items.map((item, i) => (
                <span key={i} style={{ background: "#0a0a1a", color: "#C89B3C", padding: "6px 12px", borderRadius: "6px", fontSize: "13px", border: "1px solid #333" }}>{item}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "13px", color: "#888", marginBottom: "8px" }}>ルーン</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {build.runes.map((rune, i) => (
                <span key={i} style={{ background: "#0a0a1a", color: "#aaa", padding: "6px 12px", borderRadius: "6px", fontSize: "13px", border: "1px solid #333" }}>{rune}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ステータス */}
        <h2 style={{ fontSize: "20px", fontWeight: "bold", margin: "0 0 16px", color: "#C89B3C" }}>基本ステータス</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "10px", marginBottom: "32px" }}>
          {statList.map(([label, value]) => (
            <div key={label} style={{ background: "#1a1a2e", borderRadius: "8px", padding: "12px 14px" }}>
              <div style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>{label}</div>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#C89B3C" }}>{Math.round(value * 10) / 10}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}