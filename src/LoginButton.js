import React from 'react';
import firebase from 'firebase';
import Button from "@material-ui/core/Button";

function LoginButton({setUser}) {

  function logIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      console.log(result.user);
      setUser(result.user);
    }).catch(function(error) {
      console.log(error);
   });
  }

  return (
    <Button onClick={() => logIn()}>
      Login
    </Button>);
  }

export default LoginButton;
