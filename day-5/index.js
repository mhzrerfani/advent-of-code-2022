// Run in browser console on the input page
// https://adventofcode.com/2022/day/5/input
let [stacks, steps] = document.querySelector("pre").innerText.split("\n\n");

stacks = stacks
  .split("\n")
  .slice(0, -1)
  .reverse()
  .reduce(
    (s, c) =>
      s.map((stack, i) => {
        if (c[4 * i + 1] == " ") return stack;
        return [...stack, c[4 * i + 1]];
      }),
    Array.from(Array(9), () => [])
  );

steps = steps.split("\n").map((step) =>
  step
    .trim()
    .replace(/\D/g, "-")
    .split("-")
    .filter((n) => n !== "")
);

const part1 = steps
  .reduce(
    (s, c) => {
      if (c.length < 1) return s;
      const [amount, from, to] = c;
      for (let i = amount; i >= 1; i--) {
        if (s[from - 1] === undefined || s[from - 1].length <= 0) break;
        s[to - 1].push(s[from - 1].pop());
      }
      return s;
    },
    [...stacks]
  )
  .reduce((s, c) => s + c[c.length - 1], "");

