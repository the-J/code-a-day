import Vue from 'vue';
import firebase from 'firebase';

import App from './App.vue';
import router from './router';
import store from './store';

// Required for side-effects
require('firebase/firestore');

const config = {
    apiKey: 'AIzaSyAS8aJth8l_b_5RnJINsLeJmk78hMOCiUk',
    authDomain: 'fir-chat-e01e9.firebaseapp.com',
    databaseURL: 'https://fir-chat-e01e9.firebaseio.com',
    projectId: 'fir-chat-e01e9',
    storageBucket: '',
    messagingSenderId: '57528839553'
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

// assign db variable to window to be able to access it from anywhere
window.db = db;

// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
