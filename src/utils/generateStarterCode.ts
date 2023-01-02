import _ from "lodash";

export function generateStarterCode(name: string, args: string[]) {
  return `function ${_.camelCase(name)}(${args.join(", ")}) {\n\n}`;
}
