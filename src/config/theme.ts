import type { ThemeOverrides, ThemePresetName, ThemeTokens } from "./types";

export const themePresets: Record<ThemePresetName, ThemeTokens> = {
  editorial: {
    colors: {
      page: "#FAF8F0", surface: "#FFFFFF", surfaceMuted: "#EFE9DB", ink: "#2D302A",
      inkSoft: "#4F544B", accent: "#68734C", accentInk: "#FFFFFF", accentSoft: "#E6E9DC",
      line: "#E6DED0", dark: "#303C2D", darkInk: "#FAF8F0", selection: "#D1BC91",
    },
    fonts: { display: "var(--font-manrope)", body: "var(--font-inter)" },
    radius: { card: "18px", image: "14px", button: "999px" },
    effects: { shadow: "0 24px 60px -38px rgba(48, 60, 45, .24)", cardShadow: "0 18px 42px -30px rgba(48, 60, 45, .28)", backdrop: "none" },
    motion: { duration: "650ms", distance: "18px" },
    hero: {
      layout: "integrated", decoration: true,
      imageSide: "right", mobileImagePosition: "center", overlayIntensity: 0.12,
      background: "var(--color-dark)",
      decorativeGradient: "radial-gradient(ellipse at 12% 95%, color-mix(in srgb, var(--color-accent) 24%, transparent), transparent 65%)",
    },
    cards: { layout: "horizontal", imageRatio: "38%" },
    marquee: {
      speedSeconds: 30, direction: "left", background: "var(--color-dark)",
      textColor: "#FAF8F0", separatorColor: "#D1BC91",
      fontFamily: "var(--font-manrope)", fontSize: "20px", fontWeight: 600,
      letterSpacing: ".12em", border: "1px solid color-mix(in srgb, var(--color-darkInk) 18%, transparent)",
      borderRadius: "20px", fadeEdges: true,
    },
  },
  luxury: {
    colors: {
      page: "#FAF8F0", surface: "#FFFFFF", surfaceMuted: "#EFE9DB", ink: "#2D302A",
      inkSoft: "#5B5A53", accent: "#68734C", accentInk: "#FFFFFF", accentSoft: "#E6E9DC",
      line: "#D6CFC0", dark: "#303C2D", darkInk: "#FAF8F0", selection: "#D1BC91",
    },
    fonts: { display: "var(--font-manrope)", body: "var(--font-inter)" },
    radius: { card: "14px", image: "10px", button: "999px" },
    effects: { shadow: "0 22px 54px -39px rgba(48, 60, 45, .26)", cardShadow: "0 14px 36px -29px rgba(48, 60, 45, .24)", backdrop: "none" },
    motion: { duration: "720ms", distance: "14px" },
    hero: {
      layout: "integrated", decoration: false,
      imageSide: "right", mobileImagePosition: "center", overlayIntensity: 0.12,
      background: "var(--color-dark)",
      decorativeGradient: "radial-gradient(ellipse at 12% 95%, color-mix(in srgb, var(--color-accent) 24%, transparent), transparent 65%)",
    },
    cards: { layout: "horizontal", imageRatio: "34%" },
    marquee: {
      speedSeconds: 36, direction: "left", background: "var(--color-dark)",
      textColor: "#FAF8F0", separatorColor: "#D1BC91",
      fontFamily: "var(--font-manrope)", fontSize: "19px", fontWeight: 500,
      letterSpacing: ".18em", border: "1px solid color-mix(in srgb, var(--color-darkInk) 16%, transparent)",
      borderRadius: "20px", fadeEdges: true,
    },
  },
  modern: {
    colors: {
      page: "#FAF8F0", surface: "#FFFFFF", surfaceMuted: "#EFE9DB", ink: "#2D302A",
      inkSoft: "#52615C", accent: "#68734C", accentInk: "#FFFFFF", accentSoft: "#E6E9DC",
      line: "#DAD2C2", dark: "#303C2D", darkInk: "#FAF8F0", selection: "#D1BC91",
    },
    fonts: { display: "var(--font-manrope)", body: "var(--font-inter)" },
    radius: { card: "20px", image: "16px", button: "999px" },
    effects: { shadow: "0 24px 60px -38px rgba(48, 60, 45, .28)", cardShadow: "0 18px 42px -30px rgba(48, 60, 45, .32)", backdrop: "none" },
    motion: { duration: "560ms", distance: "20px" },
    hero: {
      layout: "integrated", decoration: true,
      imageSide: "right", mobileImagePosition: "center", overlayIntensity: 0.12,
      background: "var(--color-dark)",
      decorativeGradient: "radial-gradient(ellipse at 12% 95%, color-mix(in srgb, var(--color-accent) 24%, transparent), transparent 65%)",
    },
    cards: { layout: "horizontal", imageRatio: "40%" },
    marquee: {
      speedSeconds: 24, direction: "left", background: "var(--color-dark)",
      textColor: "#FAF8F0", separatorColor: "#D1BC91",
      fontFamily: "var(--font-manrope)", fontSize: "15px", fontWeight: 700,
      letterSpacing: ".17em", border: "1px solid color-mix(in srgb, var(--color-darkInk) 16%, transparent)",
      borderRadius: "20px", fadeEdges: true,
    },
  },
};

export const activePreset: ThemePresetName = "editorial";
/** Sobrescreva só os tokens desejados, sem perder o restante do preset. */
export const themeOverrides: ThemeOverrides = {};

export function resolveTheme(preset = activePreset, overrides: ThemeOverrides = themeOverrides): ThemeTokens {
  const base = themePresets[preset];
  return {
    colors: { ...base.colors, ...overrides.colors },
    fonts: { ...base.fonts, ...overrides.fonts },
    radius: { ...base.radius, ...overrides.radius },
    effects: { ...base.effects, ...overrides.effects },
    motion: { ...base.motion, ...overrides.motion },
    hero: { ...base.hero, ...overrides.hero },
    cards: { ...base.cards, ...overrides.cards },
    marquee: { ...base.marquee, ...overrides.marquee },
  };
}

export function themeCssVariables(theme: ThemeTokens): Record<string, string> {
  return {
    ...Object.fromEntries(Object.entries(theme.colors).map(([key, value]) => [`--color-${key}`, value])),
    "--font-display": theme.fonts.display,
    "--font-body": theme.fonts.body,
    "--radius-card": theme.radius.card,
    "--radius-image": theme.radius.image,
    "--radius-button": theme.radius.button,
    "--shadow-page": theme.effects.shadow,
    "--shadow-card": theme.effects.cardShadow,
    "--backdrop-effect": theme.effects.backdrop,
    "--motion-duration": theme.motion.duration,
    "--motion-distance": theme.motion.distance,
    "--card-image-ratio": theme.cards.imageRatio,
  };
}
