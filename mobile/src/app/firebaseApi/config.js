import firebase from 'firebase';

var configFirebase = {
    apiKey: "AIzaSyC5UHVDYOkH5aAMyHi2W2q8qL2ZCbgm5gM",
    authDomain: "datncsplayer.firebaseapp.com",
    databaseURL: "https://datncsplayer.firebaseio.com",
    projectId: "datncsplayer",
    storageBucket: "datncsplayer.appspot.com",
    messagingSenderId: "24905739904"
};

export const firebaseApp = firebase.initializeApp(configFirebase);