import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
firebase.initializeApp({
  apiKey: "AIzaSyAdafM4UDojplTtpPCZP9wDrr44QyfRQjY",
  authDomain: "nfqassignment.firebaseapp.com",
  databaseURL: "https://nfqassignment.firebaseio.com",
  projectId: "nfqassignment",
  storageBucket: "nfqassignment.appspot.com",
  messagingSenderId: "1081454366253"
})


export const StoreContext = firebase.firestore()
StoreContext.settings({ timestampsInSnapshots: true })