import { userInterface } from "../ui";
import { InternalCommand } from "../icmd";

export const dfault: InternalCommand = {
  execute: () => {
    userInterface.output("Command not recognized");
  },
};
