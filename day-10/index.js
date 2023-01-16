// Run in browser console on the input page
// https://adventofcode.com/2022/day/10/input

const input = document
  .querySelector("pre")
  .innerText.split("\n")
  .map((exc) => exc.split(" "));

const neededCycles = [20, 60, 100, 140, 180, 220];
const rowsLastCycle = [40, 80, 120, 160, 200, 240];
let cycle = 1;
let x = 1;
let crtRowIndex = 0;
let signalStr = 0;
let rowPixels = [];
let allPixels = [];

const processSignal = () => {
  crtRowIndex++;

  if (cycle % 40 === 1 || cycle === 1) {
    crtRowIndex = 0;
  }

  if (neededCycles.includes(cycle)) {
    signalStr = cycle * x;
  }
  rowPixels += crtRowIndex >= x - 1 && crtRowIndex <= x + 1 ? "#" : ".";
  if (rowsLastCycle.includes(cycle)) {
    allPixels = [...allPixels, rowPixels];
    rowPixels = [];
  }
};

const part1 = input.reduce((sum, line) => {
  const [type, amount] = line;
  signalStr = 0;

  if (type === "addx") {
    cycle++;
    processSignal();
    cycle++;
    x += Number(amount);
    processSignal();
  } else if (type === "noop") {
    cycle++;
    processSignal();
  }

  return sum + signalStr;
}, 0);

const part2 = allPixels;
