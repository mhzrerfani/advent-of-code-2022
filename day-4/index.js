// Run in browser console on the input page
// https://adventofcode.com/2022/day/4/input
const input = document
  .querySelector("pre")
  .innerText.split("\n")
  .map((n) => n.split(",").map((n) => n.split("-").map((n) => parseInt(n))));

const part1 = input.reduce((s, c) => {
  if (c.length < 2) return s;
  const compare = c[0][1] - c[0][0] > c[1][1] - c[1][0];
  const bigOne = compare ? c[0] : c[1];
  const littleOne = compare ? c[1] : c[0];
  return littleOne[0] >= bigOne[0] && littleOne[1] <= bigOne[1] ? s + 1 : s;
}, 0);

const part2 = input.reduce((s, c) => {
  if (c.length < 2) return s;
  const compare = c[0][1] - c[0][0] > c[1][1] - c[1][0];
  const bigOne = compare ? c[0] : c[1];
  const littleOne = compare ? c[1] : c[0];
  return (bigOne[0] <= littleOne[0] && littleOne[0] <= bigOne[1]) ||
    (bigOne[0] <= littleOne[1] && littleOne[1] <= bigOne[1])
    ? s + 1
    : s;
}, 0);
