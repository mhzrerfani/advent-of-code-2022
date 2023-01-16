// Run in browser console on the input page
// https://adventofcode.com/2022/day/5/input

const parser = () => {
  const [containersStr, stepsStr] = document
    .querySelector("pre")
    .innerText.split("\n\n");

  const containers = containersStr
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

  const steps = stepsStr.split("\n").map((step) =>
    step
      .trim()
      .replace(/\D/g, "-")
      .split("-")
      .filter((n) => n !== "")
  );

  return { steps, containers };
};

const getPart1 = () => {
  const { steps, containers } = parser();
  return steps
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
      [...containers]
    )
    .reduce((s, c) => s + c[c.length - 1], "");
};

const getPart2 = () => {
  const { steps, containers } = parser();
  return steps
    .reduce(
      (stacks, step) => {
        let [amount, from, to] = step;
        let arr = [];

        if (step.length >= 1) {
          for (let i = amount; i >= 1; i--) {
            if (
              stacks[from - 1] === undefined ||
              stacks[from - 1].length <= 0
            ) {
              break;
            }
            arr.unshift(stacks[from - 1].pop());
          }
        }

        if (stacks[to - 1] !== undefined && arr.length >= 1) {
          stacks[to - 1].push(...arr);
        }
        return stacks;
      },
      [...containers]
    )
    .reduce((s, c) => (c.length >= 1 ? s + c[c.length - 1] : s), "");
};

const part1 = getPart1();
const part2 = getPart2();
