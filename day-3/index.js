// Run in browser console on the input page
// https://adventofcode.com/2022/day/3/input
const input = document.body
    .getElementsByTagName("pre")[0]
    .innerText.split("\n"),
  priorities = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

const getPart1Answer = () => {
  return input.reduce((sum, rucksack) => {
    let duplicates = [];
    return rucksack
      ? rucksack
          .split("")
          .splice(Math.ceil(rucksack.length / 2))
          .reduce((s, c) => {
            if (
              rucksack
                .split("")
                .splice(0, Math.ceil(rucksack.length / 2))
                .includes(c) &&
              !duplicates.includes(c)
            ) {
              duplicates = [...duplicates, c];
              return priorities.indexOf(c) + 1 + s;
            } else {
              return s;
            }
          }, 0) + sum
      : sum;
  }, 0);
};

const getPart2Answer = () => {
  let counter = 0,
    duplicates = [];

  return input.reduce((sum, _, i, array) => {
    if (counter !== 2) {
      counter++;
      duplicates = [];
      return sum;
    }
    counter = 0;

    const sortedGroup = [array[i - 2], array[i - 1], array[i]].sort(
      (a, b) => a.length - b.length
    );

    return sortedGroup[0]
      ? sortedGroup[0].split("").reduce((s, c) => {
          if (
            sortedGroup[1].includes(c) &&
            sortedGroup[2].includes(c) &&
            !duplicates.includes(c)
          ) {
            duplicates = [...duplicates, c];
            return priorities.indexOf(c) + 1 + s;
          } else {
            return s;
          }
        }, 0) + sum
      : sum;
  }, 0);
};
