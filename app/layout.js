import "./globals.css";

export const metadata = {
  title: "LoL Champion DB",
  description: "League of Legends チャンピオンデータベース",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body style={{ background: "#0a0a1a", color: "#fff", margin: 0, fontFamily: "sans-serif" }}>
        <nav style={{
          background: "#1a1a2e",
          borderBottom: "1px solid #C89B3C",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          gap: "24px",
          height: "56px"
        }}>
          <a href="/" style={{ color: "#C89B3C", fontWeight: "bold", fontSize: "18px", textDecoration: "none" }}>
            LoL DB
          </a>
          <a href="/champions" style={{ color: "#ccc", fontSize: "14px", textDecoration: "none" }}>チャンピオン</a>
          <a href="/privacy" style={{ color: "#ccc", fontSize: "14px", textDecoration: "none" }}>プライバシーポリシー</a>
          <a href="/contact" style={{ color: "#ccc", fontSize: "14px", textDecoration: "none" }}>お問い合わせ</a>
        </nav>
        {children}
      </body>
    </html>
  );
}