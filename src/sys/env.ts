class Environment {
  displayOutput: HTMLElement = document.body;
  vendorName: string = "TechWorldInc";
  productName: string = "NetCMD";
  productVersion: string = "2.0-alpha";
  prompt: string = "$ ";
  inputId: string = "";
  history: string[] = [];
  kernelLog: string[] = [];
  kernelStartTime: number = 0;
  kernelHalt: boolean = false;
}

export const environment = new Environment();
