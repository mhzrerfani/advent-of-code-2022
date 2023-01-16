// Run in browser console on the input page
// https://adventofcode.com/2022/day/10/input

const input = document
  .querySelector("pre")
  .innerText.split("\n")
  .map((exc) => exc.split(" "));

const neededCycles = [20, 60, 100, 140, 180, 220];
let cycle = 1;
let x = 1;
let signalStr = 0;

const calcSignalStr = () => {
  if (neededCycles.includes(cycle)) {
    signalStr = cycle * x;
  }
};

const part1 = input.reduce((sum, line) => {
  const [type, amount] = line;
  signalStr = 0;

  if (type === "addx") {
    cycle++;
    calcSignalStr();
    cycle++;
    x += Number(amount);
    calcSignalStr();
  } else if (type === "noop") {
    cycle++;
    calcSignalStr();
  }

  return sum + signalStr;
}, 0);

console.log(part1);
