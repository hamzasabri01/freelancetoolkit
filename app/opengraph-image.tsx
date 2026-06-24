import { ImageResponse } from "next/og";

export const alt = "Freelance Work Tools - clear calculators for independent work";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "88px",
        background: "#F7F8FA",
        color: "#0D0E14",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#2563EB",
            color: "white",
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          FT
        </div>
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>
          Freelance <span style={{ color: "#2563EB" }}>Work Tools</span>
        </div>
      </div>
      <div style={{ marginTop: 52, maxWidth: 900, fontSize: 68, lineHeight: 1.08, letterSpacing: "-2px", fontWeight: 700 }}>
        Price your work with clearer numbers.
      </div>
      <div style={{ marginTop: 28, maxWidth: 820, fontSize: 28, lineHeight: 1.45, color: "#6B7280" }}>
        Free calculators and practical guides for freelancers, contractors, and independent professionals.
      </div>
    </div>,
    size,
  );
}
