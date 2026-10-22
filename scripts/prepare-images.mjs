// One-off: optimise the images pulled from ajcreationz.co into public/img.
// usage: node scripts/prepare-images.mjs <dir containing the downloaded originals>
import sharp from "sharp";
import { join } from "node:path";

const src = process.argv[2];
if (!src) throw new Error("pass the directory with the downloaded originals");

const jobs = [
  { in: "fresh.png", out: "ahmad-jan.webp", resize: { width: 1000 }, opts: { quality: 86, alphaQuality: 90 } },
  { in: "flayer-scaled.jpg", out: "work-call-time.webp", resize: { width: 1400 }, opts: { quality: 82 } },
  { in: "T-Shirt-1-scaled.webp", out: "work-framily-adventures.webp", resize: { width: 1400 }, opts: { quality: 82 } },
  { in: "cover-image-scaled.jpg", out: "work-social-media-creatives.webp", resize: { width: 1400 }, opts: { quality: 82 } },
  { in: "Website-03.jpg", out: "work-nayasource.webp", resize: { width: 1400 }, opts: { quality: 82 } },
];

for (const j of jobs) {
  const info = await sharp(join(src, j.in)).resize(j.resize).webp(j.opts).toFile(join("public/img", j.out));
  console.log(j.out, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)}KB`);
}
