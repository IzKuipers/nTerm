class Environment {
  // HTML Elements
  dispOut: HTMLElement = document.body;

  // Strings
  vendor: string = "TechWorldInc";
  pName: string = "NetCMD";
  pVer: string = "2.0-alpha";
  prompt: string = "$ ";
  iId: string = "";

  // String Arrays
  hist: string[] = [];
  kLog: string[] = [];
  argv: string[] = [];

  // Integers
  kStartTime: number = 0;

  // Bools
  kHalt: boolean = false;
}

export const environment = new Environment();
