import React, { useState, useEffect } from "react";
import { Button, View, TextInput } from "react-native";
import { connect } from "react-redux";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/actions";
export default function Register(props) {
  console.log(props);
  //   const { db } = props;
  const [isFetched, setIsFetched] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [uid, setUid] = useState(null);

  const auth = getAuth();

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(isFetched);
    if (isFetched) {
      // const createData = async () => {
      //   const result = await createUserWithEmailAndPassword(
      //     auth,
      //     email,
      //     password
      //   );
      //   console.log(result);
      //   setUid(result.user.uid);
      //   const updateResult = await updateProfile(auth.currentUser, {
      //     displayName: name,
      //   });
      //   const {
      //     user: { email: resutEmail, displayName, uid },
      //   } = result;

      //   const docRef = await addDoc(collection(db, "users"), {
      //     name: displayName,
      //     email: resutEmail,
      //     uid,
      //   });
      // };
      dispatch(createUser({ email, password, name }));
      return () => {
        setIsFetched(false);
      };
    }
  }, [isFetched]);
  return (
    <View>
      <TextInput placeholder="name" onChangeText={(name) => setName(name)} />
      <TextInput
        placeholder="email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <Button onPress={() => setIsFetched(true)} title="sign up" />
    </View>
  );
}
