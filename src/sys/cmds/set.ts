import { Command } from "../cmd";
import { environment } from "../env";
import { userInterface } from "../ui";
import { Variable, variables } from "../vars";

export const set: Command = {
  execute: () => {
    let name: string = environment.argv[0]!;
    let value: string = environment.val.match(/"(.*?)"/)![1];

    if (variables.has(name) && variables.get(name)?.readonly) {
      userInterface.output(`Cannot set readonly variable "${name}".`);
    } else {
      const variable: Variable = {
        value,
        readonly: false
      }

      variables.set(name, variable);

      userInterface.output(`Variable "${name}" set to "${value}".`);
    }

  },

  description: "Set a variable to a given string",
  usage: `SET <name> "<value>"`
};
