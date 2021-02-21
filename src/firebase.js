// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'


const firebaseConfig = {
  //configs
  };


  const firebaseApp=firebase.initializeApp(firebaseConfig)

  const auth=firebase.auth()

  const googleProvider=new firebase.auth.GoogleAuthProvider()

  const db=firebaseApp.firestore()

  const storage=firebase.storage()

  export {auth,db,googleProvider,storage}

  

