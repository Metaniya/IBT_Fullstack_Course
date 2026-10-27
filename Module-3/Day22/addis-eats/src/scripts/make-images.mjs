import sharp from "sharp";
import { mkdirSync, statSync } from "node:fs";

const mode = process.argv[2] === "small" ? "small" : "big";

// Same aspect ratios in both modes: dishes 4:3, hero 32:14.
const SIZES = {
  big: { dish: [2400, 1800], hero: [3600, 1575], noise: 70, quality: 92 },
  small: { dish: [800, 600], hero: [1600, 700], noise: 14, quality: 72 },
};
const { dish, hero, noise, quality } = SIZES[mode];

const COLORS = {
  kitfo: [168, 50, 50], "doro-wat": [190, 90, 40], tibs: [150, 70, 40],
  shiro: [200, 150, 50], firfir: [170, 110, 60], gomen: [60, 130, 70],
  "key-wat": [160, 40, 40], "doro-tibs": [180, 100, 50], dulet: [130, 60, 50],
  misir: [190, 80, 60],
};

const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));

async function make(file, [w, h], [r, g, b]) {
  const buf = Buffer.allocUnsafe(w * h * 3);
  let i = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const shade = 0.7 + 0.3 * (x / w);
      const n = () => (Math.random() - 0.5) * noise;
      buf[i++] = clamp(r * shade + n());
      buf[i++] = clamp(g * shade + n());
      buf[i++] = clamp(b * shade + n());
    }
  }
  await sharp(buf, { raw: { width: w, height: h, channels: 3 } })
    .jpeg({ quality })
    .toFile(file);
  console.log(file, Math.round(statSync(file).size / 1024), "kB");
}

mkdirSync("public/dishes", { recursive: true });
for (const [id, color] of Object.entries(COLORS)) {
  await make(`public/dishes/${id}.jpg`, dish, color);
}
await make("public/hero.jpg", hero, [120, 80, 40]);