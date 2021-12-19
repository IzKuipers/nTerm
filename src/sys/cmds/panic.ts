import { kernel } from "../../kernel";
import { Command } from "../cmd";

export const panic: Command = {
  execute: () => {
    kernel.panic();
  },

  description: "Cause a kernel panic",
  usage: "PANIC",
};
