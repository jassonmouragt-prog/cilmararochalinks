export type IconName =
  | "instagram" | "whatsapp" | "mail" | "phone" | "map-pin"
  | "calendar" | "sparkles" | "arrow-up-right" | "globe" | "briefcase";

export type HeroLayout = "integrated" | "portrait-left" | "portrait-right" | "portrait-top" | "text-only";
export type CardLayout = "horizontal" | "centered";
export type CardVariant = "primary" | "soft" | "outline" | "dark";

export interface IntegratedHeroAppearance {
  imageSide: "left" | "right";
  mobileImagePosition: string;
  overlayIntensity: number;
  background: string;
  decorativeGradient: string;
}

export interface SiteImage {
  src: string;
  alt: string;
  position?: string;
}

export interface SocialLink {
  id: string;
  label: string;
  icon: IconName;
  url: string;
  visible: boolean;
}

export interface ContactConfig {
  email?: string;
  phone?: string;
  whatsapp?: string;
  whatsappMessage?: string;
  address?: string;
  addressNote?: string;
  mapUrl?: string;
  bookingUrl?: string;
  catalogUrl?: string;
  portfolioUrl?: string;
}

export interface MarqueeAppearance {
  speedSeconds: number;
  direction: "left" | "right";
  background: string;
  textColor: string;
  separatorColor: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  letterSpacing: string;
  border: string;
  borderRadius: string;
  fadeEdges: boolean;
}

export interface MarqueeConfig extends Partial<MarqueeAppearance> {
  enabled: boolean;
  phrases: string[];
  separator: string;
}

export interface SiteConfig {
  clientName: string;
  companyName?: string;
  niche: string;
  logo?: SiteImage;
  favicon: string;
  portrait?: SiteImage;
  slogan: string;
  description: string;
  hero: Partial<IntegratedHeroAppearance> & {
    layout?: HeroLayout;
    eyebrow?: string;
    note?: string;
    decorativeWord?: string;
    showDecoration?: boolean;
    primaryButton?: { label: string; href: string; icon?: IconName };
  };
  marquee: MarqueeConfig;
  socialLinks: SocialLink[];
  contact: ContactConfig;
  services?: { title: string; description: string; items: string[]; visible: boolean };
  footer: { note?: string; showCopyright: boolean };
  seo: {
    title: string;
    description: string;
    siteUrl?: string;
    ogImage?: string;
    locale: string;
    robots: "index,follow" | "noindex,nofollow";
  };
}

export interface LinkCardConfig {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  icon?: IconName;
  image?: SiteImage;
  layout?: CardLayout;
  variant: CardVariant;
  order: number;
  visible: boolean;
  active: boolean;
  newTab?: boolean;
}

export interface ThemeTokens {
  colors: {
    page: string;
    surface: string;
    surfaceMuted: string;
    ink: string;
    inkSoft: string;
    accent: string;
    accentInk: string;
    accentSoft: string;
    line: string;
    dark: string;
    darkInk: string;
    selection: string;
  };
  fonts: { display: string; body: string };
  radius: { card: string; image: string; button: string };
  effects: { shadow: string; cardShadow: string; backdrop: string };
  motion: { duration: string; distance: string };
  hero: IntegratedHeroAppearance & { layout: HeroLayout; decoration: boolean };
  cards: { layout: CardLayout; imageRatio: string };
  marquee: MarqueeAppearance;
}

export type ThemePresetName = "editorial" | "luxury" | "modern";
export type ThemeOverrides = {
  [K in keyof ThemeTokens]?: Partial<ThemeTokens[K]>;
};
