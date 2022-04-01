import { auth, db } from "services";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  query,
  getDocs,
  collection,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      let nid, qID, docsID;
      do {
        nid = Math.random().toString(36).substring(2);
        qID = query(collection(db, "users"), where("nid", "==", nid));
        docsID = await getDocs(qID);
      } while (docsID.docs.length > 0);
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        photoUrl: user.photoURL,
        nid: nid,
      });
      await setDoc(doc(db, "relationships", user.uid), {
        friends: [],
      });
    }
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const docs = await getDocs(q);
    if (docs.docs.length > 0) {
      toast.error("This email is already in use by another user");
      return;
    }
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    let nid, qID, docsID;
    do {
      nid = Math.random().toString(36).substring(2);
      qID = query(collection(db, "users"), where("nid", "==", nid));
      docsID = await getDocs(qID);
    } while (docsID.docs.length > 0);
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      nid: nid,
    });
    await setDoc(doc(db, "relationships", user.uid), {
      friends: [],
    });
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.info("Password reset mail has been sent, please check your mailbox")
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout
};