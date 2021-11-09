import { userInterface } from "../ui";
import { CoreFunction } from "../kf";
import { kernel } from "../../kernel";
import { environment } from "../env";

export const dfault: CoreFunction = {
  execute: () => {
    kernel.log("Start Core Function 'default'");

    userInterface.outputColor(`[Error]:`, `var(--red)`, false);

    userInterface.output(` ${environment.cmd}: command not found`);

  },
};
