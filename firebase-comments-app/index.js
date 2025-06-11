// Firebase realtime database
// https://firebase.google.com/docs/database/web/start

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  push,
  set,
  onValue,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVszXPzxHKBUiVxVuQo2dUhBnRuic_W7w",
  authDomain: "commentappmahak.firebaseapp.com",
  databaseURL: "https://commentappmahak-default-rtdb.firebaseio.com",
  projectId: "commentappmahak",
  storageBucket: "commentappmahak.firebasestorage.app",
  messagingSenderId: "463187885832",
  appId: "1:463187885832:web:dafa2276cb4d3be6aa36bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

// Reference to <ul> list in HTML
const ul = document.getElementById("messages");
const messages = ref(database, "/messages");

// Load and display existing messages
onValue(messages, (snapshot) => {
  ul.innerHTML = "";
  snapshot.forEach((childSnapshot) => {
    const childData = childSnapshot.val();
    ul.innerHTML += `<li>${childData.message} - ${childData.name}</li>`;
  });
}, {
  onlyOnce: false
});

// Add new message on button click
document.getElementById("add").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  const newMessage = push(messages);
  set(newMessage, {
    name: name,
    message: message,
    createdAt: serverTimestamp()
  });
});