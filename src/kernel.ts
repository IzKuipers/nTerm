import { environment } from "./sys/env";
import { userInterface } from "./sys/ui";
import { keyboard } from "./sys/kb";
import { internalCommands } from "./sys/icmd";

class Kernel {
  init(target: HTMLElement) {
    if (target) {
      environment.kernelStartTime = new Date().getTime();

      userInterface.inputFocusLoop();

      keyboard.register();

      this.log(`Setting environment.displayOutput to ${target}...`);
      environment.displayOutput = target;

      this.log("Started commands.intro");
      internalCommands.get("intro")?.execute();

      this.log("Starting prompt loop...");
      userInterface.prompt();
    }
  }

  panic() {
    environment.kernelHalt = true;
    this.log("SYSTEM PANIC! ABORTING ALL PROCESSES...");
    environment.displayOutput.innerText = "";

    for (let i = 0; i < environment.kernelLog.length; i++) {
      environment.displayOutput.innerText += environment.kernelLog[i];
    }
  }

  log(message: string = "") {
    let time = new Date().getTime() - environment.kernelStartTime;

    environment.kernelLog.push(`[${time}] ${message}\n`);
  }
}

export const kernel = new Kernel();
