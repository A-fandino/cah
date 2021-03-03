//Access to firebase
import firebase from "firebase";
import data from "./data";

const firebaseConfig = {
  apiKey: data.key,
  authDomain: data.authDomain,
  projectId: data.projectId,
  storageBucket: data.storageBucket,
  messagingSenderId: data.messagingSenderId,
  appId: data.appId,
  measurementId: data.measurementId,
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
firebase.analytics();

export default function accessGame(obj) {
  let nameRef = firebase.database().ref().child("games").child(obj.gameId);
  console.log(nameRef);
  if (obj.color !== "white" && obj.color !== "black" && !obj.player) {
    return nameRef;
  }
  if (obj.color === "white") {
    return (nameRef = nameRef.child(obj.player));
  }
  return nameRef.child("blackCard");
}

export function playerAccess() {
  let nameRef = firebase.database().ref().child("players");
  console.log("aaaaaaaaaaaa", nameRef);
  return nameRef;
}
