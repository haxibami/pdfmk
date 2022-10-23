import type {
  // BrowserConnectOptions,
  // ChromeArgOptions,
  // LaunchOptions,
  // Product,
} from "./deps.ts";

import { EnumType } from "./deps.ts";

export interface Config {
  input: string;
  output: string;
  style?: string;
  tocHeading: string;
  format: PaperFormat;
  scale: number;
  margin: string;
  prismTheme: PrismTheme;
  mermaidTheme: MermaidTheme;
  // chromePath: string;
}

const PaperFormat = {
  A5: "a5",
  A4: "a4",
  A3: "a3",
  A2: "a2",
  A1: "a1",
  A0: "a0",
  Letter: "letter",
  Legal: "legal",
  Tabloid: "tabloid",
} as const;

export type PaperFormat = typeof PaperFormat[keyof typeof PaperFormat];

export const paperFormat = new EnumType(PaperFormat);

const PrismThemeBase = {
  "coy": "coy",
  "dark": "dark",
  "funky": "funky",
  "okaidia": "okaidia",
  "solarizedlight": "solarizedlight",
  "tomorrow": "tomorrow",
  "twilight": "twilight",
} as const;

type PrismThemeBase = typeof PrismThemeBase[keyof typeof PrismThemeBase];

const PrismThemePlus = {
  "a11y-dark": "a11y-dark",
  "atom-dark": "atom-dark",
  "base16-ateliersulphurpool.light": "base16-ateliersulphurpool.light",
  "cb": "cb",
  "coldark-cold": "coldark-cold",
  "coldark-dark": "coldark-dark",
  "coy-without-shadows": "coy-without-shadows",
  "darcula": "darcula",
  "dracula": "dracula",
  "duotone-dark": "duotone-dark",
  "duotone-earth": "duotone-earth",
  "duotone-forest": "duotone-forest",
  "duotone-light": "duotone-light",
  "duotone-sea": "duotone-sea",
  "duotone-space": "duotone-space",
  "ghcolors": "ghcolors",
  "gruvbox-dark": "gruvbox-dark",
  "gruvbox-light": "gruvbox-light",
  "holi-theme": "holi-theme",
  "hopscotch": "hopscotch",
  "lucario": "lucario",
  "material-dark": "material-dark",
  "material-light": "material-light",
  "material-oceanic": "material-oceanic",
  "night-owl": "night-owl",
  "nord": "nord",
  "one-dark": "one-dark",
  "one-light": "one-light",
  "pojoaque": "pojoaque",
  "shades-of-purple": "shades-of-purple",
  "solarized-dark-atom": "solarized-dark-atom",
  "synthwave84": "synthwave84",
  "vs": "vs",
  "vsc-dark-plus": "vsc-dark-plus",
  "xonokai": "xonokai",
  "z-touch": "z-touch",
} as const;

type PrismThemePlus = typeof PrismThemePlus[keyof typeof PrismThemePlus];

const PrismTheme = {
  "default": "default",
  ...PrismThemeBase,
  ...PrismThemePlus,
} as const;

//export type PrismTheme = "default" | PrismThemeBase | PrismThemePlus;
export type PrismTheme = typeof PrismTheme[keyof typeof PrismTheme];

export const prismTheme = new EnumType(PrismTheme);

// Mermaid theme
export const MermaidTheme = {
  Base: "base",
  Forest: "forest",
  Dark: "dark",
  Default: "default",
  Neutral: "neutral",
} as const;

export type MermaidTheme = typeof MermaidTheme[keyof typeof MermaidTheme];

export const mermaidTheme = new EnumType(MermaidTheme);

// puppeteer options
// const ChromeReleaseChannel = {
//   chrome: "chrome",
//   chromeBeta: "chrome-beta",
//   canary: "chrome-canary",
//   dev: "chrome-dev",
// } as const;
//
// export type ChromeReleaseChannel =
//   typeof ChromeReleaseChannel[keyof typeof ChromeReleaseChannel];
//
// export const channel = new EnumType(ChromeReleaseChannel);
//
// export type PuppeteerLaunchOptions =
//   & LaunchOptions
//   & ChromeArgOptions
//   & BrowserConnectOptions
//   & {
//     product?: Product;
//   };

export function isBaseTheme(theme: PrismTheme): theme is PrismThemeBase {
  return Object.values(PrismThemeBase).includes(theme as PrismThemeBase);
}

export function isPlusTheme(theme: PrismTheme): theme is PrismThemePlus {
  return Object.values(PrismThemePlus).includes(theme as PrismThemePlus);
}
