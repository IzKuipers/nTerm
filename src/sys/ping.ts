import { kernel } from "../kernel";
import { environment } from "./env";
import { userInterface } from "./ui";

class ConnectionChecker {
  interval: any;
  validresponse: string = "pong";
  defaultDelay: number = 1000;

  start(delay = this.defaultDelay) {
    kernel.log(`Starting Ping listener...`);
    this.interval = setInterval(() => {
      if (!this.get() && !environment.kHalt) {
        this.stop();
      }
    }, delay);
  }

  stop() {
    kernel.log(`Stopping Ping listener...`);

    try {
      environment.currentInstance.env.temp.innerHTML = "";
    } catch {
      kernel.panic();
    }

    userInterface.flushTempToBuffer();
    userInterface.syncTarget();

    environment.kHalt = true;

    userInterface.error(
      `Connection to dev server lost, unable to proceed.\n\nSystem halted. Press Ctrl+R to restart.\n`
    );
    userInterface.outputColor(
      `[Details: unable to fetch "${window.location.host}/__ping"]`,
      `var(--gray)`
    );

    clearInterval(this.interval);
  }

  get() {
    try {
      const req = new XMLHttpRequest();

      req.open("GET", "/__ping", false);
      req.send(null);

      return req.responseText == this.validresponse;
    } catch {
      kernel.panic();
      return false;
    }
  }
}

export const connectionChecker = new ConnectionChecker();
