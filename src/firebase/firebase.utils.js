import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBKPUITdfhFN2Pcwd2k52F4aFhovNbvpdo",
    authDomain: "crwn-db-6d1ab.firebaseapp.com",
    databaseURL: "https://crwn-db-6d1ab.firebaseio.com",
    projectId: "crwn-db-6d1ab",
    storageBucket: "crwn-db-6d1ab.appspot.com",
    messagingSenderId: "436933379143",
    appId: "1:436933379143:web:d1740983d1f98c51aedd62",
    measurementId: "G-CM2CKKQZ6W"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
