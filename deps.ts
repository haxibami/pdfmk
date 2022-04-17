// cli deps
export * as flags from "https://deno.land/std@0.135.0/flags/mod.ts";
export * as colors from "https://deno.land/std@0.135.0/fmt/colors.ts";
export * as path from "https://deno.land/std@0.135.0/path/mod.ts";
export { default as os } from "https://deno.land/x/dos@v0.11.0/mod.ts";

// unified deps
export { unified } from "https://esm.sh/unified";
export type { Plugin, Transformer } from "https://esm.sh/unified";
export { default as remarkParse } from "https://esm.sh/remark-parse";
export { default as remarkGfm } from "https://esm.sh/remark-gfm";
export { default as remarkGemoji } from "https://esm.sh/remark-gemoji";
export { default as remarkMath } from "https://esm.sh/remark-math";
export { default as remarkJaruby } from "https://esm.sh/remark-jaruby";
export { default as remarkToc } from "https://esm.sh/remark-toc";
export { default as rehypePrism } from "https://esm.sh/@mapbox/rehype-prism";
export { default as remarkRehype } from "https://esm.sh/remark-rehype";
export { default as rehypeKatex } from "https://esm.sh/rehype-katex";
export { default as rehypeDocument } from "https://esm.sh/rehype-document";

// Currently shiki doesn't work: see https://github.com/shikijs/shiki/issues/131
//export * as shiki from "https://esm.sh/shiki";
//export { default as rehypeShiki } from "https://esm.sh/@leafac/rehype-shiki";

export { default as rehypeSlug } from "https://esm.sh/rehype-slug";
export { default as rehypeAutolinkHeadings } from "https://esm.sh/rehype-autolink-headings";
export { default as rehypeStringify } from "https://esm.sh/rehype-stringify";

// remarkMermaid deps
export { fromParse5 } from "https://esm.sh/hast-util-from-parse5";
export { is } from "https://esm.sh/unist-util-is";
export type { Node, Parent } from "https://esm.sh/unist-types";
export type { Code, Paragraph } from "https://cdn.skypack.dev/@types/mdast?dts";
export { default as mermaid } from "https://esm.sh/mermaid";
export { parseFragment } from "https://esm.sh/parse5";
export { optimize } from "https://esm.sh/svgo";
export type { OptimizedSvg, OptimizeOptions } from "https://esm.sh/svgo";
export type { VFileCompatible } from "https://esm.sh/vfile";
export { visit } from "https://esm.sh/unist-util-visit";

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
