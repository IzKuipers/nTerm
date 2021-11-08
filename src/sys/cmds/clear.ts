import { Command } from "../cmd";
import { environment } from "../env";

export const clear: Command = {
  execute: () => {
    environment.dispOut.innerText = "";
  },

  description: "Clear the screen",
};
