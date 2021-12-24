import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const config = {
    apiKey: "AIzaSyCulVAcX61K-B4NWuKnm4ovW0L4yueuE7s",
    authDomain: "crwn-db-57340.firebaseapp.com",
    projectId: "crwn-db-57340",
    storageBucket: "crwn-db-57340.appspot.com",
    messagingSenderId: "231702156004",
    appId: "1:231702156004:web:930186bd348be3a550d2f1",
    measurementId: "G-T2CNNBS0VC",
};

const app = initializeApp(config);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth(app);

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            console.log(credential);
            console.log(token);
            console.log(user);
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);

            console.log(credential);
            console.log(errorCode);
            console.log(errorMessage);
            console.log(email);
        });
};
