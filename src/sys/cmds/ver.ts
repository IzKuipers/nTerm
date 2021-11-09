import { Command } from "../cmd";
import { environment } from "../env";
import { userInterface } from "../ui";

export const ver: Command = {
  execute: () => {
    userInterface.output(`${environment.pName} version ${environment.pVer}. Created by ${environment.vendor}`)
  },

  description: "Display the version information",
  usage: "VER"
};
