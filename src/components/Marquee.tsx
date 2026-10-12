import type { CSSProperties } from "react";
import type { MarqueeAppearance, MarqueeConfig } from "@/config/types";

interface MarqueeProps {
  config: MarqueeConfig;
  theme: MarqueeAppearance;
}

export function Marquee({ config, theme }: MarqueeProps) {
  const phrases = config.phrases.map((phrase) => phrase.trim()).filter(Boolean);
  if (!config.enabled || phrases.length === 0) return null;

  const appearance = { ...theme, ...config };
  const characterCount = phrases.join("").length;
  const cyclesPerCopy = Math.max(2, Math.min(12, Math.ceil(100 / Math.max(characterCount, 1))));
  const style = {
    "--marquee-background": appearance.background,
    "--marquee-text": appearance.textColor,
    "--marquee-separator": appearance.separatorColor,
    "--marquee-font-family": appearance.fontFamily,
    "--marquee-font-size": appearance.fontSize,
    "--marquee-font-weight": appearance.fontWeight,
    "--marquee-letter-spacing": appearance.letterSpacing,
    "--marquee-border": appearance.border,
    "--marquee-radius": appearance.borderRadius,
    "--marquee-duration": `${Math.max(4, appearance.speedSeconds)}s`,
  } as CSSProperties;

  return (
    <div
      className={`marquee${appearance.direction === "right" ? " marquee--right" : ""}${appearance.fadeEdges ? " marquee--fade" : ""}`}
      style={style}
    >
      <span className="sr-only">{phrases.join(` ${config.separator} `)}</span>
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="marquee-sequence" aria-hidden="true" key={copy}>
            {Array.from({ length: cyclesPerCopy }, (_, cycle) => (
              <div className="marquee-cycle" key={cycle}>
                {phrases.map((phrase, index) => (
                  <span className="marquee-unit" key={`${index}-${phrase}`}>
                    <span className="marquee-text">{phrase}</span>
                    <span className="marquee-separator">{config.separator}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
