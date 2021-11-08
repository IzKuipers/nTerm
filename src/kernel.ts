import { environment } from "./sys/env";
import { userInterface } from "./sys/ui";
import { keyboard } from "./sys/kb";
import { kernelFunctions } from "./sys/kf";

class Kernel {
  init(target: HTMLElement) {
    if (target) {
      environment.kStartTime = new Date().getTime();

      userInterface.inputFocusLoop();

      keyboard.register();

      this.log(`Setting environment.displayOutput to ${target}...`);
      environment.dispOut = target;

      this.log("Started commands.intro");
      kernelFunctions.get("intro")?.execute();

      this.log("Starting prompt loop...");
      userInterface.prompt();
    }
  }

  panic() {
    environment.kHalt = true;
    this.log("SYSTEM PANIC! ABORTING ALL PROCESSES...");
    environment.dispOut.innerText = "";

    for (let i = 0; i < environment.kLog.length; i++) {
      environment.dispOut.innerText += environment.kLog[i];
    }
  }

  log(message: string = "") {
    let time = new Date().getTime() - environment.kStartTime;

    environment.kLog.push(`[${time}] ${message}\n`);
  }
}

export const kernel = new Kernel();
