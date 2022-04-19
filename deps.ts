// cli deps
export {
  Command,
  EnumType,
} from "https://deno.land/x/cliffy@v0.23.0/command/mod.ts";
export * as path from "https://deno.land/std@0.135.0/path/mod.ts";
export { colors } from "https://deno.land/x/cliffy@v0.23.0/ansi/colors.ts";
export { default as os } from "https://deno.land/x/dos@v0.11.0/mod.ts";

// unified deps
export { unified } from "https://esm.sh/unified@10.1.2";
export type { Plugin, Transformer } from "https://esm.sh/unified@10.1.2";
export { default as remarkParse } from "https://esm.sh/remark-parse@10.0.1";
export { default as remarkGfm } from "https://esm.sh/remark-gfm@3.0.1";
export { default as remarkGemoji } from "https://esm.sh/remark-gemoji@7.0.1";
export { default as remarkMath } from "https://esm.sh/remark-math@5.1.1";
export { default as remarkJaruby } from "https://esm.sh/remark-jaruby@0.1.0";
export { default as remarkToc } from "https://esm.sh/remark-toc@8.0.1";
export { default as rehypePrism } from "https://esm.sh/@mapbox/rehype-prism@0.8.0";
export { default as remarkRehype } from "https://esm.sh/remark-rehype@10.1.0";
export { default as rehypeKatex } from "https://esm.sh/rehype-katex@6.0.2";
export { default as rehypeDocument } from "https://esm.sh/rehype-document@6.0.1";

// Currently shiki doesn't work: see https://github.com/shikijs/shiki/issues/131
//export * as shiki from "https://esm.sh/shiki";
//export { default as rehypeShiki } from "https://esm.sh/@leafac/rehype-shiki";

export { default as rehypeSlug } from "https://esm.sh/rehype-slug@5.0.1";
export { default as rehypeAutolinkHeadings } from "https://esm.sh/rehype-autolink-headings@6.1.1";
export { default as rehypeStringify } from "https://esm.sh/rehype-stringify@9.0.3";

// remarkMermaid deps
export { fromParse5 } from "https://esm.sh/hast-util-from-parse5@7.1.0";
export { is } from "https://esm.sh/unist-util-is@5.1.1";
export type { Node, Parent } from "https://esm.sh/unist-types@1.4.0";
export type {
  Code,
  Paragraph,
} from "https://cdn.skypack.dev/@types/mdast@3.0.10?dts";
export { default as mermaid } from "https://esm.sh/mermaid@9.0.0";
export { parseFragment } from "https://esm.sh/parse5@6.0.1";
export { optimize } from "https://esm.sh/svgo@2.8.0";
export type { OptimizedSvg, OptimizeOptions } from "https://esm.sh/svgo@2.8.0";
export type { VFileCompatible } from "https://esm.sh/vfile@5.3.2";
export { visit } from "https://esm.sh/unist-util-visit@4.1.0";

// puppeteer deps
export { default as puppeteer } from "https://deno.land/x/puppeteer@9.0.2/mod.ts";
export type {
  Browser,
  BrowserConnectOptions,
  ChromeArgOptions,
  LaunchOptions,
  Page,
  Product,
} from "https://deno.land/x/puppeteer@9.0.2/mod.ts";
