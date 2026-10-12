# Visual system

## Direction

Editorial contemporâneo para a demonstração: fundo marfim, verde profundo, retrato humano em luz natural e tipografia sem serifa, com Plus Jakarta Sans nos t?tulos e DM Sans nos textos. O hero apresenta a profissional imediatamente; os cards horizontais tornam os próximos passos visíveis sem uma interface carregada.

## Tokens

`src/config/theme.ts` é a fonte de verdade de cores, fontes, raios, sombras e movimento. Os presets Editorial, Luxury e Modern usam o mesmo sistema semântico de CSS variables.

## Composition

- Mobile: retrato, apresentação, CTA e cards em uma coluna.
- Desktop: página centralizada com hero em duas colunas e cards contidos.
- Cards de imagem mantêm texto à esquerda e mídia à direita.
- A seção de serviços e o bloco de contato dão fechamento ao fluxo.

## Motion and accessibility

Entrada suave uma vez por seção, hover discreto e suporte a `prefers-reduced-motion`. Controles têm foco visível, links externos seguros e alvos de toque com cerca de 44 px.
