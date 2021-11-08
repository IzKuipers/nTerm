import { environment } from "../env";
import { CoreFunction } from "../kf";
import { userInterface } from "../ui";

export const intro: CoreFunction = {
  execute: () => {
    userInterface.output(
      `Welcome to ${environment.pName}!\n` +
        `You are running version ${environment.pVer}.\n\n` +
        `${environment.pName} was created by ${environment.vendor}.`
    );
  },
};