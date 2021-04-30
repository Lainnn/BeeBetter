import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDnfhoD1cLr8v6IguHfNxnmYXyN_TqvWPk",
    authDomain: "beebetter-1ec14.firebaseapp.com",
    databaseURL: "https://beebetter-1ec14-default-rtdb.firebaseio.com/",
    projectId: "beebetter-1ec14",
    storageBucket: "reactnativefirebase-00000.appspot.com",
    messagingSenderId: "000000000000000",
    appId: "1:769425988990:android:448dfd3cef0f969b33e72f"
};

firebase.initializeApp(firebaseConfig);

export default firebase;