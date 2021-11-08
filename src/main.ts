import "./styles/main.scss";
import { kernel } from "./kernel";

try {
  // Main entry point: load the default output (document.body)

  await kernel.init(document.body);
} catch (e) {
  // When an exception occurs, execute kernel.panic and throw the error
 
  kernel.panic();
  throw e;
}
