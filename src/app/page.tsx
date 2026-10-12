import { ArrowDown } from "lucide-react";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { LinkCard } from "@/components/LinkCard";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { linkCards } from "@/config/links";
import { siteConfig } from "@/config/site";
import { resolveTheme } from "@/config/theme";

export default function Home() {
  const theme = resolveTheme();
  const cards = linkCards.filter((card) => card.visible).sort((a, b) => a.order - b.order);
  return (
    <main className="page-shell">
      <Reveal><Hero site={siteConfig} theme={theme} /></Reveal>

      <Marquee config={siteConfig.marquee} theme={theme.marquee} />

      <section className="links-section" aria-labelledby="links-title">
        <div className="section-heading">
          <div>
            <h2 id="links-title">O seu próximo passo</h2>
            <p>Encontre o que procura, no seu tempo.</p>
          </div>
          <ArrowDown aria-hidden="true" size={22} strokeWidth={1.35} />
        </div>
        <div className="cards-list">
          {cards.map((card, index) => <Reveal key={card.id} delay={Math.min(index * 0.07, 0.21)}><LinkCard card={card} theme={theme} /></Reveal>)}
        </div>
      </section>

      {siteConfig.services?.visible && (
        <Reveal>
          <section className="services-section" id="servicos" aria-labelledby="services-title">
            <div className="services-intro"><span className="services-line" /><h2 id="services-title">{siteConfig.services.title}</h2></div>
            <p>{siteConfig.services.description}</p>
            <ul>{siteConfig.services.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </Reveal>
      )}

      <Reveal><Contact site={siteConfig} /></Reveal>

      <footer className="site-footer">
        <span>{siteConfig.companyName || siteConfig.clientName}</span>
        {siteConfig.footer.note && <span>{siteConfig.footer.note}</span>}
        {siteConfig.footer.showCopyright && <span>© {new Date().getFullYear()}</span>}
      </footer>
    </main>
  );
}
