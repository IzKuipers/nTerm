import { kernel } from "./kernel";

class RB {
  create() {
    kernel.log("RightBar: creating div#app > div#rightbar");
    const bar = document.createElement("div");
    const div = document.body;

    if (!div) throw new Error("Can't create sidebar without div#app.");

    bar.className = "rightbar";

    div.append(bar);
  }
}

export const RightBar = new RB();
