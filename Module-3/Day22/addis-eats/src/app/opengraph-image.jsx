import { ImageResponse } from "next/og";

export const alt = "Addis Eats: Ethiopian food, delivered";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#7c2d12",
          color: "white",
        }}
      >
        <div style={{ fontSize: 110, fontWeight: 700, display: "flex" }}>Addis Eats</div>
        <div style={{ fontSize: 44, marginTop: 20, display: "flex" }}>
          Ethiopian food, delivered
        </div>
      </div>
    ),
    { ...size }
  );
}