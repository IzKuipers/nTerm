import { kernel } from "../kernel";
import { environment } from "./env";
import { instanceHandler } from "./instance";

class TM {
  createNewTab() {
    const tabHolder = document.querySelector("div#tabs")!;
    const tabs = document.querySelectorAll("div.instanceTab")!;
    const divHolder = document.querySelector("div#instances")!;

    const div = document.createElement("div");
    const tab = document.createElement("div");
    const cbt = document.createElement("span");
    const txt = document.createElement("text");
    const ids = Math.floor(Math.random() * 32768);

    kernel.log(
      `Started TabManagement.createNewTab: creating new tab with id #${ids}...`
    );

    tab.className = "instanceTab";
    div.className = "instanceDiv";

    div.id = `${ids}`;
    tab.id = `tab#${ids}`;

    cbt.innerText = "close";
    cbt.className = "close";

    txt.innerText = `${ids}`;

    cbt.addEventListener("click", (e) => {
      this.closeTab(ids);

      e.stopPropagation();
      e.stopImmediatePropagation();
    });

    tab.addEventListener("click", (e) => {
      this.switchTab(tab, div);

      e.stopPropagation();
      e.stopImmediatePropagation();
    });

    tab.append(txt, cbt);

    if (tabs.length <= 10) {
      divHolder.append(div);
      tabHolder.append(tab);

      kernel.init(div);

      this.switchTab(tab, div);
    }
  }

  switchTab(instanceTab: HTMLDivElement, instanceDiv: HTMLDivElement) {
    const id = (instanceTab.children[0] as HTMLSpanElement).innerText;
    const instanceDivs = document.querySelectorAll("div.instanceDiv");
    const instanceTabs = document.querySelectorAll("div.instanceTab");

    kernel.log(`TabManagement.switchTab: switching to tab #${id}...`);

    for (let i = 0; i < instanceDivs.length; i++) {
      const instanceNode = instanceDivs[i] as HTMLDivElement;

      if (instanceNode != instanceDiv) {
        instanceNode.classList.add("hidden");

        continue;
      }

      instanceNode.classList.remove("hidden");

      const instance = environment.instances.get(instanceNode.id);

      if (instance) instanceHandler.switchInstance(instance);
    }

    for (let i = 0; i < instanceTabs.length; i++) {
      const tab = instanceTabs[i] as HTMLDivElement;

      if (tab != instanceTab) {
        tab.classList.remove("selected");

        continue;
      }

      tab.classList.add("selected");
    }

    const currentInstanceNode = document.getElementById(
      environment.currentInstance.iId
    );

    if (currentInstanceNode) currentInstanceNode.focus();
  }

  closeTab(id: number) {
    kernel.log(`Started TabManagement.closeTab: closing tab #${id}`);

    let counter = 0;

    const tabs = document.querySelector("div#tabs")?.children;

    for (let instance of environment.instances) {
      if (instance[1].id == id) {
        environment.instances.delete(instance[0]);
      }
    }

    for (let _ in tabs) {
      counter++;
    }

    if (counter > 1) {
      const tab = document.querySelector(`div.instanceTab[id*="tab#${id}"]`)!;
      const div = document.querySelector(`div.instanceDiv[id*="${id}"]`)!;

      if (tab) document.querySelector("div#tabs")!.removeChild(tab);
      if (div) document.querySelector("div#instances")!.removeChild(div);

      const tabs = document.querySelectorAll(`div#tabs div`);
      const divs = document.querySelectorAll(`div#instances div`);

      this.switchTab(
        tabs[tabs.length - 1] as HTMLDivElement,
        divs[tabs.length - 1] as HTMLDivElement
      );
    }
  }

  init() {
    kernel.log(`Started TabManagement.init: initializing Tab interface...`);

    const tabHolder = document.createElement("div");
    const createButton = document.createElement("div");
    const tabSpan = document.createElement("div");
    const divHolder = document.createElement("div");

    let tempbutton = document.createElement("button");
    tempbutton.innerText = "sb";

    tempbutton.addEventListener("click", () => {
      document.querySelector("div#app")!.classList.toggle("showrightbar");
    });

    tabSpan.id = "tabs";

    createButton.innerText = "+";
    createButton.className = "createButton";
    createButton.addEventListener("click", () => {
      this.createNewTab();
    });

    divHolder.id = "instances";

    tabHolder.append(tabSpan);
    tabHolder.append(createButton);

    tabHolder.className = "tabHolder";

    tabHolder.appendChild(tempbutton);

    document.body.append(tabHolder);
    document.body.append(divHolder);

    this.createNewTab();
  }
}

export const TabManagement = new TM();
