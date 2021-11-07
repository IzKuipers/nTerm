import { environment } from "../env";
import { InternalCommand } from "../icmd";
import { userInterface } from "../ui";

export const intro: InternalCommand = {
  execute: () => {
    userInterface.output(
      `Welcome to ${environment.productName}!\n` +
        `You are running version ${environment.productVersion}.\n\n` +
        `${environment.productName} was created by ${environment.vendorName}.`
    );
  },
};