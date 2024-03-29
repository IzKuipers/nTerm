import { Command } from "../cmd";
import { environment } from "../env";
import { userInterface } from "../ui";
import { utilities } from "../util";
import { Variable, variables } from "../vars";

export const set: Command = {
  execute: (...argv) => {
    if (argv.length > 1) {
      const name: string = argv[0];
      const value: string | undefined = utilities.resetHTMLChars(
        environment.currentInstance.env.val!.match(/"(.*?)"/)?.[1] || ""
      );

      if (variables.has(name) && variables.get(name)?.readonly && value) {
        userInterface.error(``, false);
        userInterface.output(`Cannot set readonly variable "${name}".`);
      } else {
        const variable: Variable = {
          value: utilities.resetHTMLChars(value || ""),
          readonly: false,
        };

        variables.set(name, variable);

        userInterface.outputColor(
          `Variable [${name}] set to [${value}].`,
          `var(--blue)`
        );
      }
    } else {
      userInterface.error(`missing arguments: type "HELP SET" for usage`);
    }
  },

  description: "Set a variable to a given string",
  usage: `SET <name> "<value>"`,
};
