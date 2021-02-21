// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyCgvDFnHEe6vjKuuLzK0CqjZa4fq18C1K8",
  authDomain: "quora-527b9.firebaseapp.com",
  projectId: "quora-527b9",
  storageBucket: "quora-527b9.appspot.com",
  messagingSenderId: "12088768893",
  appId: "1:12088768893:web:d9a0999bba8d9e19933414",
  measurementId: "G-0H3JTJD8YZ"
  };


  const firebaseApp=firebase.initializeApp(firebaseConfig)

  const auth=firebase.auth()

  const googleProvider=new firebase.auth.GoogleAuthProvider()

  const db=firebaseApp.firestore()

  const storage=firebase.storage()

  export {auth,db,googleProvider,storage}

  

