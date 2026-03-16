export default function Privacy() {
  return (
    <main style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>プライバシーポリシー</h1>
      <p style={{ color: "#888", marginBottom: "32px", fontSize: "14px" }}>最終更新日：2026年3月</p>

      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>1. 基本方針</h2>
        <p style={{ lineHeight: "1.8", color: "#ccc" }}>
          当サイト（LoL Champion DB）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。
        </p>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>2. 広告について</h2>
        <p style={{ lineHeight: "1.8", color: "#ccc" }}>
          当サイトはGoogle AdSenseを利用しており、Googleがユーザーのブラウザに広告を配信する場合があります。
          GoogleはCookieを使用してユーザーの過去のアクセス情報に基づいた広告を表示することがあります。
          広告のCookieを無効にする場合は<a href="https://www.google.com/settings/ads" style={{ color: "#C89B3C" }}>Googleの広告設定ページ</a>をご覧ください。
        </p>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>3. アクセス解析について</h2>
        <p style={{ lineHeight: "1.8", color: "#ccc" }}>
          当サイトはGoogle Analyticsを利用してアクセス情報を収集することがあります。
          収集されたデータは匿名で処理され、個人を特定するものではありません。
        </p>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>4. 免責事項</h2>
        <p style={{ lineHeight: "1.8", color: "#ccc" }}>
          当サイトのコンテンツは可能な限り正確な情報を提供するよう努めていますが、
          情報の正確性・完全性を保証するものではありません。
          当サイトはRiot Gamesが提供するAPIを利用していますが、Riot Gamesとは無関係の非公式サイトです。
        </p>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>5. お問い合わせ</h2>
        <p style={{ lineHeight: "1.8", color: "#ccc" }}>
          プライバシーポリシーに関するお問い合わせは、お問い合わせページよりご連絡ください。
        </p>
      </section>
    </main>
  );
}