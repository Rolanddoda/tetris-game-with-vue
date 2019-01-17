import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAR0ymUYwrhk86NTVtTcuhHjQLIWZfUQfw',
  authDomain: 'vue-simple-tetris.firebaseapp.com',
  databaseURL: 'https://vue-simple-tetris.firebaseio.com',
  projectId: 'vue-simple-tetris',
  storageBucket: 'vue-simple-tetris.appspot.com',
  messagingSenderId: '923999047218'
}
firebase.initializeApp(config)
const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

export default db
