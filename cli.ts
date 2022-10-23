import { colors, Command, path } from "./deps.ts";
import { md2jsx } from "./parser.ts";
import printPDF from "./print.ts";
// import executablePathForChannel from "./chromium.ts";
import type { Config } from "./types.ts";
import { mermaidTheme, paperFormat, prismTheme } from "./types.ts";
import { commandName, VERSION } from "./version.ts";

const { args, options } = await new Command()
  .name(commandName)
  .version(VERSION)
  .description("Generate PDF from Markdown file")
  .help({
    hints: false,
  })
  .arguments("<input:string:file> [output:string:file]")
  .type("paperFormat", paperFormat)
  .type("prismTheme", prismTheme)
  .type("mermaidTheme", mermaidTheme)
  .option("-s, --style <stylesheet>", "Path to CSS stylesheet.")
  .option(
    "--tocHeading <section>",
    `TOC section heading. (Default: "TOC")`,
    {
      default: "目次",
    },
  )
  .option(
    "-f, --format <format:paperFormat>",
    `Paper format. (Default: letter)\n  ${
      colors.green('"a0" - "a5", "letter", "legal", "tabloid"')
    }`,
    {
      default: "a4" as const,
    },
  )
  .option(
    "-z, --zoom <scale:number>",
    `Zoom level. (Default: 1)\n  ${colors.green('"0.1" - "2"')}`,
    {
      default: 1,
    },
  )
  .action(({ zoom }) => {
    if (zoom < 0.1 || zoom > 2) {
      throw new Error("Zoom must be a number between 0.1 and 2");
    }
  })
  .option(
    "-m, --margin <margin>",
    `Margin. (Default: "20mm")`,
    {
      default: "20mm",
    },
  )
  .option(
    "-p, --prismTheme <theme:prismTheme>",
    "Prism theme. 44 themes available.",
    {
      default: "default" as const,
    },
  )
  .option(
    "-d, --mermaidTheme <theme:mermaidTheme>",
    "Mermaid theme. 5 themes available.",
    {
      default: "default" as const,
    },
  )
  .option("--channel <channel:channel>", "(dev) Chrome release channel.", {
    default: "chrome" as const,
  })
  .parse(Deno.args);

const inputPath = path.resolve(Deno.cwd(), args[0]);

const config: Config = {
  input: inputPath,
  output: args[1]
    ? path.resolve(Deno.cwd(), args[1])
    : inputPath.replace(/\.md$/, ".pdf"),
  style: options.style,
  tocHeading: options.tocHeading,
  format: options.format,
  scale: options.zoom,
  margin: options.margin,
  prismTheme: options.prismTheme,
  mermaidTheme: options.mermaidTheme,
};

const md = await Deno.readTextFile(config.input);

await printPDF(await md2jsx(md), config);
