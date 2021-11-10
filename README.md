# NetCMD 2.0
NetCMD 2.0 is a continuation of [TechWorldInc/NetCMD](https://www.github.com/TechWorldInc/NetCMD), created in Vite, SCSS and TypeScript.

> ⚠️ NetCMD 2.0 is currently in the **alpha** fase of development.

> 🌎 Test NetCMD 2.0 out: [NetCMD 2.0 public test](https://www.techworldinc.tk/NetCMD/)

## Usage
When you open NetCMD, you will be greated by the `intro` `CoreFunction` ([`src/sys/f/intro.ts`](https://github.com/TechWorldInc/NetCMD-2.0/blob/main/src/sys/cf/intro.ts)). Because this is a CoreFunction ([`CoreFunction` interface can be found here](https://github.com/TechWorldInc/NetCMD-2.0/blob/main/src/sys/cf.ts)), it will not be recognized when you, the user, types it into the prompt.

If you want a list of available commands, just type `HELP` in the prompt. To get the usage and description about a command, type `HELP <COMMAND>` (e.g. `help gh`).

## Interfaces
NetCMD uses `interfaces`, here is a list of the common ones:

> **Interface `Command`**
>
> Location:[`/src/sys/cmd.ts`](https://github.com/TechWorldInc/NetCMD-2.0/blob/main/src/sys/cmd.ts)
> ```ts
> // This is the interface used for built-in commands
> interface Command {
>     execute: () => void;
>     description?: string;
>     usage: string
> }
> ```

> **Interface `CoreFunction`**
>
> Location:[`/src/sys/cf.ts`](https://github.com/TechWorldInc/NetCMD-2.0/blob/main/src/sys/cf.ts)
> ```ts
> // This is the interface used for internal functions
> interface CoreFunction {
>     execute: () => void;
> }
> ```

> **Interface `Variable`**
> 
> Location:[`/src/sys/vars.ts`](https://github.com/TechWorldInc/NetCMD-2.0/blob/main/src/sys/vars.ts)
> ```ts
> // This is the interface used to store variables
> interface Variable {
>     value: string;
>     readonly: boolean
> }
> ```

## Thanks
If you have any questions, feature requests, issues or otherwise, don't hesitate and create an issue.

Anyway, thanks for checking out NetCMD 2.0!