import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyDvvaaMS8LQQ7GT8Wd_pAtzVxHSkORUiBc",
    authDomain: "fbe4-7883f.firebaseapp.com",
    databaseURL: "https://fbe4-7883f.firebaseio.com",
    projectId: "fbe4-7883f",
    storageBucket: "fbe4-7883f.appspot.com",
    messagingSenderId: "314621195671"
  };

  export default firebase.initializeApp(config)