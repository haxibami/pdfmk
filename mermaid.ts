import {
  Browser,
  Code,
  fromParse5,
  is,
  mermaid,
  Node,
  optimize,
  OptimizedSvg,
  OptimizeOptions,
  Page,
  Paragraph,
  Parent,
  parseFragment,
  Plugin,
  puppeteer,
  Transformer,
  VFileCompatible,
  visit,
} from "./deps.ts";

import type { MermaidTheme, PuppeteerLaunchOptions } from "./types.ts";

function isObject(target: unknown): target is { [key: string]: unknown } {
  return typeof target === "object" && target !== null;
}

// https://github.com/syntax-tree/unist#parent
export function isParent(node: unknown): node is Parent {
  return isObject(node) && Array.isArray(node.children);
}
enum Theme {
  Base = "base",
  Forest = "forest",
  Dark = "dark",
  Default = "default",
  Neutral = "neutral",
}

export const defaultSVGOOptions: OptimizeOptions = {
  js2svg: {
    indent: 2,
    pretty: true,
  },
  multipass: false,
  plugins: [
    { name: "addAttributesToSVGElement", active: false },
    { name: "addClassesToSVGElement", active: false },
    { name: "cleanupAttrs", active: true },
    { name: "cleanupEnableBackground", active: false },
    { name: "cleanupListOfValues", active: false },
    { name: "cleanupNumericValues", active: true },
    { name: "convertColors", active: true },
    { name: "convertEllipseToCircle", active: true },
    { name: "convertPathData", active: true },
    { name: "convertShapeToPath", active: false },
    { name: "convertTransform", active: true },
    { name: "minifyStyles", active: true },
    { name: "inlineStyles", active: true, params: { onlyMatchedOnce: false } },
    { name: "convertStyleToAttrs", active: true },
    { name: "mergePaths", active: true },
    { name: "moveElemsAttrsToGroup", active: false },
    { name: "moveGroupAttrsToElems", active: false },
    { name: "prefixIds", active: false },
    { name: "removeAttributesBySelector", active: false },
    { name: "removeComments", active: true },
    { name: "removeDesc", active: true },
    { name: "removeDimensions", active: false },
    { name: "removeDoctype", active: true },
    { name: "removeEditorsNSData", active: true },
    { name: "removeElementsByAttr", active: false },
    { name: "removeEmptyAttrs", active: false },
    { name: "removeEmptyContainers", active: true },
    { name: "removeEmptyText", active: true },
    { name: "removeHiddenElems", active: true },
    { name: "removeMetadata", active: true },
    { name: "removeNonInheritableGroupAttrs", active: true },
    { name: "removeOffCanvasPaths", active: true },
    { name: "removeRasterImages", active: true },
    { name: "removeScriptElement", active: true },
    { name: "removeStyleElement", active: true },
    { name: "removeTitle", active: true },
    { name: "removeUnknownsAndDefaults", active: true },
    { name: "removeUnusedNS", active: true },
    { name: "removeUselessDefs", active: true },
    {
      name: "removeUselessStrokeAndFill",
      active: true,
      params: { removeNone: true },
    },
    { name: "removeViewBox", active: true },
    { name: "removeXMLNS", active: true },
    { name: "removeXMLProcInst", active: true },
    { name: "reusePaths", active: true },
    { name: "removeAttrs", active: true, params: { attrs: ["class"] } },
    { name: "cleanupIDs", active: true },
    { name: "sortAttrs", active: true },
    { name: "sortDefsChildren", active: true },
    { name: "collapseGroups", active: true },
  ],
};

export interface RemarkMermaidOptions {
  /**
   * If you have already launched a browser, you can pass it here.
   *
   * @default {}
   */
  browser?: Browser;
  /**
   * Launch options to pass to puppeteer.
   *
   * @default {}
   */
  launchOptions?: PuppeteerLaunchOptions;

  /**
   * SVGO options used to minify the SVO output.
   *
   * Set to `null` explicitly to disable this.
   *
   * @default defaultSVGOOptions
   */
  svgo?: OptimizeOptions;

  /**
   * The Mermaid theme to use.
   *
   * @default 'default'
   */
  theme?: MermaidTheme;

  /**
   * Whether to wrap svg with <div> element.
   *
   * @default "false"
   */
  wrap?: boolean;

  /**
   * When wrapping with <div>, you can choose what classname to add.
   * @default []
   */
  classname?: string[];
}

function isMermaid(node: unknown): node is Code {
  if (!is(node, { type: "code", lang: "mermaid" })) {
    return false;
  }
  return true;
}

function isOptimized(arg: unknown): arg is OptimizedSvg {
  return (
    typeof arg === "object" &&
    arg !== null &&
    typeof (arg as OptimizedSvg).data === "string"
  );
}

const remarkMermaid: Plugin<[RemarkMermaidOptions?]> = function mermaidTrans(
  options,
): Transformer {
  const DEFAULT_SETTINGS = {
    launchOptions: {
      product: "chrome",
      headless: true,
    },
    svgo: defaultSVGOOptions,
    theme: "default",
    wrap: false,
    classname: [],
  };

  const settings = Object.assign(
    DEFAULT_SETTINGS,
    options,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (node: Node, _file: VFileCompatible) => {
    const promises: (() => Promise<void>)[] = [];
    const browser = settings.browser ||
      await puppeteer.launch(settings.launchOptions);
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 3000 });
    const html = `<!DOCTYPE html>`;
    await page.setContent(html);
    await page.addScriptTag({
      url: "https://unpkg.com/mermaid/dist/mermaid.min.js",
    });
    visit(node, isMermaid, visitor);
    await Promise.all(promises.map((t) => t()));
    if (!settings.browser) {
      await browser.close();
    }

    function visitor(node: Code, index: number, parent: Parent | undefined) {
      if (!isParent(parent)) {
        return;
      }
      promises.push(async () => {
        const svg = await getSvg(node, page, settings.theme, settings.svgo);
        if (settings.wrap) {
          parent.children[index] = {
            type: "parent",
            children: [],
            data: {
              hChildren: [
                {
                  type: "element",
                  children: [fromParse5(parseFragment(svg))],
                  tagName: "div",
                  properties: {
                    className: settings.classname,
                  },
                },
              ],
            },
          } as Parent;
        } else {
          parent.children[index] = {
            type: "paragraph",
            children: [],
            data: {
              hChildren: [fromParse5(parseFragment(svg))],
            },
          } as Paragraph;
        }
      });
      return true;
    }
  };
};

async function getSvg(
  node: Code,
  page: Page,
  theme: MermaidTheme,
  svgo: OptimizeOptions,
) {
  const graph = await page.evaluate(
    ([code, t]: [string, MermaidTheme]) => {
      const id = "a";
      mermaid.initialize({ theme: t as Theme });
      // @ts-ignore: code evaluated in browser
      const div = document.createElement("div");
      div.innerHTML = mermaid.render(id, code);
      return div.innerHTML;
    },
    [node.value, theme],
  );

  let value = graph;

  if (svgo) {
    const tmp = optimize(graph, svgo);
    value = isOptimized(tmp) ? tmp.data : graph;
  }
  return value;
}

export default remarkMermaid;
