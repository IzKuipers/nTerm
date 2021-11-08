import { userInterface } from "../ui";
import { CoreFunction } from "../kf";

export const dfault: CoreFunction = {
  execute: () => {
    userInterface.output("Command not recognized");
  },
};
