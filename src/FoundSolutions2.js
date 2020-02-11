import React from 'react';
import './FoundSolutions.css';
import firebase from 'firebase';
import 'firebase/firestore'
import {HighestScores} from './HighestScores.js';
import {CHALLENGE_GAMES} from './challenge_games_enum.js';
import ToggleGameState from './ToggleGameState.js';

var key = [];
function FoundSolutions2({words, headerText}) {
  var allHighestScores =  HighestScores();
  //const [challengeGame, setChallengeGame] = useState(CHALLENGE_GAMES.GAME_1);

  const db = firebase.firestore();
  // Get a new write batch
  var batch = db.batch();
  // Updates the highest Score of challenge
  var docRef = db.collection("challengeGrids").doc("highestScores");
/*
  //if(challengeGame === CHALLENGE_GAMES.GAME_1){
    if( words.length > allHighestScores[0]){
      batch.update(docRef, {"highestScore1": words.length});
      alert('You currently have the highest Score');
      // Commits the batch
      batch.commit().then(function () {
        // ...
      });
    }
  //}
  //else if(challengeGame === CHALLENGE_GAMES.GAME_2){
    if( words.length > allHighestScores[1]){
      batch.update(docRef, {"highestScore2": words.length});
      // Commits the batch
      batch.commit().then(function () {
        // ...
      });
    }
    //}
  //else if(challengeGame === CHALLENGE_GAMES.GAME_3){
      if(words.length > allHighestScores[2]){
        batch.update(docRef, {"highestScore3": words.length});
        // Commits the batch
        batch.commit().then(function () {
          // ...
        });
      }
    //}
    //*/

  return (
    <div className="Found-solutions-list">
      {words.length > 0 &&
        <h4>{headerText}: {words.length}</h4>
      }
      <ul>
        {words.map((solution) => {return <li key={solution}>{solution}</li>})}
      </ul>
    </div>
  );
}

export default FoundSolutions2;
