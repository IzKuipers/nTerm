import { Command, commands } from "../cmd";
import { userInterface } from "../ui";

export const help: Command = {
  execute: (...argv) => {
    const commandName = argv[0];
    if (commandName) {
      const requestedCommand: string = commandName;

      if (commands.has(requestedCommand)) {
        userInterface.output("");
        userInterface.outputColor(`[Usage]: `, `var(--blue)`, false);
        userInterface.output(`${commands.get(requestedCommand)?.usage}`);
        userInterface.outputColor(
          `\n[Description]: ${commands.get(requestedCommand)?.description}`,
          `var(--blue)`
        );
      } else {
        userInterface.error(`Cannot find command "${requestedCommand}"`);
      }
    } else {
      const cmdList = commands.entries();
      let commandList = [];

      for (const cmd of cmdList) {
        commandList.push(cmd[0]);
      }

      commandList = commandList.sort();

      for (let index in commandList) {
        let cmd: Command = commands.get(commandList[index])!;

        userInterface.outputColor(
          `[${commandList[index].toUpperCase().padEnd(10, " ")}]${
            cmd?.description
          }`,
          `var(--blue)`
        );
      }
    }
  },

  description: "Display a list of built-in commands",
  usage: "HELP [command]",
};
