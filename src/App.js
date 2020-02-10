import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import findAllSolutions from './solver.js';
import Board from './Board.js';
import GuessInput from './GuessInput.js';
import FoundSolutions from './FoundSolutions.js';
import ToggleGameState from './ToggleGameState.js';
import './App.css';
import {GAME_STATE} from './game_state_enum.js';
import {CHALLENGE_GAMES} from './challenge_games_enum.js';
import {RandomGrid} from './random_grid.js';
import TextInput from './TextInput.js';
import {ChallengeGrids} from './challengeGrids.js';
import {HighestScores} from './HighestScores.js';
//import UploadImages from './UploadImages.js';

function App() {
  var allChallengeGrids =  ChallengeGrids();
  var allHighestScores =  HighestScores();
  //UploadImages();
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE);
  const [challengeGame, setChallengeGame] = useState(CHALLENGE_GAMES.GAME_1);
  const [grid, setGrid] = useState([]);
  const [allSolutions, setAllSolutions] = useState([]);
  const [foundSolutions, setFoundSolutions] = useState([]);
  const [highestScoreText, setHighestScoreText] = useState("");

  // useEffect will trigger when the array items in the second argument are
  // updated so whenever grid is updated, we will recompute the solutions
  useEffect(() => {
    const wordList = require('./full-wordlist.json');
    let tmpAllSolutions = findAllSolutions(grid, wordList.words);
    setAllSolutions(tmpAllSolutions);

  }, [grid]);

  // This will run when gameState changes.
  // When a new game is started, generate a new random grid and reset solutions
  useEffect(() => {
    console.log(gameState);
    if (gameState === GAME_STATE.IN_PROGRESS) {
      setGrid(RandomGrid());
      setFoundSolutions([]);
    }
    else if (gameState === GAME_STATE.CHALLENGE_MODE) {
      if(challengeGame === CHALLENGE_GAMES.GAME_1){
        setGrid(allChallengeGrids[0]);
        setHighestScoreText(allHighestScores[0]);
        console.log(highestScoreText);
      }
      else if(challengeGame === CHALLENGE_GAMES.GAME_2){
        setGrid(allChallengeGrids[1]);
        setHighestScoreText(allHighestScores[1]);
      }
      else if(challengeGame === CHALLENGE_GAMES.GAME_3){
        setGrid(allChallengeGrids[2]);
        setHighestScoreText(allHighestScores[2]);
      }
      setFoundSolutions([]);
    }
  }, [gameState, challengeGame]);

  function correctAnswerFound(answer) {
    console.log("New correct answer:" + answer);
    setFoundSolutions([...foundSolutions, answer]);
  }

  return (
    <div className="App">
      <ToggleGameState gameState={gameState}
                       setGameState={(state) => setGameState(state)}
                       challengeGame={challengeGame}
                       setChallengeGame={(challengeGame) => setChallengeGame(challengeGame)} />

      { gameState === GAME_STATE.IN_PROGRESS &&
        <div>
          <Board board={grid} />
          <GuessInput allSolutions={allSolutions}
                      foundSolutions={foundSolutions}
                      correctAnswerCallback={(answer) => correctAnswerFound(answer)}/>
          <FoundSolutions headerText="Solutions you've found" words={foundSolutions} />
        </div>
      }
      { gameState === GAME_STATE.CHALLENGE_MODE &&
        <div>
          <Board board={grid} />
          <p> High Score: {highestScoreText}</p>
          <GuessInput allSolutions={allSolutions}
                      foundSolutions={foundSolutions}
                      correctAnswerCallback={(answer) => correctAnswerFound(answer)}/>
          <FoundSolutions headerText="Solutions you've found" words={foundSolutions} />
        </div>
      }
      { gameState === GAME_STATE.ENDED &&
        <div>
          <Board board={grid} />
          <FoundSolutions headerText="All possible solutions" words={allSolutions} />
        </div>
      }
    </div>
  );
}

export default App;
