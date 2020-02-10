import React from 'react';
import firebase from 'firebase';
import 'firebase/firestore'


var allHighestScoresMap = {}; //map containing Highest Scores for Grids

export function HighestScores(){

  const db = firebase.firestore();

  var docRef = db.collection("challengeGrids").doc("highestScores");
  docRef.get().then(function(doc) {
      if (doc.exists) {
          //console.log("Document data:", doc.data());
          allHighestScoresMap = doc.data();
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });

  var allHighestScores = [];

    for (let score in allHighestScoresMap){
      allHighestScores.push(allHighestScoresMap[score]);
    }

  return allHighestScores;
}
