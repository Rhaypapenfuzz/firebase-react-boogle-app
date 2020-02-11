import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import LoginButton from './LoginButton.js';
import {GAME_STATE} from './game_state_enum.js';
import {CHALLENGE_GAMES} from './challenge_games_enum.js';
import {MULTIPLAYER} from './multiPlayer_enum.js';
import './ToggleGameState.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


export default function ToggleGameState({gameState, setGameState, challengeGame, setChallengeGame, multiPlayer, setMultiPlayer}) {

  const [buttonText, setButtonText] = useState("Start a new game!");
  const [multiPlayerText, setMultiPlayerText] = useState("Turn Multiplayer On");

  const [user, setUser] = useState(null);

  function updateGameState(challengeMode, challengeGame) {

    if (challengeMode && (gameState === GAME_STATE.IN_PROGRESS) ) {
      //do nothing
    }
    else if (challengeMode && (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) ) {
      if(challengeGame === CHALLENGE_GAMES.GAME_1){
        setChallengeGame(CHALLENGE_GAMES.GAME_1);
      }
      else if(challengeGame === CHALLENGE_GAMES.GAME_2){
        setChallengeGame(CHALLENGE_GAMES.GAME_2);
      }
      else if(challengeGame === CHALLENGE_GAMES.GAME_3){
          setChallengeGame(CHALLENGE_GAMES.GAME_3);
      }
      setGameState(GAME_STATE.CHALLENGE_MODE);
      setButtonText("End game");
    }
    else if ( !(challengeMode) && (gameState === GAME_STATE.BEFORE )  ) {
      setGameState(GAME_STATE.IN_PROGRESS);
      setButtonText("End game");
    }
    else if ( !(challengeMode) && (gameState === GAME_STATE.CHALLENGE_MODE) ) {
        setGameState(GAME_STATE.ENDED);
      setButtonText("Start a new game!");
    }
    else if (gameState === GAME_STATE.IN_PROGRESS ) {
      setGameState(GAME_STATE.ENDED);
      setButtonText("Start a new game!");
    }
    else if ( gameState === GAME_STATE.ENDED) {
      setGameState(GAME_STATE.BEFORE);
      setButtonText("Start a new game!");
    }

  }
  function toggleMultiPlayer(){
    if(multiPlayerText === "Turn Multiplayer On" ){
      setMultiPlayerText("Turn Multiplayer Off");
      setMultiPlayer(MULTIPLAYER.ON);
    }
    else if(multiPlayerText === "Turn Multiplayer Off" ){
      setMultiPlayerText("Turn Multiplayer On");
      setMultiPlayer(MULTIPLAYER.OFF);
    }

  }

  function ChallengesDropdownMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
          Load Challenges!
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          >
          <MenuItem onClick={() => updateGameState(true, CHALLENGE_GAMES.GAME_1)} >Challenge 1</MenuItem>
          <MenuItem onClick={() => updateGameState(true, CHALLENGE_GAMES.GAME_2)} >Challenge 2</MenuItem>
          <MenuItem onClick={() => updateGameState(true, CHALLENGE_GAMES.GAME_3)} >Challenge 3</MenuItem>
        </Menu>
      </div>
    );
  }

  return (
    <div className="Toggle-game-state">
      <LoginButton setUser={(user) => setUser(user)} />
      {user != null &&
        <p>Welcome, {user.displayName} ({user.email})</p>
      }
      <Button onClick={() => toggleMultiPlayer()} >
        {multiPlayerText}
      </Button>
      <Button onClick={() => updateGameState(false)} >
        {buttonText}
      </Button>
      <ChallengesDropdownMenu/>
    </div>
  );
}
