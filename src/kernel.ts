import { environment } from "./sys/env";
import { userInterface } from "./sys/ui";
import { keyboard } from "./sys/kb";
import { kernelFunctions } from "./sys/kf";

class Kernel {
  init(target: HTMLElement) {
    if (target) {
      this.setIntervals();

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

  setIntervals() {
    setInterval(() => {
      if (environment.kHalt) {
        document.getElementById(environment.iId)?.setAttribute("disabled","true");
      }
    },50)
  }

  panic() {
    environment.kHalt = true;
    this.log("SYSTEM PANIC! ABORTING ALL PROCESSES...");
    environment.dispOut.innerText = "";

    userInterface.output(`! [ KERNEL PANIC ] !\n\nKernel Log (environment.kLog):\n`)

    for (let i = 0; i < environment.kLog.length; i++) {
      environment.dispOut.innerText += environment.kLog[i];
    }

    userInterface.output(`\nOH NO! It appears that ${environment.pName} has crashed!\n\nIf this happens more often, please submit an issue at:\nhttps://www.github.com/${environment.vendor}/${environment.pName}/issues/\n\nHit Ctrl+R to reload`);
  }

  log(message: string = "") {
    let time = new Date().getTime() - environment.kStartTime;

    environment.kLog.push(`[${time}] ${message}\n`);
  }
}

export const kernel = new Kernel();
