import { Command } from "../cmd";
import { environment } from "../env";
import { userInterface } from "../ui";

export const echo: Command = {
  execute: () => {
    let Regx = environment.val.match(/"(.*?)"/)!;

    if (Regx && Regx.length > 1) {
      let text = Regx[1];

      userInterface.output(text);
    } else {
      userInterface.output("Unable to echo: syntax invalid!");
    }
  },

  description: "Echo back the given text",
  usage: `ECHO "<string>"`
};
