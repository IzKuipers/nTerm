class Environment {
  // HTML Elements
  dispOut: HTMLElement = document.body;

  // Strings
  readonly vendor: string = "TechWorldInc"; // Author
  readonly pName: string = "NetCMD"; // Product Name
  readonly pVer: string = "2.0-alpha"; // Product Version
  prompt: string = "$ "; // Prompt String
  iId: string = ""; // Input ID

  // String Arrays
  hist: string[] = []; // History List
  kLog: string[] = []; // Kernel Log
  argv: string[] = []; // Argv list

  // Integers
  kStartTime: number = 0; // Kernel Start Time

  // Bools
  kHalt: boolean = false; // Kernel Halt
}

export const environment = new Environment();
