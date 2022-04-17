import { Browser } from "./deps.ts";
import { style } from "./styles.ts";
import type { Config } from "./types.ts";

const printPDF = async (html: string, config: Config, browser: Browser) => {
  const page = await browser.newPage();
  await page.setContent(html);

  // User CSS
  await page.addStyleTag({
    content: config.style ? await Deno.readTextFile(config.style) : style,
  });

  await page.waitForTimeout(500);

  await page.pdf({
    printBackground: true,
    path: config.output,
    margin: {
      top: config.margin,
      right: config.margin,
      bottom: config.margin,
      left: config.margin,
    },
    format: config.format,
    scale: config.scale,
  });
  await page.close();
};

export default printPDF;
