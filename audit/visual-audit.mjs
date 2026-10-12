import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const screenshots = join(root, "screenshots");
await mkdir(screenshots, { recursive: true });

const viewports = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    const response = await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((img) => img.decode().catch(() => undefined)));
    });
    const data = await page.evaluate(() => {
      const rect = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const box = element.getBoundingClientRect();
        return { x: Math.round(box.x), y: Math.round(box.y), width: Math.round(box.width), height: Math.round(box.height) };
      };
      return {
        title: document.title,
        viewportWidth: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth,
        hero: rect(".hero"),
        heroPortrait: rect(".hero-portrait-wrap"),
        heroHeading: rect(".hero h1"),
        cards: [...document.querySelectorAll(".link-card")].map((element) => {
          const box = element.getBoundingClientRect();
          return { title: element.querySelector("h3")?.textContent, width: Math.round(box.width), height: Math.round(box.height), x: Math.round(box.x) };
        }),
        bodyFont: getComputedStyle(document.body).fontFamily,
        pageColor: getComputedStyle(document.body).backgroundColor,
        heroColor: getComputedStyle(document.querySelector(".hero")).backgroundColor,
        images: [...document.images].map((img) => ({ alt: img.alt, width: img.naturalWidth, height: img.naturalHeight, complete: img.complete })),
        smallTargets: [...document.querySelectorAll("a")].map((link) => {
          const box = link.getBoundingClientRect();
          return { label: link.getAttribute("aria-label") || link.textContent?.trim().slice(0, 60), width: Math.round(box.width), height: Math.round(box.height), href: link.getAttribute("href") };
        }).filter((link) => link.width < 44 || link.height < 44),
        unsafeBlankLinks: [...document.querySelectorAll('a[target="_blank"]')].filter((link) => !link.rel.includes("noopener") || !link.rel.includes("noreferrer")).map((link) => link.href),
        missingAlt: [...document.querySelectorAll("img:not([alt])")].length,
        headingSequence: [...document.querySelectorAll("h1,h2,h3")].map((heading) => `${heading.tagName}:${heading.textContent?.trim()}`),
      };
    });
    await page.screenshot({ path: join(screenshots, `${viewport.name}.png`), fullPage: true, animations: "disabled" });
    results.push({ viewport, status: response?.status(), errors, ...data });
    await context.close();
  }
} finally {
  await browser.close();
}
await writeFile(join(root, "visual-report.json"), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results.map(({ viewport, status, scrollWidth, viewportWidth, errors, smallTargets }) => ({ viewport: viewport.name, status, overflow: scrollWidth > viewportWidth, errors, smallTargets })), null, 2));
