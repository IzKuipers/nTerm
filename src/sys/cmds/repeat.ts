import { Command } from "../cmd";
import { userInterface } from "../ui";

export const repeat: Command = {
  execute: async (...argv) => {
    const argvString = argv.join();
    const Regx: RegExpMatchArray | null = argvString.match(/"(.*?)"/);
    let text = "";
    const amnt: number = parseInt(argv[0]);

    if (Regx && Regx.length > 1 && !!amnt) {
      text = Regx[1];

      userInterface.output(`Repeating "${text}" ${amnt} times...\n`);

      for (let i = 0; i < amnt; i++) {
        await userInterface.evaluateCommand(text, true);
      }
    } else {
      userInterface.error("Unable to repeat: syntax invalid!");
    }
  },

  description: "Repeat the specified command a specified amount of times",
  usage: `REPEAT <amount> "<command>"`,
};
