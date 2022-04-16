import React, { useState } from "react";
import { Button, View, TextInput } from "react-native";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";

import { fetchUser } from "../../redux/actions";

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const auth = getAuth();
  const dispatch = useDispatch();

  const onSignIn = async () => {
    dispatch(fetchUser({ email, password }));
  };

  return (
    <View>
      <TextInput
        placeholder="email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <Button onPress={async () => onSignIn()} title="sign in" />
    </View>
  );
}
