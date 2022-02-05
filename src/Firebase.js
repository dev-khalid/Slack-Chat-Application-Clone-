import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getDatabase } from 'firebase/database';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyBRQMqFJ0hZBSJyPYXki4aCReK6gk0Qd8g',
  authDomain: 'slack-clone-with-react-redux.firebaseapp.com',
  projectId: 'slack-clone-with-react-redux',
  storageBucket: 'slack-clone-with-react-redux.appspot.com',
  messagingSenderId: '877960715816',
  appId: '1:877960715816:web:cea95dbb660edaaf6c5f1d',
  databaseURL:
    'https://slack-clone-with-react-redux-default-rtdb.firebaseio.com/',
  // measurementId: "G-HM6WRH9CDF"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
