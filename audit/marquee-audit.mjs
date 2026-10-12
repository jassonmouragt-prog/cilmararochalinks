import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const screenshots = join(root, "screenshots");
await mkdir(screenshots, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const test of [
    { name: "marquee-mobile-375", width: 375, height: 812, reducedMotion: "no-preference" },
    { name: "marquee-mobile-390", width: 390, height: 844, reducedMotion: "no-preference" },
    { name: "marquee-desktop-1440", width: 1440, height: 900, reducedMotion: "no-preference" },
    { name: "marquee-reduced-390", width: 390, height: 844, reducedMotion: "reduce" },
  ]) {
    const context = await browser.newContext({
      viewport: { width: test.width, height: test.height },
      deviceScaleFactor: 1,
      reducedMotion: test.reducedMotion,
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.locator(".marquee").scrollIntoViewIfNeeded();
    await page.evaluate(async () => {
      await Promise.all([...document.images].map((image) => image.decode().catch(() => undefined)));
    });
    await page.waitForTimeout(900);
    const data = await page.evaluate(() => {
      const marquee = document.querySelector(".marquee");
      const track = document.querySelector(".marquee-track");
      const copies = [...document.querySelectorAll(".marquee-sequence")];
      const box = marquee.getBoundingClientRect();
      return {
        viewportWidth: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        marquee: { x: box.x, y: box.y, width: box.width, height: box.height },
        heroBottom: document.querySelector(".hero").getBoundingClientRect().bottom,
        cardsTop: document.querySelector(".links-section").getBoundingClientRect().top,
        copyWidths: copies.map((copy) => copy.getBoundingClientRect().width),
        copiesMatch: copies[0]?.textContent === copies[1]?.textContent,
        trackGap: getComputedStyle(track).columnGap,
        trackWidth: track.getBoundingClientRect().width,
        animationName: getComputedStyle(track).animationName,
        animationDuration: getComputedStyle(track).animationDuration,
        hiddenCopies: copies.every((copy) => copy.getAttribute("aria-hidden") === "true"),
        spokenText: marquee.querySelector(".sr-only")?.textContent,
        visibleCycles: [...document.querySelectorAll(".marquee-cycle")].filter((cycle) => cycle.getClientRects().length > 0).length,
      };
    });
    const transform1 = await page.locator(".marquee-track").evaluate((element) => getComputedStyle(element).transform);
    await page.waitForTimeout(250);
    const transform2 = await page.locator(".marquee-track").evaluate((element) => getComputedStyle(element).transform);
    await page.screenshot({ path: join(screenshots, `${test.name}.png`), fullPage: true, animations: "disabled" });
    results.push({ test: test.name, status: response?.status(), errors, transformChanged: transform1 !== transform2, ...data });
    await context.close();
  }
} finally {
  await browser.close();
}
await writeFile(join(root, "marquee-report.json"), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
