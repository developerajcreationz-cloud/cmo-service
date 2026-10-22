// Generates neutral SVG placeholders in public/img. Swap them for real
// photography (same file names, or update content/site.ts) before launch.
import { writeFileSync, mkdirSync } from "node:fs";

mkdirSync("public/img", { recursive: true });
const out = (name, svg) => writeFileSync(`public/img/${name}`, svg);

const frame = (w, h, body, bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${bg ?? ""}${body}</svg>`;

const label = (w, h, text) =>
  `<text x="${w / 2}" y="${h / 2}" font-family="Helvetica,Arial,sans-serif" font-size="${Math.round(w / 22)}" font-weight="600" fill="#111" fill-opacity=".28" text-anchor="middle" dominant-baseline="middle">${text}</text>`;

// Hero / portrait cut-out silhouette (transparent background)
const person = (w, h) => `
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9a4ee"/><stop offset="1" stop-color="#7430f7"/></linearGradient></defs>
<ellipse cx="${w / 2}" cy="${h * 0.3}" rx="${w * 0.16}" ry="${w * 0.2}" fill="url(#g)" fill-opacity=".85"/>
<path d="M${w * 0.1} ${h} C${w * 0.1} ${h * 0.62}, ${w * 0.3} ${h * 0.5}, ${w / 2} ${h * 0.5} C${w * 0.7} ${h * 0.5}, ${w * 0.9} ${h * 0.62}, ${w * 0.9} ${h} Z" fill="url(#g)" fill-opacity=".85"/>`;
// The hero crops to the top ~40% of the image, so keep the head high and the shoulders close.
const heroPerson = (w, h) => `
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9a4ee"/><stop offset="1" stop-color="#7430f7"/></linearGradient></defs>
<ellipse cx="${w / 2}" cy="${h * 0.15}" rx="${w * 0.13}" ry="${w * 0.165}" fill="url(#g)" fill-opacity=".85"/>
<path d="M${w * 0.06} ${h} L${w * 0.06} ${h * 0.4} C${w * 0.06} ${h * 0.3}, ${w * 0.26} ${h * 0.27}, ${w / 2} ${h * 0.27} C${w * 0.74} ${h * 0.27}, ${w * 0.94} ${h * 0.3}, ${w * 0.94} ${h * 0.4} L${w * 0.94} ${h} Z" fill="url(#g)" fill-opacity=".85"/>`;
out("hero.svg", frame(1024, 1536, heroPerson(1024, 1536)));
out("fcmo-portrait.svg", frame(1182, 1576, person(1182, 1576)));

// Project cards 1108x984
const cardBgs = ["#ece8d1", "#e4dcf9", "#f1d9d6", "#dcebe3", "#d9dde8", "#f3ecd0"];
for (let i = 0; i < 6; i++) {
  const w = 1108, h = 984;
  out(
    `work-${i + 1}.svg`,
    frame(
      w,
      h,
      `<rect x="${w * 0.14}" y="${h * 0.2}" width="${w * 0.72}" height="${h * 0.6}" rx="28" fill="#fff" fill-opacity=".75"/>
       <rect x="${w * 0.14}" y="${h * 0.2}" width="${w * 0.72}" height="${h * 0.08}" rx="28" fill="#111" fill-opacity=".08"/>
       <rect x="${w * 0.2}" y="${h * 0.36}" width="${w * 0.34}" height="${h * 0.05}" rx="10" fill="#7430f7" fill-opacity=".55"/>
       <rect x="${w * 0.2}" y="${h * 0.46}" width="${w * 0.5}" height="${h * 0.03}" rx="8" fill="#111" fill-opacity=".14"/>
       <rect x="${w * 0.2}" y="${h * 0.52}" width="${w * 0.42}" height="${h * 0.03}" rx="8" fill="#111" fill-opacity=".14"/>
       <rect x="${w * 0.2}" y="${h * 0.62}" width="${w * 0.18}" height="${h * 0.07}" rx="14" fill="#111" fill-opacity=".8"/>`,
      `<rect width="${w}" height="${h}" fill="${cardBgs[i]}"/>`
    )
  );
}

// Case study images 1500x1002
const caseBgs = ["#d8d0f5", "#cfe4d8", "#f0e2c8", "#d3dbea"];
for (let i = 0; i < 4; i++) {
  const w = 1500, h = 1002;
  out(
    `case-${i + 1}.svg`,
    frame(
      w,
      h,
      `<circle cx="${w * 0.72}" cy="${h * 0.38}" r="${h * 0.3}" fill="#7430f7" fill-opacity=".14"/>
       <rect x="${w * 0.14}" y="${h * 0.58}" width="${w * 0.1}" height="${h * 0.22}" rx="10" fill="#7430f7" fill-opacity=".5"/>
       <rect x="${w * 0.27}" y="${h * 0.46}" width="${w * 0.1}" height="${h * 0.34}" rx="10" fill="#7430f7" fill-opacity=".62"/>
       <rect x="${w * 0.4}" y="${h * 0.32}" width="${w * 0.1}" height="${h * 0.48}" rx="10" fill="#7430f7" fill-opacity=".8"/>`,
      `<rect width="${w}" height="${h}" fill="${caseBgs[i]}"/>`
    )
  );
}

// Fractional CMO band + handshake
out(
  "fcmo-band.svg",
  frame(2000, 520, "", `<defs><linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9e0fb"/><stop offset="1" stop-color="#f6efd8"/></linearGradient></defs><rect width="2000" height="520" fill="url(#b)"/>`)
);
out(
  "fcmo-handshake.svg",
  frame(988, 846, label(988, 846, "Photo placeholder"), `<rect width="988" height="846" fill="#ece8d1"/>`)
);
console.log("placeholders written");
