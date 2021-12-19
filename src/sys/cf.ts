import { dfault } from "./cf/default";
import { intro } from "./cf/intro";

export const kernelFunctions = new Map<string, CoreFunction>([
  ["default", dfault],
  ["intro", intro],
]);

export interface CoreFunction {
  execute: () => void;
}
