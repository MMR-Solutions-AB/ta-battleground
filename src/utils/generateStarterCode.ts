import _ from "lodash";
import type { ProblemArgument } from "@/data/Problem";

export function generateStarterCode(name: string, args: ProblemArgument[]) {
  const names = args.map(({ name }) => name);

  return `/**\n${args
    .map((arg) => ` * @param {${arg.type}} ${arg.name}\n`)
    .join("")} */\nfunction ${_.camelCase(name)}(${names.join(", ")}) {\n\n}`;
}
