import { kernel } from "../../kernel";
import { environment } from "../env";
import { CoreFunction } from "../kf";
import { userInterface } from "../ui";

export const intro: CoreFunction = {
  execute: () => {
    kernel.log("Start Core Function 'intro'");

    userInterface.outputColor(`[█] Welcome to [${environment.pName}]!`, 'var(--purple)');
    userInterface.outputColor("[█]", 'var(--blue)');
    userInterface.outputColor(`[█] You are currently running build [${environment.pVer}].`, 'var(--aqua)');
    userInterface.outputColor("[█]", 'var(--green)');
    userInterface.outputColor("[█] You can type [HELP] for a list of commands.", 'var(--yellow)');
  },
};