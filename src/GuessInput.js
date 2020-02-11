import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import './GuessInput.css';
import firebase from 'firebase';
import 'firebase/firestore'
import {HighestScores} from './HighestScores.js';
import {CHALLENGE_GAMES} from './challenge_games_enum.js';
import ToggleGameState from './ToggleGameState.js';


function GuessInput({allSolutions, foundSolutions, correctAnswerCallback}) {
  UpdateScore();
  const [labelText, setLabelText] = useState("Make your first guess!");
  const [input, setInput] = useState("");

  function evaluateInput(foundSolutions) {
    if (foundSolutions.includes(input)) {
      setLabelText(input + " has already been found!");
    } else if (allSolutions.includes(input)) {
      correctAnswerCallback(input);
      setLabelText(input + " is correct!");
    } else {
      setLabelText(input + " is incorrect!");
    }
  }

  function keyPress(e) {
    if (e.key === 'Enter') {
      evaluateInput(foundSolutions)
    }
  }

  function UpdateScore() {
    var allHighestScores =  HighestScores();
    const [challengeGame, setChallengeGame] = useState(CHALLENGE_GAMES.GAME_1);

    const db = firebase.firestore();
    // Get a new write batch
    var batch = db.batch();
    // Updates the highest Score of challenge
    var docRef = db.collection("challengeGrids").doc("highestScores");

    if(challengeGame === CHALLENGE_GAMES.GAME_1){
      if(foundSolutions.length > allHighestScores[0]){
        batch.update(docRef, {"highestScore1": foundSolutions.length});
        // Commits the batch
        batch.commit().then(function () {
          // ...
        });
        if(foundSolutions.length - 1 == allHighestScores[0] ){
          alert('You currently have the highest Score');
        }
      }
    }
    else if(challengeGame === CHALLENGE_GAMES.GAME_2){
      if(foundSolutions.length > allHighestScores[1]){
        batch.update(docRef, {"highestScore2": foundSolutions.length});
        // Commits the batch
        batch.commit().then(function () {
          // ...
        });
        if(foundSolutions.length - 1 == allHighestScores[1] ){
          alert('You currently have the highest Score');
        }
      }
    }
    else if(challengeGame === CHALLENGE_GAMES.GAME_3){
        if(foundSolutions.length > allHighestScores[2]){
          batch.update(docRef, {"highestScore3": foundSolutions.length});
          // Commits the batch
          batch.commit().then(function () {
            // ...
          });
          if(foundSolutions.length - 1 == allHighestScores[2] ){
            alert('You currently have the highest Score');
          }
        }
      }


  }

  return (
    <div className="Guess-input">
      <div>
        {labelText}
      </div>
      <TextField onKeyPress={(e) => keyPress(e)} onChange={(event) => setInput(event.target.value)} />
    </div>
  );
}

export default GuessInput;
