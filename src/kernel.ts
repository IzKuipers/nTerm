import { environment } from "./sys/env";
import { userInterface } from "./sys/ui";
import { keyboard } from "./sys/kb";
import { kernelFunctions } from "./sys/cf";
import { themeHandler } from "./sys/themes";
import { Instance, instanceHandler } from "./sys/instance";
import { connectionChecker } from "./sys/ping";
class Kernel {
  init(target: HTMLElement) {
    if (target) {
      this.setIntervals();

      environment.kStartTime = new Date().getTime();

      const instance: Instance = {
        target: target,
        buffer: "",
        id: Math.floor(Math.random() * 1000000)
      }

      this.log(`Creating Instance #${instance.id}`);

      instanceHandler.loadInstance(instance);

      connectionChecker.start();
      keyboard.register();
      themeHandler.loadStoredTheme();

      userInterface.inputFocusLoop();

      kernelFunctions.get("intro")?.execute();

      this.log("Starting prompt...");
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

      document.addEventListener("error", () => { this.panic() })
    }, 50)
  }

  panic() {
    environment.kHalt = true;
    connectionChecker.stop();
    this.log("SYSTEM PANIC! ABORTING ALL PROCESSES...");
    environment.instance.target.innerHTML = environment.instance.buffer = "";

    userInterface.output(`! KERNEL PANIC !\n\nKernel Log:`);

    let string = "";

    for (let i = 0; i < environment.kLog.length; i++) {
      string += `${environment.kLog[i]}\n`;
    }

    userInterface.output(string);

    userInterface.output(`\nSystem halted. Press Ctrl+R to restart.`);
  }

  log(message = "") {
    const time = new Date().getTime() - environment.kStartTime;

    environment.kLog.push(`[${time}] ${message}`);
  }
}

export const kernel = new Kernel();
