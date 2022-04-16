import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  getDocs,
  where,
  onSnapshotsInSync,
  setDoc,
  snapshotEqual,
  doc,
} from "firebase/firestore";

import { getDatabase, ref, set, get, onValue, query } from "firebase/database";

import database from "../../firebase";
const getDB = getDatabase();
console.log(database);
const auth = getAuth();

export const fetchUser = (payload) => {
  return async (dispatch) => {
    const { email, password } = payload;
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log(result);
    const { user: uid } = result;
    const userRef = ref(getDB, "users");
    const userSnapshot = await get(query(userRef));
    console.log(userSnapshot);
    // dispatch({ type: "change_user", currentUser: userName });
  };
};

export const createUser = (payload) => {
  return async (dispatch) => {
    const { email, password, name } = payload;
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const updateResult = await updateProfile(auth.currentUser, {
      displayName: name,
    });
    const {
      user: { email: resultEmail, displayName, uid },
    } = result;

    const docRef = await set(ref(getDB, "users"), {
      name: displayName,
      email: resultEmail,
      uid,
    });
    dispatch({
      type: "create_user",
      email: resultEmail,
      name: displayName,
      uid,
    });
  };
};
