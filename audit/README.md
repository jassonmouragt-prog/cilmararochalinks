# Auditoria visual e comercial — Fase 2

## Reprodução

Os scripts de auditoria usam Playwright instalado temporariamente, sem adicioná-lo às dependências do produto:

```bash
npm install --no-save --package-lock=false playwright
npx playwright install chromium
npm run build
npm run start -- --hostname 127.0.0.1
node audit/visual-audit.mjs
node audit/interaction-audit.mjs
```

`config-audit.mjs` troca temporariamente os arquivos de configuração e restaura seus bytes em um bloco `finally`; execute-o com `npm run dev -- --hostname 127.0.0.1`, não com a build estática de produção.

## PASS

- Servidor Next.js responde HTTP 200 em `127.0.0.1:3000` e `localhost:3000`; o bloqueio anterior era da permissão do navegador automatizado, não da aplicação.
- Capturas de produção inspecionadas em 375 × 812, 390 × 844, 768 × 1024 e 1440 × 900. Hero, fotografias, cards, botões, bordas, cores e espaçamento estão consistentes; não há scroll horizontal.
- Nenhum erro de página ou console nas quatro resoluções após a correção de hidratação. Três imagens carregadas, com textos alternativos; nenhuma imagem quebrada.
- Oito links verificados: protocolos seguros, âncoras existentes, `noopener noreferrer` em novas abas e rótulos nos links somente com ícone. O card Serviços navega para `#servicos`.
- Foco visível de teclado (contorno de 3 px), áreas clicáveis a partir de 44 px, conteúdo visível sem JavaScript e movimento reduzido respeitado. A animação de entrada e o deslocamento de hover foram observados no navegador.
- Presets Editorial, Luxury e Modern renderizados. Luxury move o retrato para a direita no desktop; Modern usa a composição superior no mobile e desktop. A variação sem fotografia renderiza sem falhas.
- Personalização temporária de outro nicho alterou nome, especialidade, paleta, imagem, botão, card e WhatsApp com mensagem codificada. Os três arquivos de configuração foram restaurados exatamente.
- `npm run lint`, `npm run typecheck` e `npm run build` passaram após as correções.
- `npm audit --omit=dev`: zero vulnerabilidades nas dependências de produção.

## PARTIAL

- A verificação de acessibilidade cobre semântica básica, links, imagens, foco, toque, movimento e navegação. Não substitui uma auditoria completa com tecnologias assistivas.
- A demonstração usa domínio `.example`, Instagram genérico, localização ilustrativa e `noindex,nofollow`. Cada instância comercial precisa de dados reais, URL pública e revisão editorial antes de publicar.
- `npm audit` completo aponta cinco alertas altos transitivos na cadeia de desenvolvimento `eslint-config-next → fast-glob → micromatch → braces`. A versão publicada de `braces` ainda é 3.0.3; a correção sugerida pelo npm exige retroceder `eslint-config-next` para uma versão major antiga. Nenhuma dependência de produção é afetada. Não foi feito upgrade ou downgrade majoritário.

## FAIL

Nenhum problema funcional ou visual aberto nas resoluções auditadas. O erro de hidratação e os ajustes de serviços/endereço identificados na primeira rodada foram corrigidos e recapturados.

## Screenshots

Capturas finais de produção: `screenshots/mobile-375.png`, `screenshots/mobile-390.png`, `screenshots/tablet-768.png`, `screenshots/desktop-1440.png`.

Capturas de configuração em desenvolvimento: `screenshots/preset-luxury-390.png`, `screenshots/preset-luxury-1440.png`, `screenshots/preset-modern-390.png`, `screenshots/preset-modern-1440.png`, `screenshots/no-photo-390.png`, `screenshots/other-niche-390.png`. Estas podem incluir o indicador visual do Next.js DevTools, ausente nas capturas de produção.

Dados detalhados: `visual-report.json`, `interaction-report.json` e `config-report.json`.

## Correções realizadas

1. Entrada animada reescrita para manter o HTML inicial visível e evitar diferença de hidratação com movimento reduzido.
2. Itens da seção Serviços posicionados na segunda coluna em tablet/desktop, removendo a sobreposição com o título.
3. Endereço agrupado em um único trecho de texto para evitar quebra palavra a palavra no mobile.
4. Texto do hero e dos cards ampliado no mobile para melhorar a leitura.

## Pendências antes da primeira instância comercial

Substituir conteúdo fictício e destinos de demonstração, definir `NEXT_PUBLIC_SITE_URL` ou `seo.siteUrl`, trocar `seo.robots` para `index,follow` quando apropriado e executar a auditoria final com as imagens e textos reais do cliente.


## Hero integrado ? 2026-10-11

- Novo padr?o `integrated` nos presets Editorial, Luxury e Modern.
- Desktop com texto ? esquerda e foto ? direita; mobile com foto acima do conte?do dentro do mesmo card, sem moldura interna.
- Configura??o de lado desktop, enquadramento mobile, intensidade de overlay, fundo e gradiente decorativo. Guia de personaliza??o atualizado.
- Valida??o com Vercel `agent-browser`: 375 ? 812, 390 ? 844, 768 ? 1024 e 1440 ? 900; capturas `screenshots/integrated-*.png`.
- Relat?rios de presets e variantes: `integrated-presets-report.json` e `integrated-variants-report.json`. Configura??es tempor?rias restauradas.
- Lint, build de produ??o e TypeScript passaram com a configura??o final. Detector Impeccable: nenhum achado.
