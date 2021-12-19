import { environment } from "./env";
import { userInterface } from "./ui";

class ConnectionChecker {
  interval: any;
  validresponse: string = "pong";
  defaultDelay: number = 1000;

  start(delay = this.defaultDelay) {
    this.interval = setInterval(() => {
      if (!this.get() && !environment.kHalt) {
        this.stop();
      }
    }, delay);
  }

  stop() {
    try {
      environment.currentInstance.env.temp.innerHTML = "";
    } catch {}

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
      return false;
    }
  }
}

export const connectionChecker = new ConnectionChecker();
