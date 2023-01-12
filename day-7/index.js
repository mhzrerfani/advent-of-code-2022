// Run in browser console on the input page
// https://adventofcode.com/2022/day/7/input
let input = document
  .querySelector("pre")
  .innerText.split("\n")
  .map((line) => line.split(" ").map((el) => (+el ? Number(el) : el)));

const getDirectories = () => {
  let currentDirectory = { files: [{ name: "/", files: [] }] },
    previousDirectory = null,
    history = [],
    directories = [];

  const changeDirectory = (dir) => {
    if (dir == "..") {
      history.pop();
      currentDirectory = history[history.length - 1];
      previousDirectory = history[history.length - 2];
    } else {
      previousDirectory = { ...currentDirectory };
      currentDirectory = previousDirectory.files.filter(
        (file) => file.name === dir
      )[0];
      history.length <= 0
        ? (history = [previousDirectory, currentDirectory])
        : (history = [...history, currentDirectory]);
    }
  };

  const createNewDirectory = (name, files) => {
    return {
      name,
      files,
    };
  };

  input.forEach((outputLine) => {
    const isCommand = outputLine[0] === "$";
    if (isCommand) {
      const command = outputLine[1];
      if (command === "cd") {
        const newDirectory = outputLine[2];
        changeDirectory(newDirectory);
      }
    } else {
      const isFile = typeof outputLine[0] === "number";
      if (isFile && currentDirectory) {
        const fileSize = outputLine[0];
        if (currentDirectory.files) currentDirectory.files.push(fileSize);
      } else {
        const newDirectoryName = outputLine[1];
        const newCreatedDirectory = createNewDirectory(newDirectoryName, []);
        currentDirectory.files.push(newCreatedDirectory);
      }
    }
  }, currentDirectory);

  const getSize = (totalSize, file) => {
    if (typeof file === "number") return totalSize + file;
    const size = file.files.reduce(getSize, 0);
    directories.push({ name: file.name, size });
    return totalSize + size;
  };

  const usedSize = history[1].files.reduce(getSize, 0);
  return { directories, usedSize };
};

const { directories, usedSize } = getDirectories();
const part1 = directories.reduce((sum, e) => {
  if (e.size > 100000) return sum;
  return sum + e.size;
}, 0);

const part2 = directories
  .filter((el) => el.size >= 30000000 - (70000000 - usedSize))
  .sort((a, b) => a.size - b.size)[0].size;
