// Run in browser console on the input page
// https://adventofcode.com/2022/day/11/input

const input = document
  .querySelector("pre")
  .innerText.split("\n\n")
  .map((monkey) => {
    const array = monkey.split("  ").map((n, i) => {
      if (i === 1) n = n.split(":")[1].split(",").map(Number);
      if (i === 2) n = n.split("= ")[1].slice().replace("\n", "").split(" ");
      if (i === 3) n = n.split(" ").map(Number)[3];
      if (i === 5 || i === 7) n = n.split(" ").map(Number)[5];
      if (i === 0 || i === 4 || i === 6) return;
      return n;
    });
    const [items, operation, test, onTrue, onFalse] = array.filter(
      (e) => e !== undefined
    );
    return {
      items,
      operation,
      test,
      nextMonkey: [onTrue, onFalse],
      inspect: 0,
    };
  });

const calcMonkeyBusiness = (rounds, divideWorry) => {
  const monkeys = [...input];
  const monkeysTestLCD = monkeys.reduce((tmp, monkey) => tmp * monkey.test, 1);

  for (let i = 1; i <= rounds; i++) {
    monkeys.forEach((monkey) => {
      while (monkey.items.length >= 1) {
        monkey.items[0] %= monkeysTestLCD;
        const operation = monkey.operation
          .map((n) => (n === "old" ? monkey.items[0] : n))
          .join("");

        monkey.items[0] = divideWorry
          ? Math.trunc(eval(operation) / 3)
          : Math.trunc(eval(operation));

        monkey.items[0] % monkey.test === 0
          ? monkeys[monkey.nextMonkey[0]].items.push(monkey.items.shift())
          : monkeys[monkey.nextMonkey[1]].items.push(monkey.items.shift());
        monkey.inspect += 1;
      }
    });
  }

  const inspectTimes = monkeys
    .map((monkey) => monkey.inspect)
    .sort((a, b) => b - a);

  return inspectTimes[0] * inspectTimes[1];
};

const part1 = calcMonkeyBusiness(20, true);
const part2 = calcMonkeyBusiness(10000, false);
