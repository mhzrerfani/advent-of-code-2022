// Run in browser console on the input page
// https://adventofcode.com/2022/day/2
const movementOptions = {
  rock: {
    playPoint: 1,
  },
  paper: {
    playPoint: 2,
  },
  scissors: {
    playPoint: 3,
  },
};

const setYourNextMove = (desiredResult, opponentMove) => {
  const { rock, paper, scissors } = movementOptions;

  if (
    (opponentMove === rock && desiredResult === "lose") ||
    (opponentMove === scissors && desiredResult === "draw") ||
    (opponentMove === paper && desiredResult === "win")
  ) {
    return scissors;
  } else if (
    (opponentMove === scissors && desiredResult === "lose") ||
    (opponentMove === paper && desiredResult === "draw") ||
    (opponentMove === rock && desiredResult === "win")
  ) {
    return paper;
  } else {
    return rock;
  }
};

const calculateRoundPoint = (yourMove, opponentMove) => {
  const { rock, paper, scissors } = movementOptions;

  const roundPoint = {
    won: 6,
    draw: 3,
    lost: 0,
  };

  if (yourMove === opponentMove) {
    return roundPoint.draw;
  } else if (yourMove === rock) {
    return opponentMove === scissors ? roundPoint.won : roundPoint.lost;
  } else if (yourMove === scissors) {
    return opponentMove === paper ? roundPoint.won : roundPoint.lost;
  } else if (yourMove === paper) {
    return opponentMove === rock ? roundPoint.won : roundPoint.lost;
  }
};

const getTournamentRounds = async () => {
  const url = "https://adventofcode.com/2022/day/2/input";
  const data = await fetch(url);
  const res = await data.text();
  return res.split("\n").map((round) => {
    const array = round.split(" ");
    return { yourMove: array[1], opponentMove: array[0] };
  });
};

const getTotalScore = async (moves) => {
  const tournamentRounds = await getTournamentRounds();
  const totalScore = tournamentRounds.reduce((score, currentRound) => {
    if (!currentRound.yourMove) return score;

    let yourMove = moves[currentRound.yourMove],
      opponentMove = moves[currentRound.opponentMove];
    const yourMoveIsConditional = typeof yourMove !== "object";

    if (yourMoveIsConditional)
      yourMove = setYourNextMove(yourMove, opponentMove);

    return (
      score + yourMove.playPoint + calculateRoundPoint(yourMove, opponentMove)
    );
  }, 0);
  return totalScore;
};

const getPart1Answer = () => {
  const { rock, paper, scissors } = movementOptions;
  const moves = {
    A: rock,
    X: rock,
    B: paper,
    Y: paper,
    C: scissors,
    Z: scissors,
  };
  return getTotalScore(moves).then((res) => console.log("Part 1: ", res));
};

const getPart2Answer = () => {
  const { rock, paper, scissors } = movementOptions;

  const moves = {
    A: rock,
    X: "lose",
    B: paper,
    Y: "draw",
    C: scissors,
    Z: "win",
  };
  return getTotalScore(moves).then((res) => console.log("Part 2: ", res));
};
