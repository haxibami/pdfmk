import {
  createElement,
  CSSProperties,
  Fragment,
  // Browser,
  path,
  ReactElement,
  rehypeAutolinkHeadings,
  rehypeDocument,
  rehypeKatex,
  rehypePrism,
  rehypeReact,
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
import React from "https://esm.sh/react@18.2.0";
// import remarkMermaid from "./mermaid.ts";
import { isBaseTheme } from "./types.ts";
import type { Config } from "./types.ts";
import { defaultStyle } from "./styles.ts";

export const md2jsx = async (md: string) => {
  // cdn resolution: there are two repos providing prism themes
  //   const themeFileURL = config.prismTheme === "default"
  //     ? `https://cdn.skypack.dev/prismjs/themes/prism.css`
  //     : isBaseTheme(config.prismTheme)
  //     ? `https://cdn.skypack.dev/prismjs/themes/${config.prismTheme}.css`
  //     : `https://cdn.skypack.dev/prism-themes/themes/prism-${config.prismTheme}.css`;

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    // .use(remarkGemoji)
    // .use(remarkMath)
    // .use(remarkJaruby)
    //     .use(remarkToc, {
    //       heading: config.tocHeading,
    //       tight: true,
    //     })
    // currently there is no way to use mermaid without a browser
    //     .use(remarkMermaid, {
    //       browser: browser,
    //       launchOptions: {
    //         executablePath: config.chromePath,
    //       },
    //       wrap: true,
    //       theme: config.mermaidTheme,
    //       classname: ["mermaid"],
    //     })
    .use(remarkRehype)
    // .use(rehypeKatex)
    // .use(rehypePrism)
    //.use(rehypeShiki, {
    //  highlighter: await shiki.getHighlighter({ theme: "nord" }),
    //})
    //     .use(rehypeDocument, {
    //       // since <link rel...> section is inserted before <style> section,
    //       // we can override default styles with given css in this way.
    //       link: [
    //         {
    //           rel: "stylesheet",
    //           href: "https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css",
    //           type: "text/css",
    //         },
    //         {
    //           rel: "stylesheet",
    //           href: themeFileURL,
    //           type: "text/css",
    //         },
    //       ],
    //       style: config.style
    //         ? await Deno.readTextFile(path.resolve(Deno.cwd(), config.style))
    //         : defaultStyle,
    //     })
    .use(rehypeSlug)
    // .use(rehypeAutolinkHeadings)
    // .use(rehypeStringify)
    // @ts-ignore processor argument type error
    .use(rehypeReact, {
      createElement: createElement,
    })
    .freeze();

  const jsx = (await processor.process(md)).result as ReactElement;

  // satori needs 'display: flex' for <div> element
  const rootStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    fontSize: "32px",
    margin: "5%",
  };

  jsx.props.style = { ...rootStyle, ...jsx.props.style };

  return jsx;
};
