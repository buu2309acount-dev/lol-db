import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "8px" }}>
        LoL Champion DB
      </h1>
      <p style={{ color: "#888", marginBottom: "32px" }}>
        League of Legends チャンピオンデータベース
      </p>
      <Link href="/champions" style={{
        background: "#C89B3C",
        color: "#fff",
        padding: "12px 24px",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "bold"
      }}>
        チャンピオン一覧を見る →
      </Link>
    </main>
  );
}
