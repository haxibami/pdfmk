import { initSatori, initYoga, ReactElement, satori } from "./deps.ts";
import type { Config } from "./types.ts";
import { instantiate } from "./lib/rs_lib.generated.js";
const { svg2pdf } = await instantiate();

export const printSVG = async (html: ReactElement) => {
  const fontData = await fetch(
    new URL("./assets/NotoSansCJKjp-Regular.woff", import.meta.url),
  ).then((res) => res.arrayBuffer());

  const yoga = await initYoga(
    await fetch(new URL("./assets/yoga.wasm", import.meta.url)).then(
      (res) => res.arrayBuffer(),
    ),
  );
  initSatori(yoga);
  const svg = await satori(html, {
    width: 800,
    height: 500,
    fonts: [
      {
        name: "Noto Sans CJK JP",
        data: fontData,
        weight: 700,
        style: "normal",
      },
    ],
    // debug: true,
  }) as string;
  return svg;
};

const printPDF = async (html: ReactElement, config: Config) => {
  const svg = await printSVG(html);
  const pdf = svg2pdf(svg) as Uint8Array;
  Deno.writeFile(config.output, pdf);
};

export default printPDF;
