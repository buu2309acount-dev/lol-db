import "./globals.css";

export const metadata = {
  title: "LoL攻略ブログ | パッチノート・環境分析",
  description: "League of Legendsのパッチノート・環境分析・攻略情報を毎パッチ更新します。",
  openGraph: {
    title: "LoL攻略ブログ | パッチノート・環境分析",
    description: "League of Legendsのパッチノート・環境分析・攻略情報を毎パッチ更新します。",
    url: "https://lol-db-beta.vercel.app",
    siteName: "LoL攻略ブログ",
    images: [
      {
        url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg",
        width: 1215,
        height: 717,
        alt: "LoL攻略ブログ",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="google-site-verification" content="7iA-AZv2S9THduSYS0iUy7DupUvXVC25-Y5OOT-dgI0" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1353351214697338"
          crossOrigin="anonymous"
        />
      </head>
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
            LoL攻略ブログ
          </a>
          <a href="/champions" style={{ color: "#ccc", fontSize: "14px", textDecoration: "none" }}>チャンピオンDB</a>
          <a href="/blog" style={{ color: "#ccc", fontSize: "14px", textDecoration: "none" }}>ブログ</a>
          <a href="/privacy" style={{ color: "#ccc", fontSize: "14px", textDecoration: "none" }}>プライバシーポリシー</a>
          <a href="/contact" style={{ color: "#ccc", fontSize: "14px", textDecoration: "none" }}>お問い合わせ</a>
        </nav>
        {children}
      </body>
    </html>
  );
}