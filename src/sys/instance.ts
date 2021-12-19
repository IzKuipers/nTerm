import { kernel } from "../kernel";
import { environment } from "./env";
import { userInterface } from "./ui";

export interface Instance {
  target: HTMLElement;
  name?: string;
  buffer: string;
  id: number;
  iId: string;
  env: InstanceEnv;
}

export interface InstanceEnv {
  hist: string[];
  kLog: string[];
  argv: string[];

  temp: HTMLElement;

  cmd?: string;
  val?: string;
  path?: string;
  CurrentTheme?: string;
  oldTheme?: string;
}

class InstanceHandler {
  loadInstance(instance: Instance) {
    kernel.log(`Loading instance #${instance.id} . . .`);
    if (instance?.target) {
      environment.instances.set(instance?.id.toString(), instance);

      this.switchInstance(instance);
      return;
    }
  }

  switchInstance(instance: Instance) {
    if (instance) {
      environment.currentInstance = instance;
      environment.currentInstance.env.temp = document.getElementById(
        `temp#${instance?.id}`
      )!;

      document.title = instance?.name || environment.pName;

      userInterface.syncTarget();
    }
  }
}

export const instanceHandler = new InstanceHandler();
