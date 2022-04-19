import { Browser } from "./deps.ts";
import type { Config } from "./types.ts";

const printPDF = async (html: string, config: Config, browser: Browser) => {
  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: "networkidle2",
  });

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
