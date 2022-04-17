import { colors, flags, path, puppeteer } from "./deps.ts";
import md2Html from "./parser.ts";
import printPDF from "./print.ts";
import executablePathForChannel from "./chromium.ts";
import type { ChromeReleaseChannel, Config } from "./types.ts";
import { commandName, VERSION } from "./version.ts";

const args = flags.parse(Deno.args, {
  default: {
    format: "a4",
    scale: 1,
    margin: "20mm",
    prismTheme: "default",
    mermaidTheme: "default",
    channel: "chrome",
  },
  string: [
    "_",
    "style",
    "format",
    "margin",
    "prismTheme",
    "mermaidTheme",
    "channel",
  ],
  boolean: ["help"],
  alias: {
    "h": "help",
    "s": "style",
    "f": "format",
    "z": "scale",
    "m": "margin",
    "p": "prismTheme",
    "d": "mermaidTheme",
  },
});

const help = `${commandName} v${VERSION} - Make PDF from markdown

${colors.bold(colors.yellow("Usage:"))}
    ${commandName} ${colors.underline("input")} output [options]
    ${commandName} ${
  colors.underline("input")
} [options] (output defaults to <input>.pdf)
${colors.bold(colors.yellow("Options:"))}
    ${colors.green("-h, --help")}
            Show this help.
    ${colors.green("-s, --style")}
            CSS style file. Default style is in "${
  colors.underline("https://github.com/haxibami/pdfmk/styles.ts")
}"".
    ${colors.green("-f, --format <format>")}
            Paper format. Defaults to "a4".
            Available values: a0, a1, a2, a3, a4, a5, letter, legal, tabloid, ledger.
    ${colors.green("-z, --scale <scale>")}
            Scale factor. Defaults to 1. 0.1 to 2.
    ${colors.green("-m, --margin <margin>")}
            Page margin. Defaults to 20mm.
    ${colors.green("-p, --prismTheme <theme>")}
            Prism theme. Defaults to "default".
            44 themes are available.
            See "${colors.underline("https://prismjs.com/themes")}" &
            "${
  colors.underline("https://github.com/PrismJS/prism-themes")
}" for all values.
    ${colors.green("-d, --mermaidTheme <theme>")}
            Mermaid theme. Defaults to "default".
            Available values: base, default, forest, dark, neutral.
    ${colors.green("--channel <channel>")}
            Chromium channel. Defaults to "chrome".
            Available values: "chrome", "chrome-beta", "chrome-canary", "chrome-dev".
    `;

if (args.help) {
  console.log(help);
  Deno.exit(0);
}

if (!args._[0]) {
  console.error(
    `${colors.bold(colors.red("Error:"))} Specify input markdown file.`,
  );
  Deno.exit(1);
}

const mdpath = args._[0].toString();
const givenScale = Number(args.scale) ?? 1;
const scale = givenScale >= 0.1 && givenScale <= 2 ? givenScale : 1;

// file checks
if (
  !Deno.statSync(mdpath).isFile ||
  !mdpath.endsWith(".md")
) {
  console.error(
    `${
      colors.bold(colors.red("Error:"))
    } Input file does not have valid extension.`,
  );
  Deno.exit(1);
}

if (args.style) {
  if (!Deno.statSync(args.style).isFile) {
    console.error(
      `${colors.bold(colors.red("Error:"))} Style file does not exist.`,
    );
    Deno.exit(1);
  }
}

const DEFAULT_CONFIG: Config = {
  input: mdpath,
  output: args._[1] ? path.resolve(args._[1].toString()) : path.join(
    path.dirname(mdpath),
    path.basename(mdpath, ".md") + ".pdf",
  ),
  style: args.style,
  format: args.format.toLowerCase(),
  scale: scale,
  margin: args.margin,
  prismTheme: args.prismTheme,
  mermaidTheme: args.mermaidTheme,
  chromePath: executablePathForChannel(args.channel as ChromeReleaseChannel),
};

const fileConfig: Partial<Config> = {};

const config = Object.assign(DEFAULT_CONFIG, fileConfig);

const md = await Deno.readTextFile(config.input);

const browser = await puppeteer.launch({
  executablePath: config.chromePath,
  headless: true,
});

const html = await md2Html(md, config, browser);

await printPDF(html, config, browser);

await browser.close();
