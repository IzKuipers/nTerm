import { userInterface } from "../ui";
import { CoreFunction } from "../kf";
import { kernel } from "../../kernel";

export const dfault: CoreFunction = {
  execute: () => {
    kernel.log("Start Core Function 'default'");
    
    userInterface.output("Command not recognized");
  },
};
