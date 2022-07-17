import { os } from "./deps.ts";
import type { ChromeReleaseChannel } from "./types.ts";

const executablePathForChannel = (channel: ChromeReleaseChannel): string => {
  const platform = os.platform();

  let chromePath: string | undefined;
  switch (platform) {
    case "windows":
      switch (channel) {
        case "chrome":
          chromePath = `${
            Deno.env.get("PROGRAMFILES")
          }\\Google\\Chrome\\Application\\chrome.exe`;
          break;
        case "chrome-beta":
          chromePath = `${
            Deno.env.get("PROGRAMFILES")
          }\\Google\\Chrome Beta\\Application\\chrome.exe`;
          break;
        case "chrome-canary":
          chromePath = `${
            Deno.env.get("PROGRAMFILES")
          }\\Google\\Chrome SxS\\Application\\chrome.exe`;
          break;
        case "chrome-dev":
          chromePath = `${
            Deno.env.get("PROGRAMFILES")
          }\\Google\\Chrome Dev\\Application\\chrome.exe`;
          break;
      }
      break;
    case "darwin":
      switch (channel) {
        case "chrome":
          chromePath =
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
          break;
        case "chrome-beta":
          chromePath =
            "/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome Beta";
          break;
        case "chrome-canary":
          chromePath =
            "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary";
          break;
        case "chrome-dev":
          chromePath =
            "/Applications/Google Chrome Dev.app/Contents/MacOS/Google Chrome Dev";
          break;
      }
      break;
    case "linux":
      switch (channel) {
        case "chrome":
          chromePath = "/opt/google/chrome/chrome";
          break;
        case "chrome-beta":
          chromePath = "/opt/google/chrome-beta/chrome";
          break;
        case "chrome-dev":
          chromePath = "/opt/google/chrome-unstable/chrome";
          break;
      }
      break;
  }

  if (Deno.env.get("CHROME_PATH")) {
    chromePath = Deno.env.get("CHROME_PATH");
  }

  if (!chromePath) {
    throw new Error(
      `Unable to detect browser executable path for '${channel}' on ${platform}.`,
    );
  }

  // Check if Chrome exists.
  try {
    Deno.statSync(chromePath).isFile;
  } catch (_error) {
    throw new Error(
      `Could not find Google Chrome executable for channel '${channel}' at '${chromePath}'.`,
    );
  }

  return chromePath;
};

export default executablePathForChannel;
