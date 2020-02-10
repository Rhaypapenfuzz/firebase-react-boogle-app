import firebase from 'firebase';
//import * as firebase from 'firebase';
import 'firebase/firestore'


firebase.initializeApp({
  apiKey: "AIzaSyBWfecxjaQYVaVQTkdg3XbvQuRB-usgukI",
  authDomain: "ray-boogle.firebaseapp.com",
  databaseURL: "https://ray-boogle.firebaseio.com",
  projectId: "ray-boogle",
  storageBucket: "ray-boogle.appspot.com",
  messagingSenderId: "735876215973",
  appId: "1:735876215973:web:829d248c7605211951c94c"
});



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
    //console.log(allChallengeGrids);

  return allChallengeGrids;
}
