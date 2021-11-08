import { Command, commands } from "../cmd";
import { environment } from "../env";
import { userInterface } from "../ui";

export const help: Command = {
  execute: () => {
    if (environment.argv.length > 0) {
      let requestedCommand: string = "";
      let argv: string[] = environment.argv;

      for (let i = 0; i < argv.length; i++) {
        requestedCommand += argv[i];
      }

      if (commands.has(requestedCommand)) {
        userInterface.output(
          `${requestedCommand.toUpperCase().padEnd(10, " ")}${commands.get(requestedCommand)?.description
          }`
        );
      } else {
        userInterface.output(`Cannot find command "${requestedCommand}"`);
      }
    } else {
      let cmdList = commands.entries();

      for (let i of cmdList) {
        userInterface.output(`${i[0].toUpperCase().padEnd(10, " ")}${i[1].description}`);
      }
    }
  },

  description: "Display a list of built-in commands",
};
