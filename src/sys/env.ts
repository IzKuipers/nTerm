import { Instance } from "./instance";

class Environment {
  // HTML Elements
  temp: HTMLElement = document.getElementById('tmp')!;

  // Writable strings
  iId = ""; // Input ID
  cmd = ""; // Command
  val = ""; // Input value
  path = "/" // Current Path
  promptVarName = "PS"
  CurrentTheme = "";
  oldTheme = "";

  // Readonly Strings
  readonly vendor: string = "TechWorldInc"; // Author
  readonly pName: string = "NetCMD"; // Product Name
  readonly pVer: string = "2.0"; // Product Version
  readonly defaultTheme: string = "default"; // Default Theme
  readonly prompt: string = `[${this.path}]\n$`; // Prompt String

  // String Arrays
  hist: string[] = []; // History List
  kLog: string[] = []; // Kernel Log
  argv: string[] = []; // Argv list

  // Integers
  kStartTime = 0; // Kernel Start Time

  // Bools
  kHalt = false; // Kernel Halt

  // Instance
  instance!: Instance;
}

export const environment = new Environment();
