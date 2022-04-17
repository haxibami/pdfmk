import {
  Browser,
  rehypeAutolinkHeadings,
  rehypeDocument,
  rehypeKatex,
  rehypePrism,
  //rehypeShiki,
  rehypeSlug,
  rehypeStringify,
  remarkGemoji,
  remarkGfm,
  remarkJaruby,
  remarkMath,
  remarkParse,
  remarkRehype,
  remarkToc,
  //shiki,
  unified,
} from "./deps.ts";
import remarkMermaid from "./mermaid.ts";
import { isBaseTheme } from "./types.ts";
import type { Config } from "./types.ts";

const md2Html = async (md: string, config: Config, browser: Browser) => {
  // cdn resolution: there are two repos providing themes
  const themeFileURL = config.prismTheme === "default"
    ? `https://cdn.skypack.dev/prismjs/themes/prism.css`
    : isBaseTheme(config.prismTheme)
    ? `https://cdn.skypack.dev/prismjs/themes/${config.prismTheme}.css`
    : `https://cdn.skypack.dev/prism-themes/themes/prism-${config.prismTheme}.css`;

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkGemoji)
    .use(remarkMath)
    .use(remarkJaruby)
    .use(remarkToc, {
      heading: "目次",
      tight: true,
    })
    .use(remarkMermaid, {
      browser: browser,
      launchOptions: {
        executablePath: config.chromePath,
      },
      wrap: true,
      theme: config.mermaidTheme,
      classname: ["mermaid"],
    })
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypePrism)
    //.use(rehypeShiki, {
    //  highlighter: await shiki.getHighlighter({ theme: "nord" }),
    //})
    .use(rehypeDocument, {
      css: [
        "https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css",
        themeFileURL,
      ],
    })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeStringify)
    .freeze();
  const result = await processor.process(md);
  return result.toString();
};

export default md2Html;
