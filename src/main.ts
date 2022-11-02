import "./styles/main.scss";
import { kernel } from "./kernel";
import { RightBar } from "./rightbar";
import { TabManagement } from "./sys/tabs";

try {
  RightBar.create();
  TabManagement.init();
} catch (e) {
  kernel.panic();

  throw e;
}
