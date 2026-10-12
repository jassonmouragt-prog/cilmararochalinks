import type { ContactConfig, LinkCardConfig } from "./types";
import { siteConfig } from "./site";

export function whatsappUrl(contact: ContactConfig): string | undefined {
  const number = contact.whatsapp?.replace(/\D/g, "");
  if (!number) return undefined;
  const message = contact.whatsappMessage?.trim();
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

// bookingHref no longer needed after explicit client links

/** A ordem, visibilidade, estado e aparência de cada card vivem somente aqui. */
export const linkCards: LinkCardConfig[] = [
  {
    id: "booking",
    title: "Agendar consulta",
    description: "Entre em contato para informações sobre consultas e disponibilidade.",
    cta: "Agendar pelo WhatsApp",
    href: "https://wa.me/558199936180",
    icon: "calendar",
    image: { src: "/images/hero-desktop.png", alt: "Cilmara Rocha", position: "center 28%" },
    layout: "horizontal",
    variant: "primary",
    order: 1,
    visible: true,
    active: true,
    newTab: true,
  },
  {
    id: "services",
    title: "Acompanhamento nutricional",
    description: "Conheça como a orientação nutricional pode fazer parte da sua rotina de cuidados.",
    cta: "Solicitar informações",
    href: "https://wa.me/558199936180",
    icon: "sparkles",
    layout: "horizontal",
    variant: "soft",
    order: 2,
    visible: true,
    active: true,
    newTab: true,
  },
  {
    id: "instagram",
    title: "Instagram",
    description: "Acompanhe conteúdos, publicações e novidades.",
    cta: "Visitar perfil",
    href: "https://www.instagram.com/cilmararocha_nutri/",
    icon: "instagram",
    image: { src: "/images/hero-mobile.png", alt: "Cilmara Rocha", position: "center 28%" },
    layout: "horizontal",
    variant: "outline",
    order: 3,
    visible: true,
    active: true,
    newTab: true,
  },
  {
    id: "location",
    title: "Localização",
    description: "Encontre o local de atendimento.",
    cta: "Ver no mapa",
    href: siteConfig.contact.mapUrl || "#contato",
    icon: "map-pin",
    layout: "centered",
    variant: "dark",
    order: 4,
    visible: false,
    active: false,
    newTab: true,
  },
];
