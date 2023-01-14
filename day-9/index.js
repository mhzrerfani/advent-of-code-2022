// Run in browser console on the input page
// https://adventofcode.com/2022/day/7/input
const input = document
  .querySelector("pre")
  .innerText.split("\n")
  .map((l) => l.split(" "))
  .reduce((allMoves, line) => {
    let [type, amount] = line;
    let oneDirMoves = [];
    while (amount > 0) {
      oneDirMoves = [...oneDirMoves, type];
      amount--;
    }
    return [...allMoves, ...oneDirMoves];
  }, []);

const getPart1 = () => {
  const newIndex = {
    U: 1,
    D: -1,
    R: 1,
    L: -1,
  };
  let head = { x: 0, y: 0 };
  let tail = { x: 0, y: 0 };
  let tailHeatmap = [];

  input.forEach((move) => {
    if (move === "U" || move === "D") {
      head.y += newIndex[move];
      if (head.x === tail.x && Math.abs(head.y - tail.y) === 2) {
        tail.y += newIndex[move];
      } else if (
        Math.abs(head.x - tail.x) === 1 &&
        Math.abs(head.y - tail.y) === 2
      ) {
        tail.y += newIndex[move];
        tail.x = head.x;
      }
    } else {
      head.x += newIndex[move];
      if (head.y === tail.y && Math.abs(head.x - tail.x) === 2) {
        tail.x += newIndex[move];
      } else if (
        Math.abs(head.y - tail.y) === 1 &&
        Math.abs(head.x - tail.x) === 2
      ) {
        tail.x += newIndex[move];
        tail.y = head.y;
      }
    }
    tailHeatmap = [...tailHeatmap, [tail.x, tail.y]];
  });

  tailHeatmap = tailHeatmap.reduce((uniqueBlocks, block) => {
    const [x, y] = block;
    const isBlockUnique = uniqueBlocks.every((uniqueBlock) => {
      const [ux, uy] = uniqueBlock;
      return ux !== x || uy !== y;
    });
    return isBlockUnique ? [...uniqueBlocks, block] : uniqueBlocks;
  }, []);
  return tailHeatmap.length;
};

const part1 = getPart1();
