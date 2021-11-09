import { Command, commands } from "../cmd";
import { environment } from "../env";
import { userInterface } from "../ui";

export const help: Command = {
  execute: () => {
    if (environment.argv.length > 0) {
      let argv: string[] = environment.argv;
      let requestedCommand: string = argv.join(" ").toLowerCase();

      if (commands.has(requestedCommand)) {
        userInterface.output("");
        userInterface.outputColor(`[Usage]: `,`var(--blue)`,false);
        userInterface.output(`${commands.get(requestedCommand)?.usage}`);
        userInterface.outputColor(`\n[Description]: ${commands.get(requestedCommand)?.description}`,`var(--blue)`);
      } else {
        userInterface.outputColor(`[Error]: Cannot find command "${requestedCommand}"`);
      }
    } else {
      let cmdList = commands.entries();

      for (let i of cmdList) {
        userInterface.outputColor(`[${i[0].toUpperCase().padEnd(10, " ")}]${i[1].description}`,`var(--blue)`);
      }
    }
  },

  description: "Display a list of built-in commands",
  usage: "HELP [command]"
};
