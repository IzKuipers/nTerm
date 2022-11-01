import { Instance } from "./instance";

class Environment {
  kStartTime = 0;

  kHalt = false;

  currentInstance!: Instance;

  instances = new Map<string, Instance>();

  readonly vendor: string = "Izaak Kuipers";
  readonly pName: string = "nTerm";
  readonly pVer: string = "2.1";
  readonly defaultTheme: string = "onedark";
  readonly prompt: string = `[${location.hostname}]@[${this.pName}]: $`;
}

export const environment = new Environment();
