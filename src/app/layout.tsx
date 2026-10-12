import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { activePreset, resolveTheme, themeCssVariables } from "@/config/theme";
import "./globals.css";

const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
const display = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-manrope", display: "swap" });

const baseUrl = siteConfig.seo.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  robots: siteConfig.seo.robots,
  icons: { icon: siteConfig.favicon },
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    siteName: siteConfig.companyName || siteConfig.clientName,
    images: siteConfig.seo.ogImage ? [{ url: siteConfig.seo.ogImage, alt: siteConfig.clientName }] : undefined,
  },
  twitter: { card: "summary_large_image", title: siteConfig.seo.title, description: siteConfig.seo.description },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: resolveTheme().colors.page };

export default function RootLayout({ children }: { children: ReactNode }) {
  const theme = resolveTheme();
  return (
    <html lang="pt-BR" data-theme={activePreset}>
      <body className={`${body.variable} ${display.variable}`} style={themeCssVariables(theme) as CSSProperties}>
        {children}
      </body>
    </html>
  );
}
