import { environment } from "../env";
import { InternalCommand } from "../icmd";
import { userInterface } from "../ui";

export const intro: InternalCommand = {
  execute: () => {
    userInterface.output(
      `Welcome to ${environment.pName}!\n` +
        `You are running version ${environment.pVer}.\n\n` +
        `${environment.pName} was created by ${environment.vendor}.`
    );
  },
};