import Image from "next/image";
import type { LinkCardConfig, ThemeTokens } from "@/config/types";
import { externalLinkProps, safeHref } from "@/lib/links";
import { Icon } from "./Icons";

export function LinkCard({ card, theme }: { card: LinkCardConfig; theme: ThemeTokens }) {
  const layout = card.layout ?? theme.cards.layout;
  const className = `link-card link-card--${card.variant} link-card--${layout} ${card.image ? "link-card--image" : "link-card--no-image"} ${card.active ? "" : "link-card--inactive"}`;
  const content = (
    <>
      <div className="link-card-content">
        {card.icon && <span className="link-card-icon"><Icon name={card.icon} size={22} /></span>}
        <div className="link-card-copy">
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <span className="link-card-cta">{card.cta}<Icon name="arrow-up-right" size={16} /></span>
        </div>
      </div>
      {card.image && <div className="link-card-media"><Image src={card.image.src} alt={card.image.alt} fill sizes="(max-width: 640px) 38vw, 300px" style={{ objectPosition: card.image.position || "center" }} /></div>}
      {!card.image && layout === "horizontal" && <span className="link-card-end" aria-hidden="true"><Icon name="arrow-up-right" size={24} /></span>}
    </>
  );
  if (!card.active) return <div className={className} aria-disabled="true">{content}</div>;
  return <a className={className} href={safeHref(card.href)} {...externalLinkProps(card.href, card.newTab)}>{content}</a>;
}
