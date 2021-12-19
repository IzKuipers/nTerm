import { kernel } from "../kernel";

class Utilities {
  getTime(code: Date = new Date()) {
    kernel.log(`Started Utilities.getTime`);
    const today = code;

    return {
      h: today.getHours().toString().padStart(2, "0"),
      m: today.getMinutes().toString().padStart(2, "0"),
      s: today.getSeconds().toString().padStart(2, "0"),
      ms: today.getMilliseconds().toString().padStart(3, "0"),
    };
  }

  replaceAllCharsInStr(input: string, from: string, to: string) {
    kernel.log(`Started Utilities.replaceAllCharsInStr`);
    let output = "";

    for (let i = 0; i < input.length; i++) {
      if (input.charAt(i) === from) {
        output += to;
      } else {
        output += input.charAt(i);
      }
    }

    return output;
  }

  createSeparatorFor(text: string) {
    kernel.log(`Started Utilities.createSeperatorFor`);
    let separator = "";

    for (let i = 0; i < text.length; i++) {
      separator += "-";
    }

    return separator;
  }

  removeCharsFromString(text = "", chars: string[] = []) {
    kernel.log(`Started Utilities.removeCharsFromString`);
    const list = text.split("");

    for (let i = 0; i < list.length; i++) {
      if (chars.includes(list[i])) {
        list[i] = "";
      }
    }

    return list.join("");
  }

  unescapeSlashes(str: string) {
    kernel.log(`Started Utilities.unescapeSlashes`);
    let parsedStr = str.replace(/(^|[^\\])(\\\\)*\\$/, "$&\\");

    parsedStr = parsedStr.replace(/(^|[^\\])((\\\\)*")/g, "$1\\$2");

    try {
      parsedStr = JSON.parse(`"${parsedStr}"`);
    } catch (e) {
      return str;
    }
    return parsedStr;
  }

  async fetchJSON(url: string) {
    const data = await fetch(url)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch(() => {
        return {};
      });

    return data;
  }

  makeHTMLTagsURLSafe(str: string) {
    let list: string[] = str.split("");

    for (let i = 0; i < list.length; i++) {
      list[i] = list[i] == "<" ? "&lt;" : list[i] == ">" ? "&gt;" : list[i];
    }

    return list.join("");
  }

  reset(str: string) {
    const replacers = [
      ["\\n", "\n"],
      ["&gt;", ">"],
      ["&lt;", "<"],
    ];
    let repl = str;

    for (const i in replacers) {
      repl = repl.replace(i[0], i[1]);
    }

    return str.replace("\\n", "\n").replace("&lt;", "<").replace("&gt;", ">");
  }
}

export const utilities = new Utilities();
