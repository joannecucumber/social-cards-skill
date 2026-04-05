#!/usr/bin/env bun
/**
 * Social Cards Renderer
 * Takes a markdown file/string, opens index.html in headless Chrome,
 * injects the markdown, and screenshots each slide as PNG.
 *
 * Usage:
 *   bun social-cards/render.ts input.md [output-dir]
 *   echo "markdown" | bun social-cards/render.ts - [output-dir]
 */

import puppeteer from "puppeteer";
import { readFileSync, mkdirSync, existsSync } from "fs";
import { resolve, join } from "path";

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error("Usage: bun render.ts <input.md | -> [output-dir]");
  process.exit(1);
}

// Read markdown input
let markdown: string;
const inputArg = args[0];

if (inputArg === "-") {
  // Read from stdin
  markdown = await Bun.stdin.text();
} else {
  const inputPath = resolve(inputArg);
  if (!existsSync(inputPath)) {
    console.error(`File not found: ${inputPath}`);
    process.exit(1);
  }
  markdown = readFileSync(inputPath, "utf-8");
}

// Output directory
const outputDir = resolve(args[1] || "social-cards/output");
mkdirSync(outputDir, { recursive: true });

// Path to index.html
const htmlPath = resolve(import.meta.dir, "index.html");
const htmlUrl = `file://${htmlPath}`;

console.log("Launching browser...");
const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const page = await browser.newPage();
await page.goto(htmlUrl, { waitUntil: "domcontentloaded" });

// Inject markdown and trigger render
await page.evaluate((md: string) => {
  const textarea = document.getElementById("mdInput") as HTMLTextAreaElement;
  textarea.value = md;
  (window as any).generate();
}, markdown);

// Wait for render
await page.waitForSelector("#renderContainer .slide");
await new Promise((r) => setTimeout(r, 500));

// Get slide dimensions and count
const slideInfo = await page.evaluate(() => {
  const container = document.getElementById("renderContainer")!;
  const slides = container.querySelectorAll(".slide");
  const first = slides[0] as HTMLElement;
  return {
    count: slides.length,
    width: first.offsetWidth,
    height: first.offsetHeight,
  };
});

console.log(
  `Found ${slideInfo.count} slides (${slideInfo.width}x${slideInfo.height})`
);

// Screenshot each slide
const outputFiles: string[] = [];

for (let i = 0; i < slideInfo.count; i++) {
  const filename = `slide-${String(i + 1).padStart(2, "0")}.png`;
  const filepath = join(outputDir, filename);

  // Get the bounding box of each slide in the render container
  const box = await page.evaluate((index: number) => {
    const container = document.getElementById("renderContainer")!;
    const slide = container.querySelectorAll(".slide")[index] as HTMLElement;
    const rect = slide.getBoundingClientRect();
    return {
      x: rect.x,
      y: rect.y,
      width: slide.offsetWidth,
      height: slide.offsetHeight,
    };
  }, i);

  // Isolate current slide: hide everything else, position slide at 0,0
  await page.evaluate((index: number) => {
    // Hide all page UI
    document.querySelectorAll('.toolbar, .app, .loading-overlay, .brand-panel').forEach((el) => {
      (el as HTMLElement).style.display = 'none';
    });
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';

    const container = document.getElementById("renderContainer")!;
    container.style.position = "static";
    container.style.left = "0";
    container.style.top = "0";

    const slides = container.querySelectorAll(".slide") as NodeListOf<HTMLElement>;
    slides.forEach((s, j) => {
      if (j === index) {
        s.style.position = "relative";
        s.style.left = "0";
        s.style.top = "0";
        s.style.display = "flex";
      } else {
        s.style.display = "none";
      }
    });
  }, i);

  await page.setViewport({
    width: slideInfo.width,
    height: slideInfo.height,
    deviceScaleFactor: 2,
  });

  // Wait for images to load if any
  await page.evaluate(() => {
    const images = document.querySelectorAll("img");
    return Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) resolve(true);
            else {
              img.onload = () => resolve(true);
              img.onerror = () => resolve(false);
            }
          })
      )
    );
  });

  await new Promise((r) => setTimeout(r, 200));

  // Screenshot just the slide element
  const slideEl = await page.$('#renderContainer .slide[style*="display: flex"]');
  if (slideEl) {
    await slideEl.screenshot({ path: filepath });
  }

  outputFiles.push(filepath);
  console.log(`  Saved: ${filename}`);
}

await browser.close();

console.log(`\nDone! ${outputFiles.length} slides saved to ${outputDir}/`);
outputFiles.forEach((f) => console.log(`  ${f}`));
