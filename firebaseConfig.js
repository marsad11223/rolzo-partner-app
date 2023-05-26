import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBrecmLUknhlJ7xVV-lKnzuzNOSCWcrpYg',
  authDomain: 'https://my-project-1473251271369.firebaseio.com',
  projectId: 'my-project-1473251271369',
  storageBucket: 'my-project-1473251271369.appspot.com',
  messagingSenderId: '1:1021255257590:android:78bdba84dd42c2d12fcbd7',
  appId: '1:1021255257590:android:78bdba84dd42c2d12fcbd7',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);

export { auth, firestore, database };
