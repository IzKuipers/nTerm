import { userInterface } from "./../ui";
import { kernelFunctions } from "./../cf";
import { Command } from "../cmd";
import { environment } from "../env";

export const intro: Command = {
  execute() {
    const command = kernelFunctions.get("intro")!;

    if (!command) return;

    environment.currentInstance.env.temp.innerHTML = "";

    userInterface.flushTempToBuffer();
    userInterface.syncTarget();

    command.execute();
  },
  usage: "INTRO",
  description: "Play the intro",
};
