export default function Contact() {
  return (
    <main style={{ padding: "40px 20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>
        お問い合わせ
      </h1>
      <p style={{ color: "#888", marginBottom: "32px", fontSize: "14px" }}>
        ご質問・ご意見はGoogleフォームよりお送りください。
      </p>
      <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "32px", textAlign: "center" }}>
        <p style={{ color: "#ccc", marginBottom: "24px", lineHeight: "1.8" }}>
          バグの報告・データの誤り・その他お問い合わせは以下のフォームからお気軽にどうぞ。
        </p>
        <button
          onClick={() => window.open("https://forms.gle/tB7qFxBx6kKwe7oA6")}
          style={{ background: "#C89B3C", color: "#fff", padding: "12px 32px", borderRadius: "8px", border: "none", fontWeight: "bold", fontSize: "15px", cursor: "pointer" }}
        >
          お問い合わせフォームへ
        </button>
      </div>
    </main>
  );
}