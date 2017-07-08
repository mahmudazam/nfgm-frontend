import firebase from 'firebase';


var config = {
    apiKey: "AIzaSyDib8fiktUwM4h_yPTmNtYA5aC-Zrzufeg",
    authDomain: "exim-food.firebaseapp.com",
    databaseURL: "https://exim-food.firebaseio.com",
    projectId: "exim-food",
    storageBucket: "exim-food.appspot.com",
    messagingSenderId: "769795342410"
};

var fire = firebase.initializeApp(config);

export default fire;