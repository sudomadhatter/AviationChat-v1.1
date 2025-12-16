
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "aviationchat",
  "appId": "1:856831340418:web:41c916b1a4bc855a4ba99b",
  "storageBucket": "aviationchat.firebasestorage.app",
  "apiKey": "AIzaSyBuJR-gaZbAagH1PnbAzCTv-y0y2XUr-bY",
  "authDomain": "aviationchat.firebaseapp.com",
  "messagingSenderId": "856831340418"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
