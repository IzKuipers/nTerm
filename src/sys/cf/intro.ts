import { kernel } from "../../kernel";
import { environment } from "../env";
import { CoreFunction } from "../cf";
import { userInterface } from "../ui";

export const intro: CoreFunction = {
  execute: () => {
    kernel.log("Start Core Function 'intro'");

    userInterface.outputColor(`[█] Welcome to [${environment.pName}]!`, 'var(--purple)');
    userInterface.outputColor("[█]", 'var(--blue)');
    userInterface.outputColor(`[█] You are currently running build [${environment.pVer}].`, 'var(--aqua)');
    userInterface.outputColor("[█]", 'var(--green)');
    userInterface.outputColor(`[█] Current theme is [${localStorage.getItem("theme") || environment.defaultTheme}].`, 'var(--yellow)');
    userInterface.outputColor("[█]", 'var(--orange)');
    userInterface.outputColor("[█] You can type [help] for a list of commands.", 'var(--red)');
  },
};