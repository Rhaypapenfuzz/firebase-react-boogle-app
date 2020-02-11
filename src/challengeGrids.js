import React from 'react';
import firebase from 'firebase';
import 'firebase/firestore'


var allCharsMap = {}; //map containing challenge Grids
export function ChallengeGrids(){

  const db = firebase.firestore();
  var challengeGrid = [];

  var docRef = db.collection("challengeGrids").doc("grids");
  docRef.get().then(function(doc) {
      if (doc.exists) {
          //console.log("Document data:", doc.data());
          allCharsMap = doc.data();
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });

  var allChallengeGrids = [];

    for (let challenge in allCharsMap){
      let chars = allCharsMap[challenge];

      if(chars.length >=  24) {
        const SIZE = 5;
        for (let row = 0; row < SIZE; row++) {
          challengeGrid[row] = [];
          for (let col = 0; col < SIZE; ++col) {
            challengeGrid[row][col] = chars[SIZE * row + col];
            if (challengeGrid[row][col] === "Q") {challengeGrid[row][col] = "Qu";}
          }
        }
        allChallengeGrids.push(challengeGrid);
        challengeGrid = [];
      }
    }

  return allChallengeGrids;
}
