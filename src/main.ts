import "./styles/main.scss";
import { kernel } from "./kernel";
import { TabManagement } from "./sys/tabs";

try {
  TabManagement.init();
} catch (e) {
  kernel.panic();
  throw e;
}
