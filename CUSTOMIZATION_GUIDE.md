# Personalização do Bio Site White Label

Este projeto é um template mestre. A identidade inicial de **Marina Valença** é fictícia e serve apenas para demonstração. Dados de cliente, apresentação e contato ficam em `src/config/site.ts`; cards ficam em `src/config/links.ts`; aparência fica em `src/config/theme.ts`. Os componentes não guardam informações comerciais.

## 1. Criar uma nova instância comercial

1. Duplique o projeto em uma pasta ou repositório próprio para o cliente.
2. Edite `src/config/site.ts`: nome, empresa, nicho, slogan, descrição, contatos, redes, endereço e SEO.
3. Substitua as imagens em `public/images` e atualize os caminhos correspondentes.
4. Configure os cards em `src/config/links.ts`.
5. Escolha um preset e ajuste os tokens em `src/config/theme.ts`, incluindo a faixa de frases.
6. Rode `npm install`, `npm run lint`, `npm run typecheck` e `npm run build`.
7. Defina `NEXT_PUBLIC_SITE_URL` com a URL final ou preencha `seo.siteUrl`. Altere `seo.robots` para `index,follow` apenas quando os dados ilustrativos tiverem sido substituídos.
8. Publique na Vercel conectando o repositório. O framework Next.js é detectado automaticamente; não há banco de dados nem variáveis obrigatórias além da URL pública para metadados absolutos.

## 2. Cliente, textos e botões

Em `src/config/site.ts`, altere `clientName`, `companyName`, `niche`, `slogan` e `description`. O bloco `hero` controla chamada, nota, frase decorativa, botão principal e posição da fotografia. `hero.layout` usa `integrated` como padr?o nos tr?s presets e tamb?m aceita `portrait-left`, `portrait-right`, `portrait-top` ou `text-only`. Remova `portrait` e `logo` para usar a composição sem imagem e o monograma automático. O logo, quando informado, substitui o monograma.

O botão principal é opcional: remova `hero.primaryButton` para ocultá-lo. Use URLs `https://`, `mailto:`, `tel:`, `/caminho` ou `#ancora`. A função `safeHref` rejeita protocolos inseguros.

## 3. Imagens

Coloque arquivos locais otimizados em `public/images` e use caminhos como `/images/foto.webp`. Atualize `portrait`, `logo`, as imagens de cards e `seo.ogImage`. Inclua texto alternativo descritivo em cada `SiteImage`. `position` aceita valores de `object-position`, por exemplo `center 30%`. As imagens usam `next/image`; informe fotos com enquadramento que funcione no corte horizontal dos cards. A imagem principal tem prioridade de carregamento.

## 4. Tema, paleta e tipografia

Em `src/config/theme.ts`, `activePreset` aceita `editorial`, `luxury` ou `modern`. O Editorial é a demonstração inicial. Os presets definem cores, fontes, raios, sombras, duração de movimento e padrões de hero/cards/marquee.

Para mudar só alguns atributos, preencha `themeOverrides`:

```ts
export const activePreset: ThemePresetName = "editorial";
export const themeOverrides: ThemeOverrides = {
  colors: { accent: "#365d52", page: "#f6f2ec" },
  radius: { card: "14px" },
  fonts: { display: "var(--font-jakarta)" },
};
```

As cores são tokens semânticos (`page`, `surface`, `ink`, `accent`, `line` etc.) aplicados como CSS variables. Faça mudanças de contraste junto com a paleta. As fontes já carregadas são DM Sans e Plus Jakarta Sans em `src/app/layout.tsx`. Para outra família, adicione-a via `next/font` e mapeie sua variável em `theme.ts`.

## 5. Marquee

Em `src/config/site.ts`, `marquee.enabled` mostra ou oculta a faixa. Edite `phrases` e `separator` para trocar o conteúdo; os textos demonstrativos são apenas exemplos. A faixa aparece entre o Hero e os cards. O componente repete as frases visualmente para manter o loop contínuo, mas os leitores de tela recebem a sequência somente uma vez.

Cada preset em `src/config/theme.ts` define o visual padrão da marquee. Para ajustar apenas esta instância, informe qualquer um dos campos abaixo no objeto `marquee` de `site.ts`:

