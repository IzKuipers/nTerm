import { Command, commands } from "../cmd";
import { environment } from "../env";
import { userInterface } from "../ui";

export const help: Command = {
  execute: () => {
    if (environment.argv.length > 0) {
      let argv: string[] = environment.argv;
      let requestedCommand: string = argv.join(" ").toLowerCase();

      if (commands.has(requestedCommand)) {
        userInterface.output(
          `\nUsage: ${commands.get(requestedCommand)?.usage}\n\nDescription:\n${commands.get(requestedCommand)?.description}`
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
  usage: "HELP [command]"
};
