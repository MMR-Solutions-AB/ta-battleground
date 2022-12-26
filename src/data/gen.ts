import { readdirSync, readFileSync } from "fs";
import { join } from "path";

async function main() {
  const problems = readdirSync(join(__dirname, "./problems"));
  console.log(problems);
  for (let i = 0; i < problems.length; i++) {
    const res = readFileSync(
      join(__dirname, "./problems/" + problems[i] + "/description.md")
    ).toString();
    const d = await import(
      join(__dirname, "./problems/" + problems[i] + "/data.js")
    );
    console.log(d);

    // console.log(res);
  }
}

main();
