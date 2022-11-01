import { Command } from "../cmd";
import { userInterface } from "../ui";
import { variables } from "../vars";

export const env: Command = {
  execute() {
    let keys = variables.keys();

    for (let key of keys) {
      const value = variables.get(key);
      const kyStr = key.padEnd(25, " ");

      if (!value)
        return userInterface.outputColor(
          "[Error]: variable fetch failed.",
          "var(--red)"
        );

      const roStr = value.readonly ? "# " : "  ";

      userInterface.outputColor(
        `${roStr}` + `[${kyStr}]`,
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
