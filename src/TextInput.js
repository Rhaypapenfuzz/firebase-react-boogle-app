import React, { useState } from 'react';
import firebase from 'firebase';

/*
When using in App.js
<TextInput promptText="Name?" field="name" user={user} />
<TextInput promptText="Hometown?" field="hometown" user={user} />
*/
function TextInput({promptText, user, field}) {

  const [text, setText] = useState("");

  function getUserInput() {
    const promptResponse = prompt(promptText);
    console.log(promptResponse);
    setText(promptResponse);
    // https://firebase.google.com/docs/firestore/manage-data/add-data
    if (user && user.uid) {
      firebase.firestore().collection("users").doc(user.uid)
      .set({[field]: promptResponse}, { merge: true })
      .then(() => {
        console.log("Document written!");
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });
    }
  }

  return (
    <p>
    <button onClick={() => getUserInput()}>
      {promptText}
    </button>
    {text}
    </p>
  );
}
export default TextInput;