```ts
marquee: {
  enabled: true,
  phrases: ["SUA FRASE", "OUTRA FRASE"],
  separator: "✦",
  speedSeconds: 28,
  direction: "left", // "left" ou "right"
  background: "#eee8de",
  textColor: "#24352f",
  separatorColor: "#576e60",
  fontFamily: "var(--font-display)",
  fontSize: "20px",
  fontWeight: 600,
  letterSpacing: ".12em",
  border: "1px solid #d5d6cc",
  borderRadius: "18px",
  fadeEdges: true,
},
```

`speedSeconds` é o tempo de um ciclo completo; valores maiores deixam o movimento mais lento. Use cores com contraste suficiente. Também é possível alterar os padrões de todos os clientes que usam um preset em `themePresets` ou sobrescrever apenas alguns tokens com `themeOverrides.marquee`. A animação é desativada automaticamente quando o visitante prefere movimento reduzido; nesse caso as frases aparecem sem rolagem.

## 6. Cards e ordem

Edite o array `linkCards` em `src/config/links.ts`. Cada item aceita `title`, `description`, `cta`, `href`, `icon`, `image`, `layout`, `variant`, `order`, `visible`, `active` e `newTab`. As variações são `primary`, `soft`, `outline` e `dark`; os layouts são `horizontal` e `centered`. Remova `image` para um card somente com texto. `visible: false` oculta o card; `active: false` o mostra sem link. A ordem numérica é aplicada automaticamente.

O card de agendamento usa, nesta ordem: `bookingUrl`, WhatsApp configurado, e-mail configurado ou a âncora de contato. Substitua os destinos demonstrativos antes da publicação.

## 7. Redes e contato

`socialLinks` em `site.ts` configura ícone, nome acessível, URL e visibilidade. Links `https://` que abrem em outra aba recebem `rel="noopener noreferrer"`.

Em `contact`, informe `email`, `phone`, `whatsapp`, `whatsappMessage`, `bookingUrl`, `catalogUrl`, `portfolioUrl`, `address` e `mapUrl` conforme necessário. Para WhatsApp, use número com DDI e DDD, por exemplo `5511999999999`. A mensagem inicial é codificada automaticamente. Deixe `whatsapp` vazio para ocultar essa opção. `addressNote` pode mostrar uma observação curta sobre atendimento ou localização.

## 8. SEO

Edite `seo.title`, `seo.description`, `seo.locale`, `seo.ogImage`, `seo.siteUrl` e `seo.robots` em `site.ts`, além de `favicon`. Metadados e Open Graph são gerados a partir desses campos. A demonstração usa `noindex,nofollow` e domínio `.example` para evitar indexar uma identidade fictícia. Antes de publicar para um cliente real, substitua também os contatos, links de redes e endereço.

## 9. Personalização por instrução em linguagem natural

Uma instrução para IA pode seguir este formato: “Troque a identidade para [cliente/nicho], use o preset Luxury, ajuste o verde para [cor], substitua as imagens pelos arquivos [nomes], coloque Agendamento em primeiro e oculte Localização. Preserve os componentes e a arquitetura white label.”

Peça para a IA editar apenas `src/config/site.ts`, `src/config/links.ts`, `src/config/theme.ts` e os assets necessários, salvo quando o novo escopo exigir comportamento adicional. Peça também para verificar contraste, responsividade, lint, TypeScript e build depois da mudança.

## Hero integrado

O padr?o `integrated` coloca texto ? esquerda e foto ? direita no desktop; no mobile, a foto aparece acima do texto, no mesmo container. `portrait.src`, `portrait.alt` e `portrait.position` continuam definindo a imagem e seu enquadramento desktop. Sem `portrait`, o card se adapta ao conte?do sem reservar espa?o vazio.

Personalize pelo bloco `hero` de `site.ts` ou pelos tokens `hero` de `theme.ts`:

```ts
hero: {
  layout: "integrated",
  imageSide: "right", // "left" ? uma varia??o desktop; mobile permanece foto acima
  mobileImagePosition: "center 25%",
  overlayIntensity: 0.12, // 0 a 1; a transi??o de borda permanece para integrar a foto
  background: "var(--color-dark)",
  decorativeGradient: "none", // ou um background CSS compat?vel com a paleta
},
```

Ao trocar o fundo, ajuste `colors.darkInk` para manter o contraste do texto. O CTA, as redes, a nota e os elementos decorativos continuam opcionais. A fotografia usa `next/image` com `preload` e tamanhos responsivos.
