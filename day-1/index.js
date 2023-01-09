// Run in browser console on the input page
// https://adventofcode.com/2022/day/1
const getSortedCalories = async (url) => {
  const data = await fetch(url);
  const res = await data.text();
  const calories = await res.split("\n").map((i) => Number(i));

  let array = [];
  calories.reduce((sum, current) => {
    if (current) {
      return sum + current;
    } else {
      array = [...array, sum];
      return 0;
    }
  }, 0);
  return array.sort((a, b) => b - a);
};

const sortedCalories = getSortedCalories(
  "https://adventofcode.com/2022/day/1/input"
);

const getPart1Answer = async () => {
  return sortedCalories.then((res) => console.log("Part 1: ", res[0]));
};

const getPart2Answer = async () => {
  return sortedCalories.then((res) =>
    console.log("Part 2: ", res[0] + res[1] + res[2])
  );
};
