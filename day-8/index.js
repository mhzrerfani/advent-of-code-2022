// Run in browser console on the input page
// https://adventofcode.com/2022/day/7/input
let input = document
  .querySelector("pre")
  .innerText.split("\n")
  .map((n) => n.split(""));

const getGrid = () => {
  let columns = [],
    rows = input;

  rows.forEach((row) => {
    row.forEach((tree, j, array) => {
      columns.length < array.length
        ? columns.push([tree])
        : columns[j].push(tree);
    });
  });

  return { columns, rows };
};

const { columns, rows } = getGrid();

const checkAround = (
  index,
  depth = { b: 1, r: 1, t: -1, l: -1 },
  options = { left: true, top: true, right: true, bottom: true }
) => {
  let { top, left, bottom, right } = options;
  let { b, t, l, r } = depth;

  const [i, j] = index,
    selectedRow = rows[i],
    selectedCol = columns[j],
    bottomSide = selectedCol[i + b] || 0,
    topSide = selectedCol[i + t] || 0,
    rightSide = selectedRow[j + r] || 0,
    leftSide = selectedRow[j + l] || 0;

  const endOfTheLine =
    typeof bottomSide === "number" ||
    typeof rightSide === "number" ||
    typeof leftSide === "number" ||
    typeof topSide === "number";

  const borderTree =
    selectedRow.length - 1 === j ||
    j === 0 ||
    selectedCol.length - 1 === i ||
    i === 0;

  if (borderTree || endOfTheLine) {
    if (bottomSide === 0) {
      b -= 1;
    } else if (leftSide === 0) {
      l += 1;
    } else if (topSide === 0) {
      t += 1;
    } else {
      r -= 1;
    }
    return {
      tallEnough: true,
      depths: { b, r, t, l },
    };
  }

  if (!bottom && !top && !left && !right) {
    return {
      tallEnough: false,
      depths: { b, r, t, l },
    };
  }

  bottom = bottom ? selectedRow[j] > bottomSide : false;
  top = top ? selectedRow[j] > topSide : false;
  left = left ? selectedCol[i] > leftSide : false;
  right = right ? selectedCol[i] > rightSide : false;

  r = right ? r + 1 : r;
  b = bottom ? b + 1 : b;
  l = left ? l - 1 : l;
  t = top ? t - 1 : t;

  return checkAround(index, { b, r, t, l }, { top, left, right, bottom });
};

const getPart1 = () => {
  let sum = 0;
  rows.forEach((row, i) => {
    row.forEach((_, j) => {
      sum = checkAround([i, j]).tallEnough ? sum + 1 : sum;
    });
  });
  return sum;
};

const part1 = getPart1();

