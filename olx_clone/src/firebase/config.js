import firebase  from 'firebase'
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'
// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCzCY7g2j9J6dee_TuUaVigRMutjiRm9Ww",
  authDomain: "fir-cdaf4.firebaseapp.com",
  projectId: "fir-cdaf4",
  storageBucket: "fir-cdaf4.appspot.com",
  messagingSenderId: "449419582738",
  appId: "1:449419582738:web:f3b8818fec67375deca7cb",
  measurementId: "G-PPCF3V8H3G"
};



export default firebase.initializeApp(firebaseConfig);;
