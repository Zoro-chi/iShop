// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAt6Gi-7iVdyAanUyV_P2X0sTXd_HBi7GY",
	authDomain: "ishop-fa6b8.firebaseapp.com",
	projectId: "ishop-fa6b8",
	storageBucket: "ishop-fa6b8.appspot.com",
	messagingSenderId: "207302934077",
	appId: "1:207302934077:web:4a95785fd520fb698a3454",
	measurementId: "G-P43RPJE186",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;
