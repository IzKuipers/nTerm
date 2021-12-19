import { Command } from "../cmd";
import { environment } from "../env";
import { userInterface } from "../ui";

export const clear: Command = {
  execute: () => {
    environment.currentInstance.env.temp.innerHTML = "";
    userInterface.flushTempToBuffer();
    userInterface.syncTarget();
  },

  description: "Clear the screen",
  usage: "CLEAR",
};
