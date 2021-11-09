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
        document.getElementById(environment.iId)?.setAttribute("disabled", "true");
      }

      window.onerror = console.error = () => {
        this.panic();
      }

      document.addEventListener("error",() => {this.panic()})
    }, 50)
  }

  panic() {
    environment.kHalt = true;
    this.log("SYSTEM PANIC! ABORTING ALL PROCESSES...");
    environment.dispOut.innerText = "";

    userInterface.output(`! KERNEL PANIC !\n\nKernel Log:`);

    for (let i = 0; i < environment.kLog.length; i++) {
      environment.dispOut.innerText += environment.kLog[i];
    }

    userInterface.output(`\nSystem halted. Press Ctrl+R to restart.`);
  }

  log(message: string = "") {
    let time = new Date().getTime() - environment.kStartTime;

    environment.kLog.push(`[${time}] ${message}\n`);
  }
}

export const kernel = new Kernel();
