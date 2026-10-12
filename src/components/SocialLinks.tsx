import type { SocialLink } from "@/config/types";
import { externalLinkProps, safeHref } from "@/lib/links";
import { Icon } from "./Icons";

export function SocialLinks({ links, light = false }: { links: SocialLink[]; light?: boolean }) {
  const visible = links.filter((link) => link.visible && link.url);
  if (!visible.length) return null;
  return (
    <nav aria-label="Redes sociais e contato" className={`social-links ${light ? "social-links--light" : ""}`}>
      {visible.map((link) => (
        <a
          key={link.id}
          href={safeHref(link.url)}
          aria-label={link.label}
          title={link.label}
          {...externalLinkProps(link.url, true)}
        >
          <Icon name={link.icon} size={18} />
        </a>
      ))}
    </nav>
  );
}
