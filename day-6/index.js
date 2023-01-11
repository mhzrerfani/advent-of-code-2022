// Run in browser console on the input page
// https://adventofcode.com/2022/day/6/input
let input = document.querySelector("pre").innerText.split("");

const getPart1 = () => {
  let sequence = [],
    counter = 0;
  while (counter < input.length) {
    if (counter <= 2) {
      sequence = [...sequence, input[counter]];
      counter++;
    } else if (
      sequence.includes(input[counter]) ||
      sequence.filter((c, index) => {
        return sequence.indexOf(c) === index;
      }).length !== sequence.length
    ) {
      sequence.shift();
      sequence = [...sequence, input[counter]];
      counter++;
    } else {
      break;
    }
  }
  return counter + 1;
};

const getPart2 = () => {
  let sequence = [],
    counter = 0;
  while (counter < input.length) {
    if (counter <= 12) {
      sequence = [...sequence, input[counter]];
      counter++;
    } else if (
      sequence.includes(input[counter]) ||
      sequence.filter((c, index) => {
        return sequence.indexOf(c) === index;
      }).length !== sequence.length
    ) {
      sequence.shift();
      sequence = [...sequence, input[counter]];
      counter++;
    } else {
      break;
    }
  }
  return counter + 1;
};

const part1 = getPart1();
const part2 = getPart2();
