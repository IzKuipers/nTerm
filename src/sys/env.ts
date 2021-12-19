import { Instance } from "./instance";

class Environment {
  kStartTime = 0;

  kHalt = false;

  currentInstance!: Instance;

  instances = new Map<string, Instance>();

  readonly vendor: string = "TechWorldInc";
  readonly pName: string = "nTerm";
  readonly pVer: string = "2.0";
  readonly defaultTheme: string = "default";
  readonly prompt: string = `[/]\n$`;
}

export const environment = new Environment();
