import { Command } from "../cmd";
import { environment } from "../env";
import { userInterface } from "../ui";

export const echo: Command = {
  execute: () => {
    const Regx = environment.val.match(/"(.*?)"/);

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
