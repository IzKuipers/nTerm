import { Command } from "../cmd";
import { environment } from "../env";

export const clear: Command = {
  execute: () => {
    environment.displayOutput.innerText = "";
  },

  description: "Clear the screen",
};
