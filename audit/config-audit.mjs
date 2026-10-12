import { chromium } from "playwright";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const auditDir = dirname(fileURLToPath(import.meta.url));
const projectDir = resolve(auditDir, "..");
const sitePath = join(projectDir, "src/config/site.ts");
const themePath = join(projectDir, "src/config/theme.ts");
const linksPath = join(projectDir, "src/config/links.ts");
const original = {
  site: await readFile(sitePath, "utf8"),
  theme: await readFile(themePath, "utf8"),
  links: await readFile(linksPath, "utf8"),
};
await mkdir(join(auditDir, "screenshots"), { recursive: true });

function replaceOne(source, before, after) {
  if (!source.includes(before)) throw new Error(`Expected config text not found: ${before}`);
  return source.replace(before, after);
}

const browser = await chromium.launch({ headless: true });
const results = [];
async function capture(name, expectedTheme, viewport = { width: 390, height: 844 }) {
  const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
  try {
    await page.waitForFunction((value) => document.documentElement.dataset.theme === value, expectedTheme, { timeout: 12000 });
  } catch {
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForFunction((value) => document.documentElement.dataset.theme === value, expectedTheme, { timeout: 12000 });
  }
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map((image) => image.decode().catch(() => undefined))); });
  const data = await page.evaluate(() => ({
    theme: document.documentElement.dataset.theme,
    name: document.querySelector("h1")?.textContent?.trim(),
    niche: document.querySelector(".hero-niche")?.textContent?.trim(),
    heroLayout: document.querySelector(".hero")?.className,
    portraitX: Math.round(document.querySelector(".hero-portrait-wrap")?.getBoundingClientRect().x || 0),
    contentX: Math.round(document.querySelector(".hero-content")?.getBoundingClientRect().x || 0),
    heroColor: getComputedStyle(document.querySelector(".hero")).backgroundColor,
    accentColor: getComputedStyle(document.body).getPropertyValue("--color-accent").trim(),
    portrait: document.querySelector(".hero-portrait")?.getAttribute("src"),
    button: document.querySelector(".hero-button")?.textContent?.trim(),
    firstCard: document.querySelector(".link-card h3")?.textContent?.trim(),
    firstCardHref: document.querySelector(".link-card")?.getAttribute("href"),
    contactMethods: [...document.querySelectorAll(".contact-methods a")].map((link) => ({ label: link.textContent?.trim(), href: link.getAttribute("href") })),
    overflow: document.documentElement.scrollWidth > innerWidth,
  }));
  await page.screenshot({ path: join(auditDir, "screenshots", `${name}.png`), fullPage: true, animations: "disabled" });
  if (data.theme !== expectedTheme || data.overflow || errors.length) throw new Error(`Scenario ${name} failed: ${JSON.stringify({ errors, data })}`);
  results.push({ scenario: name, errors, ...data });
  await context.close();
}

