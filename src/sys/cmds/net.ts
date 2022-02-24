import { Command } from "../cmd";
import { userInterface } from "../ui";

export const net: Command = {
  execute: () => {
    if (ping()) {
      userInterface.outputColor(
        "[SUCCESS]: you are connected to the internet",
        `var(--green)`
      );
      
      return;
    }

    userInterface.outputColor(
      "[FAILURE]: you are not connected to the internet"
    );
  },

  description: "Check the internet connection",
  usage: "NET",
};

function ping() {
  try {
    const req = new XMLHttpRequest();

    req.open("GET", "https://techworldinc.tk/ping/ping.html", false);
    req.send(null);

    return !!req.responseText.startsWith("pong");
  } catch {
    return false;
  }
}
