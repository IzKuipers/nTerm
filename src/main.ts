import "./styles/main.scss";
import { kernel } from "./kernel";
import { TabManagement } from "./sys/tabs";
import { RightBar } from "./rightbar";

try {
  RightBar.create();
  TabManagement.init();
} catch (e) {
  kernel.panic();

  throw e;
}
