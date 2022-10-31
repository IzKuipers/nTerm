import { kernel } from "../kernel";
import { userInterface } from "./ui";

class Keyboard {
  register() {
    kernel.log("Started Keyboard.register");

    document.addEventListener("keydown", (e) => {
      this.processEvent(e);
    });
  }

  processEvent(e: KeyboardEvent) {
    switch (e.key.toLowerCase()) {
      case "enter":
        userInterface.evaluateCommand();
        e.stopPropagation();
        e.stopImmediatePropagation();
        break;
      /* 
      TODO: add these
      case "arrowup":
        break;
      case "arrowdown":
        break; */
    }
  }
}

export const keyboard = new Keyboard();
