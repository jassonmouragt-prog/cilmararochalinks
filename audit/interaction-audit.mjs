import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const auditDir = dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({ headless: true });
const report = {};
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "no-preference" });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    window.__motionChanges = [];
    new MutationObserver((records) => {
      for (const record of records) {
        if (record.target instanceof HTMLElement && record.target.matches("main > div") && record.attributeName === "style") {
          window.__motionChanges.push({ time: performance.now(), style: record.target.getAttribute("style") });
        }
      }
    }).observe(document, { subtree: true, attributes: true, attributeFilter: ["style"] });
  });
  await page.goto("http://127.0.0.1:3000", { waitUntil: "domcontentloaded" });
  report.motionStart = await page.locator("main > div").first().evaluate((element) => ({ opacity: getComputedStyle(element).opacity, transform: getComputedStyle(element).transform }));
  await page.waitForTimeout(1100);
  report.motionEnd = await page.locator("main > div").first().evaluate((element) => ({ opacity: getComputedStyle(element).opacity, transform: getComputedStyle(element).transform }));
  report.motionChanges = await page.evaluate(() => window.__motionChanges.slice(0, 5));
  await page.locator(".link-card").first().hover();
  await page.waitForTimeout(420);
  report.cardHover = await page.locator(".link-card").first().evaluate((element) => ({ transform: getComputedStyle(element).transform, transition: getComputedStyle(element).transitionDuration }));
  report.links = await page.evaluate(() => {
    const links = [...document.querySelectorAll("a")];
    return {
      count: links.length,
      unsafe: links.filter((link) => !/^(https:\/\/|mailto:|tel:|#[\w-]+|\/[\w\-/]*)/i.test(link.getAttribute("href") || "")).map((link) => link.getAttribute("href")),
      missingAnchors: links.filter((link) => link.hash && link.getAttribute("href")?.startsWith("#") && !document.getElementById(link.hash.slice(1))).map((link) => link.hash),
      blankWithoutRel: links.filter((link) => link.target === "_blank" && (!link.rel.includes("noopener") || !link.rel.includes("noreferrer"))).map((link) => link.href),
      iconWithoutLabel: links.filter((link) => !link.textContent?.trim() && !link.getAttribute("aria-label")).map((link) => link.outerHTML.slice(0, 160)),
    };
  });
  await page.locator('a.link-card[href="#servicos"]').click();
  report.serviceNavigation = new URL(page.url()).hash;
  await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  report.keyboardFocus = await page.evaluate(() => ({ tag: document.activeElement?.tagName, label: document.activeElement?.getAttribute("aria-label"), outline: getComputedStyle(document.activeElement).outlineWidth }));
  report.errors = errors;
  await context.close();

  const reducedContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
  report.reducedMotion = await reducedPage.locator("main > div").first().evaluate((element) => ({ opacity: getComputedStyle(element).opacity, transform: getComputedStyle(element).transform }));
  await reducedContext.close();

  const noJsContext = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto("http://127.0.0.1:3000", { waitUntil: "load" });
  report.noJavaScript = await noJsPage.evaluate(() => ({ heroVisible: Boolean(document.querySelector(".hero")?.getBoundingClientRect().height), cardCount: document.querySelectorAll(".link-card").length }));
  await noJsContext.close();
} finally {
  await browser.close();
}

await writeFile(join(auditDir, "interaction-report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (report.errors?.length || report.links?.unsafe?.length || report.links?.missingAnchors?.length || report.links?.blankWithoutRel?.length || report.links?.iconWithoutLabel?.length || report.serviceNavigation !== "#servicos" || report.motionEnd?.opacity !== "1" || !report.motionChanges?.length || report.cardHover?.transform === "none" || report.reducedMotion?.opacity !== "1" || !report.noJavaScript?.heroVisible || report.noJavaScript?.cardCount !== 4) process.exitCode = 1;
