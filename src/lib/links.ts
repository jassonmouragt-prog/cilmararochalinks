export function safeHref(href: string): string {
  const value = href.trim();
  if (/^(#[\w-]+|\/[\w\-/]*)$/.test(value)) return value;
  if (/^(https:\/\/|mailto:|tel:)/i.test(value)) return value;
  return "#contato";
}

export function externalLinkProps(href: string, newTab?: boolean) {
  const external = /^https:\/\//i.test(href);
  return external && newTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}
