import { userInterface } from "./../ui";
import { Command } from "../cmd";

export const colors: Command = {
  execute() {
    const colors = [
      "bg",
      "gray",
      "fg",
      "red",
      "orange",
      "yellow",
      "green",
      "aqua",
      "blue",
      "purple",
    ];

    for (let i = 0; i < colors.length; i++) {
      userInterface.outputColor(
        `${colors[i].padEnd(
          10,
          " "
        )}: [The quick brown fox jumps over the lazy dog.]`,
        `var(--${colors[i]})`
      );
    }
  },
  description: "Display all colors",
  usage: "COLORS",
};
