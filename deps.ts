// cli deps
export {
  Command,
  EnumType,
} from "https://deno.land/x/cliffy@v0.25.2/command/mod.ts";
export * as path from "https://deno.land/std@0.160.0/path/mod.ts";
export { colors } from "https://deno.land/x/cliffy@v0.25.2/ansi/colors.ts";
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
export { default as rehypeParse } from "https://esm.sh/rehype-parse@8.0.4";
export { default as rehypePrism } from "https://esm.sh/@mapbox/rehype-prism@0.8.0";
export { default as remarkRehype } from "https://esm.sh/remark-rehype@10.1.0";
export { default as rehypeKatex } from "https://esm.sh/rehype-katex@6.0.2";
export { default as rehypeDocument } from "https://esm.sh/rehype-document@6.0.1";
export { default as rehypeReact } from "https://esm.sh/rehype-react@7.1.1";

// Currently shiki doesn't work: see https://github.com/shikijs/shiki/issues/131
//export * as shiki from "https://esm.sh/shiki";
//export { default as rehypeShiki } from "https://esm.sh/@leafac/rehype-shiki";

export { default as rehypeSlug } from "https://esm.sh/rehype-slug@5.0.1";
export { default as rehypeAutolinkHeadings } from "https://esm.sh/rehype-autolink-headings@6.1.1";
export { default as rehypeStringify } from "https://esm.sh/rehype-stringify@9.0.3";

// remarkMermaid deps
export { is } from "https://esm.sh/unist-util-is@5.1.1";
export type {
  Node,
  Parent,
} from "https://cdn.skypack.dev/@types/unist@2.0.6?dts";
export type {
  Code,
  Paragraph,
} from "https://cdn.skypack.dev/@types/mdast@3.0.10?dts";
// export { default as mermaid } from "https://esm.sh/mermaid@9.1.3";
// export { optimize } from "https://esm.sh/svgo@2.8.0";
// export type { OptimizedSvg, OptimizeOptions } from "https://esm.sh/svgo@2.8.0";
// this causes resolution error
// export type { VFileCompatible } from "https://esm.sh/vfile@5.3.5";
export { visit } from "https://esm.sh/unist-util-visit@4.1.1";

// puppeteer deps
// export { default as puppeteer } from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
// export type {
//   Browser,
//   BrowserConnectOptions,
//   ChromeArgOptions,
//   LaunchOptions,
//   Page,
//   Product,
// } from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

// satori deps
import satori, { init as initSatori } from "https://esm.sh/satori@0.0.43/wasm";
export { initSatori, satori };
import initYoga from "https://esm.sh/yoga-wasm-web@0.1.2";
export { initYoga };
export { createElement, Fragment } from "https://esm.sh/react@18.2.0";
export type { CSSProperties, ReactElement } from "https://esm.sh/react@18.2.0";
