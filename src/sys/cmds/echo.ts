import { Command } from "../cmd";
import { userInterface } from "../ui";

export const echo: Command = {
  execute: (...argv) => {
    console.log(argv);
    const Regx = argv.join("").match(/"(.*?)"/);

    if (Regx && Regx.length > 1) {
      const text = Regx[1];

      userInterface.output(text);
    } else {
      userInterface.error("Unable to echo: syntax invalid!");
    }
  },

  description: "Echo back the given text",
  usage: `ECHO "<string>"`
};
