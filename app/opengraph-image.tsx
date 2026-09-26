import { ImageResponse } from "next/og";

export const alt = "Sharon and Justin Wedding Invitation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#fbf8f0",
          color: "#142b4b",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: 32,
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            border: "3px solid #d5b36b",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div style={{ color: "#ad7c2d", fontSize: 26, letterSpacing: 8, textTransform: "uppercase" }}>
            Wedding Invitation
          </div>
          <div style={{ display: "flex", fontFamily: "Georgia, serif", fontSize: 82, marginTop: 30 }}>
            Sharon <span style={{ color: "#ad7c2d", margin: "0 22px" }}>&amp;</span> Justin
          </div>
          <div style={{ color: "#203b5e", fontFamily: "Georgia, serif", fontSize: 28, fontStyle: "italic", marginTop: 24 }}>
            By God&apos;s Grace, If God Willing
          </div>
        </div>
      </div>
    ),
    size
  );
}