import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const config = {
    apiKey: "AIzaSyCulVAcX61K-B4NWuKnm4ovW0L4yueuE7s",
    authDomain: "crwn-db-57340.firebaseapp.com",
    projectId: "crwn-db-57340",
    storageBucket: "crwn-db-57340.appspot.com",
    messagingSenderId: "231702156004",
    appId: "1:231702156004:web:930186bd348be3a550d2f1",
    measurementId: "G-T2CNNBS0VC",
};

const firebase = initializeApp(config);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const db = getFirestore(firebase);

export const auth = getAuth(firebase);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const id = userAuth.uid;
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(doc(db, "users", id), {
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (error) {
            console.log("Error creating user", error.message);
        }
    }

    return userSnap;
};

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.warn(credential, token, user);
    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.warn(credential, errorCode, errorMessage, email);
    }
};

// Must be of type object
export const addCollection = async (collectionKey, docName, objectsToAdd) => {
    await setDoc(doc(db, collectionKey, docName), objectsToAdd);
};

export const convertCollectionSnapToMap = (collectionSnap) => {
    const transformedCollection = collectionSnap.docs.map((doc) => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items,
        };
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};
