import { environment } from "./sys/env";
import { userInterface } from "./sys/ui";
import { keyboard } from "./sys/kb";
import { kernelFunctions } from "./sys/cf";
import { themeHandler } from "./sys/themes";
import { Instance, instanceHandler } from "./sys/instance";
import { connectionChecker } from "./sys/ping";
class Kernel {
  init(target: HTMLElement) {
    kernel.log(`kernel.init: Starting new kernel`);
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

      if (instance.id == NaN) {
        instance.id = Math.floor(Math.random() * 1000);
      }

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
    kernel.log("kernel: Setting intervals");

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

    if (environment.currentInstance) {
      const instance = environment.currentInstance;
      const target = instance.target;

      instance.buffer = "";
      target.innerText = "";
    }

    userInterface.output(`--- ! KERNEL PANIC ! ---\n\nEntire Kernel Log:\n`);

    let string = "";

    kernel.log(
      "\n\nPANIC! This instance has now become unusable.\nPossible reasons for this kernel panic are shown above."
    );

    if (environment.currentInstance) {
      const kernelLog = environment.currentInstance.env.kLog;

      for (let i = 0; i < kernelLog.length; i++) {
        const logItem = kernelLog[i];
        const intnum = logItem.split("]")[0].replace("[", "").padStart(6, " ");
        const str = logItem.split("]")[1];
        string += `[${intnum}] | ${str}\n`;
      }
    }

    userInterface.outputColor(string, "var(--yellow)");
    userInterface.output(`\nSystem halted. Press Ctrl+R to restart.`);

    setTimeout(() => {
      const target = environment.currentInstance.target;

      if (!target) return;

      target.scrollTop = target.scrollHeight;
    }, 25);
  }

  log(message = "") {
    const time = new Date().getTime() - environment.kStartTime;
    const instance = environment.currentInstance;
    const msg = `[${time}] ${message}`;

    if (instance) instance.env.kLog.push(msg);

    console.log(msg);
  }
}

export const kernel = new Kernel();
