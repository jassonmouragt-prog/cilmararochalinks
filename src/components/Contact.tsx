import type { SiteConfig } from "@/config/types";
import { whatsappUrl } from "@/config/links";
import { externalLinkProps, safeHref } from "@/lib/links";
import { Icon } from "./Icons";

export function Contact({ site }: { site: SiteConfig }) {
  const whatsapp = whatsappUrl(site.contact);
  const methods = [
    whatsapp && { label: "WhatsApp", href: whatsapp, icon: "whatsapp" as const },
    site.contact.email && { label: "E-mail", href: `mailto:${site.contact.email}`, icon: "mail" as const },
    site.contact.phone && { label: "Ligar", href: `tel:${site.contact.phone.replace(/[^\d+]/g, "")}`, icon: "phone" as const },
    site.contact.catalogUrl && { label: "Catálogo", href: site.contact.catalogUrl, icon: "briefcase" as const },
    site.contact.portfolioUrl && { label: "Portfólio", href: site.contact.portfolioUrl, icon: "globe" as const },
  ].filter((method): method is { label: string; href: string; icon: "whatsapp" | "mail" | "phone" | "briefcase" | "globe" } => Boolean(method));

  return (
    <section className="contact-section" id="contato" aria-labelledby="contact-title">
      <div>
        <h2 id="contact-title">Vamos começar uma conversa?</h2>
        <p>Escolha o canal mais confortável para você. Será um prazer ouvir o que procura.</p>
      </div>
      <div className="contact-methods">
        {methods.map((method) => (
          <a key={method.label} href={safeHref(method.href)} {...externalLinkProps(method.href, true)}>
            <Icon name={method.icon} size={18} />
            {method.label}
            <Icon name="arrow-up-right" size={16} />
          </a>
        ))}
      </div>
      {site.contact.address && <p className="contact-address"><Icon name="map-pin" size={16} /><span>{site.contact.address}{site.contact.addressNote && <> · {site.contact.addressNote}</>}</span></p>}
    </section>
  );
}
