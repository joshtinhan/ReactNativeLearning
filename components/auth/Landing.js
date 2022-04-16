import React from "react";
import { Button, View } from "react-native";
export default function Landing({ navigation }) {
  const style = { flex: 1, justifyContent: "center" };
  return (
    <View style={style}>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
