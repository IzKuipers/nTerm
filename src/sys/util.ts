class Utilities {
  getTime() {
    let today = new Date();

    return {
      h: today.getHours().toString().padStart(2, "0"),
      m: today.getMinutes().toString().padStart(2, "0"),
      s: today.getSeconds().toString().padStart(2, "0"),
      ms: today.getMilliseconds().toString().padStart(3, "0"),
    };
  }

  replaceAllCharsInStr(input: string, from: string, to: string) {
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
}

export const utilities = new Utilities();
