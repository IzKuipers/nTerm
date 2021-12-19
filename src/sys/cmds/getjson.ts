import { Command } from "../cmd";
import { userInterface } from "../ui";
import { utilities } from "../util";

export const getjson: Command = {
  execute: async (argv) => {
    const Regx = argv.match(/"(.*?)"/);

    if (Regx && Regx.length > 1) {
      const text = Regx[1];

      const json = await utilities.fetchJSON(text);
      for (const key in json) {
        userInterface.outputColor(
          `[  ${key.padEnd(40, " ")}]: ${json[key]}`,
          `var(--yellow)`
        );
      }
    } else {
      userInterface.error("Unable to echo: syntax invalid!");
    }
  },
  description: "Fetch the JSON data of a page.",
  usage: `GETJSON "<url>"`,
};
