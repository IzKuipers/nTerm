import { Command, commands } from "../cmd";
import { environment } from "../env";
import { userInterface } from "../ui";

export const help: Command = {
  execute: () => {
    if (environment.argv.length > 0) {
      const argv: string[] = environment.argv;
      const requestedCommand: string = argv.join(" ").toLowerCase();

      if (commands.has(requestedCommand)) {
        userInterface.output("");
        userInterface.outputColor(`[Usage]: `,`var(--blue)`,false);
        userInterface.output(`${commands.get(requestedCommand)?.usage}`);
        userInterface.outputColor(`\n[Description]: ${commands.get(requestedCommand)?.description}`,`var(--blue)`);
      } else {
        userInterface.error(`Cannot find command "${requestedCommand}"`);
      }
    } else {
      const cmdList = commands.entries();

      for (const cmd of cmdList) {
        userInterface.outputColor(`[${cmd[0].toUpperCase().padEnd(10, " ")}]${cmd[1].description}`,`var(--blue)`);
      }
    }
  },

  description: "Display a list of built-in commands",
  usage: "HELP [command]"
};
