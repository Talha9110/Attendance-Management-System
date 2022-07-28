import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const app = firebase.initializeApp({
	apiKey: "AIzaSyDnDZwh3NuZSDOXZoINrj7gzVYSG6_X9SU",
	authDomain: "ams-dev-79a89.firebaseapp.com",
	projectId: "ams-dev-79a89",
	storageBucket: "ams-dev-79a89.appspot.com",
	messagingSenderId: "660828486587",
	appId: "1:660828486587:web:311eb632b72de20ca1629e",
});

export const auth = app.auth();
export const db = getFirestore();
export const storage = getStorage(app);
export default app;
