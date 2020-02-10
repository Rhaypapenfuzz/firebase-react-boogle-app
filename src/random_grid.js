// Returns a random 5x5 board, using the official letter distribution.
export function RandomGrid() {
  // prettier-ignore
  const dice = ["AAAFRS", "AAEEEE", "AAFIRS", "ADENNN", "AEEEEM",
                "AEEGMU", "AEGMNN", "AFIRSY", "BJKQXZ", "CCNSTW",
                "CEIILT", "CEILPT", "CEIPST", "DHHNOT", "DHHLOR",
                "DHLNOR", "DDLNOR", "EIIITT", "EMOTTT", "ENSSSU",
                "FIPRSY", "GORRVW", "HIPRRY", "NOOTUW", "OOOTTU"];
  let chars = dice.map(cube => cube[Math.floor(Math.random() * cube.length)]);

  chars.sort(() => Math.random() - 0.5); // Shuffle the letters.

  const SIZE = 5;
  let grid = [];
  for (let row = 0; row < SIZE; row++) {
    grid[row] = [];
    for (let col = 0; col < SIZE; ++col) {
      grid[row][col] = chars[SIZE * row + col].toLowerCase();
      if (grid[row][col] === "Q") grid[row][col] = "Qu";
    }
  }
  //console.log(grid);
  return grid;
}
