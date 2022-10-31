import { kernel } from "../../kernel";
import { environment } from "../env";
import { CoreFunction } from "../cf";
import { userInterface } from "../ui";

export const intro: CoreFunction = {
  execute: () => {
    const n = environment.pName;
    const b = `[█]`;
    const i = environment.currentInstance.id;
    const t = localStorage.getItem("theme") || environment.defaultTheme;

    kernel.log("Start Core Function 'intro'");

    userInterface.outputColor(b + ` Welcome to [${n}]!`, "var(--purple)");

    userInterface.outputColor("[█]", "var(--blue)");
    userInterface.outputColor(
      b + ` You are on instance #[${i}]`,
      "var(--aqua)"
    );

    userInterface.outputColor(b, "var(--green)");
    userInterface.outputColor(b + ` Current theme is [${t}].`, "var(--yellow)");

    userInterface.outputColor("[█]", "var(--orange)");
    userInterface.outputColor(
      "[█] You can type [help] for a list of commands.",
      "var(--red)"
    );
  },
};
