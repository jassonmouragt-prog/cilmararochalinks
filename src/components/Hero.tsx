import type { CSSProperties } from "react";
import Image from "next/image";
import type { SiteConfig, ThemeTokens } from "@/config/types";
import { externalLinkProps, safeHref } from "@/lib/links";
import { Icon } from "./Icons";
import { SocialLinks } from "./SocialLinks";

function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export function Hero({ site, theme }: { site: SiteConfig; theme: ThemeTokens }) {
  const layout = site.hero.layout ?? theme.hero.layout;
  const decoration = site.hero.showDecoration ?? theme.hero.decoration;
  const hasPortrait = Boolean(site.portrait) && layout !== "text-only";
  const integrated = layout === "integrated";
  const appearance = { ...theme.hero, ...site.hero };
  const heroStyle = {
    "--hero-background": appearance.background,
    "--hero-gradient": appearance.decorativeGradient,
    "--hero-overlay": Math.min(1, Math.max(0, appearance.overlayIntensity)),
    "--hero-image-position": site.portrait?.position || "center",
    "--hero-mobile-image-position": site.hero.mobileImagePosition || theme.hero.mobileImagePosition,
  } as CSSProperties;
  const topline = (
      <div className="hero-topline">
        {site.logo ? (
          <Image src={site.logo.src} alt={site.logo.alt} width={126} height={56} className="brand-logo" />
        ) : (
          <div className="brand-mark" aria-label={site.companyName || site.clientName}>{initials(site.companyName || site.clientName)}</div>
        )}
        <span className="hero-topline-note">{site.niche}</span>
      </div>
  );
  return (
    <section style={heroStyle} className={`hero hero--${layout} hero--image-${appearance.imageSide} ${hasPortrait ? "" : "hero--no-image"}`} aria-labelledby="hero-title">
      {!integrated && topline}

      <div className="hero-grid">
        {hasPortrait && site.portrait && (
          <div className="hero-portrait-wrap">
            <Image
              src={site.portrait.src}
              alt={site.portrait.alt}
              fill
              preload
              sizes="(max-width: 760px) calc(100vw - 24px), (max-width: 1056px) 50vw, 500px"
              className="hero-portrait"
            />
            {!integrated && <div className="portrait-label" aria-hidden="true">{site.hero.note || site.niche}</div>}
          </div>
        )}
        <div className="hero-content">
          {integrated && topline}
          {site.hero.eyebrow && <p className="hero-eyebrow">{site.hero.eyebrow}</p>}
          <h1 id="hero-title">{site.clientName}</h1>
          <p className="hero-niche">{site.niche}</p>
          <div className="hero-rule" />
          <p className="hero-slogan">{site.slogan}</p>
          <p className="hero-description">{site.description}</p>
          {integrated && site.hero.note && <p className="hero-note">{site.hero.note}</p>}
          <div className="hero-actions">
            {site.hero.primaryButton && (
              <a className="hero-button" href={safeHref(site.hero.primaryButton.href)} {...externalLinkProps(site.hero.primaryButton.href, true)}>
                <span>{site.hero.primaryButton.label}</span>
                <Icon name={site.hero.primaryButton.icon || "arrow-up-right"} size={18} />
              </a>
            )}
            <SocialLinks links={site.socialLinks} light />
          </div>
        </div>
      </div>
      {decoration && site.hero.decorativeWord && <span className="hero-decoration" aria-hidden="true">{site.hero.decorativeWord}</span>}
    </section>
  );
}
