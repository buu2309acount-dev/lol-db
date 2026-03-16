"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ChampionDetail() {
  const { id } = useParams();
  const [champ, setChamp] = useState(null);
  const [version, setVersion] = useState("");

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
  const stats = champ.stats;

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
    ["クリティカル率", stats.crit],
    ["クリティカル率（成長）", stats.critperlevel],
    ["移動速度", stats.movespeed],
    ["攻撃射程", stats.attackrange],
  ].filter(([, value]) => value !== undefined && value !== null && value !== 0);

  return (
    <main style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <Link href="/champions" style={{ color: "#C89B3C", textDecoration: "none", fontSize: "14px" }}>
        ← チャンピオン一覧に戻る
      </Link>

      <div style={{ display: "flex", gap: "32px", marginTop: "24px", flexWrap: "wrap" }}>
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
          alt={champ.name}
          style={{ width: "160px", height: "160px", borderRadius: "12px", border: "2px solid #C89B3C" }}
        />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#C89B3C" }}>{champ.name}</h1>
          <p style={{ color: "#aaa", marginBottom: "8px" }}>{champ.title}</p>
          <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
            {champ.tags.map(t => (
              <span key={t} style={{
                background: "#1a1a2e", color: "#C89B3C",
                padding: "3px 10px", borderRadius: "999px",
                fontSize: "12px", border: "1px solid #C89B3C"
              }}>{roleJP[t] || t}</span>
            ))}
          </div>
          <p style={{ color: "#ccc", lineHeight: "1.7", fontSize: "14px" }}>{champ.blurb}</p>
        </div>
      </div>

      <h2 style={{ fontSize: "20px", fontWeight: "bold", margin: "32px 0 16px" }}>基本ステータス</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "10px" }}>
        {statList.map(([label, value]) => (
          <div key={label} style={{ background: "#1a1a2e", borderRadius: "8px", padding: "12px 14px" }}>
            <div style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>{label}</div>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#C89B3C" }}>{Math.round(value * 10) / 10}</div>
          </div>
        ))}
      </div>
    </main>
  );
}