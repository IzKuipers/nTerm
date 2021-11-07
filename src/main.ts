import "./styles/main.scss";
import { kernel } from "./kernel";

try {
  await kernel.init(document.body);
} catch (e) {
  kernel.panic();
  throw e;
}
