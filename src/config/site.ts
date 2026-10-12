import type { SiteConfig } from "./types";

/** Identidade demonstrativa inteiramente fictícia. Substitua este objeto por cliente. */
export const siteConfig: SiteConfig = {
  clientName: "Cilmara Rocha",
  companyName: "Cilmara Rocha Nutri",
  niche: "Nutrição & Bem-estar",
  favicon: "/favicon.svg",
  portrait: {
    src: "/images/hero-desktop.png",
    alt: "Retrato da nutricionista Cilmara Rocha",
    position: "center 31%",
  },
  slogan: "Nutrição que acolhe. Cuidado que transforma sua rotina.",
  description:
    "Um olhar individualizado para sua alimentação, seus objetivos e sua qualidade de vida.",
  hero: {
    // O layout integrated vem do preset; ajuste aqui o enquadramento por cliente.
    mobileImagePosition: "center 31%",
    eyebrow: "Um convite ao cuidado",
    note: "",
    decorativeWord: "",
    primaryButton: { label: "Agendar minha consulta", href: "https://wa.me/558199936180", icon: "arrow-up-right" },
  },
  marquee: {
    enabled: true,
    phrases: ["SAÚDE", "EQUILÍBRIO", "BEM-ESTAR", "CUIDADO"],
    separator: "✦",
  },
  socialLinks: [
    { id: "instagram", label: "Instagram", icon: "instagram", url: "https://www.instagram.com/cilmararocha_nutri/", visible: true },
  ],
  contact: {
    email: "",
    whatsapp: "+55 81 9993-6180",
    whatsappMessage: "Olá, Cilmara! Gostaria de saber mais sobre o atendimento nutricional.",
    address: "",
    addressNote: "",
    mapUrl: "",
  },
  services: {
    title: "Cuidado no seu tempo",
    description: "Uma conversa inicial ajuda a entender seus objetivos e encontrar o atendimento adequado.",
    items: ["Acompanhamento nutricional", "Orientação individualizada", "Rotina de bem-estar"],
    visible: true,
  },
  footer: { note: "Cilmara Rocha Nutri", showCopyright: true },
  seo: {
    title: "Cilmara Rocha | Nutricionista",
    description: "Conheça Cilmara Rocha e saiba como entrar em contato para informações sobre acompanhamento nutricional e agendamentos.",
    ogImage: "/images/hero-desktop.png",
    locale: "pt_BR",
    robots: "noindex,nofollow",
  },
};
