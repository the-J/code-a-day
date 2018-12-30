import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBZT6oZEKPsuieYrQxoFk9tQL3bqKktcX4",
    authDomain: "vuetify-8e1bc.firebaseapp.com",
    databaseURL: "https://vuetify-8e1bc.firebaseio.com",
    projectId: "vuetify-8e1bc",
    storageBucket: "vuetify-8e1bc.appspot.com",
    messagingSenderId: "1077754234292"
};
firebase.initializeApp(config);
