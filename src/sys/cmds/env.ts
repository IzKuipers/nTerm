import { Command } from "../cmd";
import { userInterface } from "../ui";
import { variables } from "../vars";

export const env: Command = {
  execute: () => {
    let keys = variables.keys();

    for (let key of keys) {
      userInterface.outputColor(
        `${variables.get(key)?.readonly ? "# " : "  "}` +
          `[${key.padEnd(25, " ")}]`,
        `var(--blue)`,
        false
      );

      userInterface.output(
        `: ${variables.get(key)?.value.replace(/\n/g, "\\n")}`
      );
    }
  },

  description: "Display a list of all environment variables",
  usage: "ENV",
};
