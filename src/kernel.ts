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

      //connectionChecker.start();
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
      const instance = environment.currentInstance;

      if (environment.kHalt && instance) {
        const instanceNode = document.getElementById(instance.iId);

        if (instanceNode) instanceNode.setAttribute("disabled", "true");
      }
    }, 50);

    window.onerror = console.error = kernel.panic;

    document.addEventListener("error", kernel.panic);
  }

  panic() {
    environment.kHalt = true;

    connectionChecker.stop();

    this.log("SYSTEM PANIC! ABORTING ALL PROCESSES...");

    if (environment.currentInstance) {
      const instance = environment.currentInstance;
      const target = instance.target;

      instance.buffer = "";
      target.innerText = "";
    }

    userInterface.output(`! KERNEL PANIC !\n\nKernel Log:`);

    let string = "";

    if (environment.currentInstance) {
      const kernelLog = environment.currentInstance.env.kLog;

      for (let i = 0; i < kernelLog.length; i++) {
        string += `${kernelLog[i]}\n`;
      }
    }

    userInterface.output(string);
    userInterface.output(`\nSystem halted. Press Ctrl+R to restart.`);

    setTimeout(() => {
      const target = environment.currentInstance.target;

      if (!target) return;

      target.scrollTop = target.scrollHeight;
    }, 1000);
  }

  log(message = "") {
    const time = new Date().getTime() - environment.kStartTime;

    const instance = environment.currentInstance;

    if (instance) {
      instance.env.kLog.push(`[${time}] ${message}`);
    }
  }
}

export const kernel = new Kernel();
