import { userInterface } from "../ui";
import { CoreFunction } from "../cf";
import { kernel } from "../../kernel";
import { environment } from "../env";

export const dfault: CoreFunction = {
  execute: () => {
    kernel.log("Start Core Function 'default'");

    userInterface.error(``,false);

    userInterface.output(`${environment.cmd}: command not found`);

  },
};