try {
  await writeFile(themePath, replaceOne(original.theme, 'activePreset: ThemePresetName = "editorial"', 'activePreset: ThemePresetName = "luxury"'));
  await capture("preset-luxury-390", "luxury");
  await capture("preset-luxury-1440", "luxury", { width: 1440, height: 900 });
  if (results.at(-1)?.portraitX <= results.at(-1)?.contentX) throw new Error("Luxury desktop portrait is not on the right");

  await writeFile(themePath, replaceOne(original.theme, 'activePreset: ThemePresetName = "editorial"', 'activePreset: ThemePresetName = "modern"'));
  await capture("preset-modern-390", "modern");
  await capture("preset-modern-1440", "modern", { width: 1440, height: 900 });

  const noPhotoSite = original.site.replace(/  portrait: \{[\s\S]*?\n  \},\n/, "");
  if (noPhotoSite === original.site) throw new Error("Portrait config block was not found");
  await writeFile(sitePath, noPhotoSite);
  await writeFile(themePath, original.theme);
  await capture("no-photo-390", "editorial");
  if (!results.at(-1)?.heroLayout.includes("hero--no-image") || results.at(-1)?.portrait) throw new Error("No-photo variant did not render");

  let otherSite = original.site;
  otherSite = otherSite.replaceAll("Marina Valença", "Caio Monteiro");
  otherSite = otherSite.replaceAll("Estética avançada", "Arquitetura de interiores");
  otherSite = otherSite.replaceAll("marinavalenca.example", "caiomonteiro.example");
  otherSite = replaceOne(otherSite, "/images/marina-portrait.webp", "/images/studio-still-life.webp");
  otherSite = replaceOne(otherSite, "Retrato editorial da profissional fictícia Caio Monteiro", "Composição ilustrativa de materiais e texturas");
  otherSite = replaceOne(otherSite, "Cuidado que começa na escuta.", "Espaços que acolhem a vida.");
  otherSite = replaceOne(otherSite, "Entre em contato", "Solicitar proposta");
  otherSite = replaceOne(otherSite, "Um espaço para desacelerar, conhecer possibilidades de cuidado e escolher o seu próximo momento de bem-estar.", "Uma apresentação de projetos e caminhos para transformar espaços em lugares de encontro.");
  otherSite = replaceOne(otherSite, "Um convite ao cuidado", "Um olhar para os espaços");
  otherSite = replaceOne(otherSite, "Cuidado no seu tempo", "Ambientes no seu ritmo");
  otherSite = replaceOne(otherSite, "Uma conversa inicial ajuda a entender seus objetivos e encontrar o atendimento adequado.", "Uma conversa inicial ajuda a entender suas necessidades e imaginar um projeto sob medida.");
  otherSite = replaceOne(otherSite, "Cuidados faciais", "Interiores residenciais");
  otherSite = replaceOne(otherSite, "Rotina de bem-estar", "Consultoria de ambientes");
  otherSite = replaceOne(otherSite, "Atendimento personalizado", "Projetos autorais");
  otherSite = replaceOne(otherSite, 'whatsapp: ""', 'whatsapp: "5511999999999"');
  otherSite = replaceOne(otherSite, "Olá! Gostaria de saber mais sobre um atendimento.", "Olá! Gostaria de conversar sobre um projeto.");
  const otherTheme = replaceOne(
    replaceOne(original.theme, 'activePreset: ThemePresetName = "editorial"', 'activePreset: ThemePresetName = "modern"'),
    "export const themeOverrides: ThemeOverrides = {};",
    'export const themeOverrides: ThemeOverrides = { colors: { accent: "#9c5b46", dark: "#423a35" } };',
  );
  let otherLinks = replaceOne(original.links, "Agendar atendimento", "Solicitar projeto");
  otherLinks = replaceOne(otherLinks, "O primeiro passo para um cuidado pensado para você.", "Vamos conversar sobre o espaço que você imagina.");
  otherLinks = replaceOne(otherLinks, "Conheça as possibilidades de cuidado.", "Conheça os formatos de projeto.");
  otherLinks = replaceOne(otherLinks, "Inspiração, rotina e conversas sobre autocuidado.", "Referências, materiais e ideias para morar bem.");
  otherLinks = replaceOne(otherLinks, "/images/marina-portrait.webp", "/images/studio-still-life.webp");
  otherLinks = replaceOne(otherLinks, "Retrato ilustrativo da profissional", "Composição ilustrativa de materiais e texturas");
  await writeFile(sitePath, otherSite);
  await writeFile(themePath, otherTheme);
  await writeFile(linksPath, otherLinks);
  await capture("other-niche-390", "modern");
  const other = results.at(-1);
  if (other?.name !== "Caio Monteiro" || other?.accentColor !== "#9c5b46" || other?.firstCard !== "Solicitar projeto" || !other?.firstCardHref?.includes("wa.me/5511999999999?text=")) {
    throw new Error(`Personalization did not propagate: ${JSON.stringify(other)}`);
  }
} finally {
  await Promise.all([
    writeFile(sitePath, original.site),
    writeFile(themePath, original.theme),
    writeFile(linksPath, original.links),
  ]);
  await browser.close();
}

if (await readFile(sitePath, "utf8") !== original.site || await readFile(themePath, "utf8") !== original.theme || await readFile(linksPath, "utf8") !== original.links) {
  throw new Error("Demo configuration was not restored exactly");
}

await writeFile(join(auditDir, "config-report.json"), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
