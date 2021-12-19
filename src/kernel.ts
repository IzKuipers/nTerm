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
        id: parseInt(target.id),
        iId: "",
        env: {
          hist: [],
          kLog: [],
          argv: [],
          temp: document.getElementById("tmp")!,

          // Writable strings
          cmd: "", // Command
          val: "", // Input value
          path: "/", // Current Path
          CurrentTheme: "",
          oldTheme: "",
        },
      };

      this.log(`Creating Instance #${instance.id}`);

      const temp = document.createElement("noscript");

      temp.id = `temp#${instance.id}`;

      document.body.append(temp);

      if (environment.currentInstance)
        environment.currentInstance.env.temp = temp;

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
        if (environment.currentInstance)
          document
            .getElementById(environment.currentInstance.iId)
            ?.setAttribute("disabled", "true");
      }

      window.onerror = console.error = () => {
        this.panic();
      };

      document.addEventListener("error", () => {
        this.panic();
      });
    }, 50);
  }

  panic() {
    environment.kHalt = true;
    connectionChecker.stop();
    this.log("SYSTEM PANIC! ABORTING ALL PROCESSES...");
    if (environment.currentInstance)
      environment.currentInstance.target.innerHTML =
        environment.currentInstance.buffer = "";

    userInterface.output(`! KERNEL PANIC !\n\nKernel Log:`);

    let string = "";

    if (environment.currentInstance) {
      for (let i = 0; i < environment.currentInstance.env.kLog.length; i++) {
        string += `${environment.currentInstance.env.kLog[i]}\n`;
      }
    }

    userInterface.output(string);

    userInterface.output(`\nSystem halted. Press Ctrl+R to restart.`);
  }

  log(message = "") {
    const time = new Date().getTime() - environment.kStartTime;

    if (environment.currentInstance) {
      environment.currentInstance.env.kLog.push(`[${time}] ${message}`);
    }
  }
}

export const kernel = new Kernel();
