import "./styles/main.scss";
import { kernel } from "./kernel";

try {
  kernel.init(document.body);
} catch (e) {
  kernel.panic();
  console.log(typeof e);
  throw e;
}
