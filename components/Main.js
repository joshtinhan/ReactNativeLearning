import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import { useFirestoreConnect } from "react-redux-firebase";
import { bindActionCreators } from "redux";

import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { fetchUser } from "../redux/actions/user";

export default function Main() {
  const auth = getAuth();
  const onLogout = async () => await signOut(auth);

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>user is logged in</Text>
      </View>
      <Button onPress={onLogout()} title="Log out" />
    </>
  );
}
