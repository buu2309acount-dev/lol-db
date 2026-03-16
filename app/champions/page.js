"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Champions() {
  const [champions, setChampions] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [version, setVersion] = useState("");

  useEffect(() => {
    async function load() {
      const vRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
      const versions = await vRes.json();
      const v = versions[0];
      setVersion(v);
      const cRes = await fetch(`https://ddragon.leagueoflegends.com/cdn/${v}/data/ja_JP/champion.json`);
      const data = await cRes.json();
      setChampions(Object.values(data.data));
    }
    load();
  }, []);

  const roles = ["Assassin", "Fighter", "Mage", "Marksman", "Support", "Tank"];
  const roleJP = { Assassin:"アサシン", Fighter:"ファイター", Mage:"メイジ", Marksman:"マークスマン", Support:"サポート", Tank:"タンク" };

  const filtered = champions.filter(c => {
    const matchName = c.name.includes(search) || c.id.toLowerCase().includes(search.toLowerCase());
    const matchRole = !role || c.tags.includes(role);
    return matchName && matchRole;
  });

  return (
    <main style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "4px" }}>チャンピオン一覧</h1>
      <p style={{ color: "#888", marginBottom: "24px" }}>Patch {version} · {filtered.length}体</p>

      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        <input
          placeholder="チャンピオン名で検索..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: "8px 14px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px", minWidth: "200px" }}
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          style={{ padding: "8px 14px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px", color: "#1a1a2e", background: "#fff" }}
          >
          <option value="">全ロール</option>
          {roles.map(r => <option key={r} value={r}>{roleJP[r]}</option>)}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "12px" }}>
        {filtered.map(c => (
          <Link key={c.id} href={`/champions/${c.id}`} style={{ textDecoration: "none" }}>
            <div style={{
              background: "#1a1a2e",
              borderRadius: "10px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${c.image.full}`}
                alt={c.name}
                style={{ width: "100%", display: "block" }}
              />
              <div style={{ padding: "8px 10px" }}>
                <div style={{ fontSize: "13px", fontWeight: "bold", color: "#C89B3C", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</div>
                <div style={{ fontSize: "11px", color: "#aaa", marginTop: "4px" }}>
                  {c.tags.map(t => roleJP[t] || t).join(" / ")}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}