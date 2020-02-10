////////////////////////////////////////////////////////////////////////////////
// A minimal Trie, supporting just the API we need for this Boggle solver.

function TrieNode(character) {
  this.character = character;
  this.parent = null;
  this.children = {};
  this.isWord = false;
}

// Returns the word corresponding to this node.
TrieNode.prototype.asFullWord = function() {
  var output = [];
  var node = this;

  while (node !== null) {
    output.push(node.character);
    node = node.parent;
  }

  output.reverse();
  return output.join('');
};

function trieInsert(root, word) {
    let node = root;
    for (let i = 0; i < word.length; ++i) {
	let c = word[i];
	// If 'Q' is the final letter, word[i+1] is undefined
	if (c == 'Q' && word[i + 1] == 'U') {
	    c = 'QU';
	    i = i + 1;
	}
	if (node.children[c] == undefined) {
	    node.children[c] = new TrieNode(c);
	    node.children[c].parent = node;
	}
	 node = node.children[c];
  }
  node.isWord = true;
}

////////////////////////////////////////////////////////////////////////////////
// The solver itself. We use a helper struct, to simplify argument passing.

function Solver(dict, grid) {
    this.trieRoot = new TrieNode();
    for (let word of dict) {
	trieInsert(this.trieRoot, word);
    }
    this.grid = grid;
    this.solutions = new Set();
}

Solver.prototype.solve = function() {
  for (let row = 0; row < this.grid.length; ++row) {
    for (let col = 0; col < this.grid[0].length; ++col) {
      this.recursiveSolve(row, col, this.trieRoot);
    }
  }
};

Solver.prototype.recursiveSolve = function(row, col, parentNode) {
  if (row < 0 || row >= this.grid.length || col < 0 || col >= this.grid[0].length) return;

  const currentTile = this.grid[row][col];
  const currentNode = parentNode.children[currentTile];
  if (currentNode == undefined) return;  // '==' matches null or undef
  //console.log("currentNode");
  //console.log(currentNode);

  if (currentNode.isWord) {
    this.solutions.add(currentNode.asFullWord());
  }
  this.grid[row][col] = '.';  // Mark the cell, so we don't repeat it.

  for (let dx = -1; dx < 2; ++dx) {
    for (let dy = -1; dy < 2; ++dy) {
      this.recursiveSolve(row + dx, col + dy, currentNode);
    }
  }

  this.grid[row][col] = currentTile;  // Unmark the cell.
};

////////////////////////////////////////////////////////////////////////////////
// The public API

function findAllSolutions(grid, dict) {
  console.log("findAllSolutions");
  let solver = new Solver(dict, grid);
  solver.solve();
  return [...solver.solutions];
}

export default findAllSolutions;
