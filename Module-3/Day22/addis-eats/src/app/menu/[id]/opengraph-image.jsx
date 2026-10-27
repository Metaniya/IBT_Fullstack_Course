import { ImageResponse } from "next/og";
import { getDish } from "../dishes";

export const alt = "Addis Eats dish";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#7c2d12",
          color: "white",
        }}
      >
        <div style={{ fontSize: 40, display: "flex", opacity: 0.8 }}>Addis Eats</div>
        <div style={{ fontSize: 120, fontWeight: 700, marginTop: 20, display: "flex" }}>
          {dish ? dish.name : "Dish not found"}
        </div>
        {dish && (
          <div style={{ fontSize: 56, marginTop: 24, display: "flex" }}>
            {dish.price} ETB · {dish.category}
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}