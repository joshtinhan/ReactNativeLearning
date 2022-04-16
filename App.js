import React, { useState, useEffect, createContext } from "react";
import { View, Text, Button } from "react-native";

import { initializeApp } from "firebase/app";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));

import { getFirestore } from "firebase/firestore";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "./components/auth/Landing";
import Register from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import MainScreen from "./components/Main";
const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyC1hHX9ghRV7Vo_erEDD-56UHVWDF49nkY",
  authDomain: "trafficam-8afb3.firebaseapp.com",
  projectId: "trafficam-8afb3",
  storageBucket: "trafficam-8afb3.appspot.com",
  messagingSenderId: "521739341675",
  appId: "1:521739341675:web:d71bac5c928bb85607462e",
  measurementId: "G-EDXQLN3SWR",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [loadingStatus, setLoadingStatus] = useState({
    isLoaded: false,
    isLoggedIn: false,
  });
  const [userName, setUserName] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        return setLoadingStatus({ isLoaded: true, isLoggedIn: false });
      }
      console.log(user);
      const { displayName } = user;
      setLoadingStatus({ isLoaded: true, isLoggedIn: true });
      setUserName(displayName);
    });
  }, [loadingStatus.isLoaded]);

  const NotLoaded = ({ loadingStatus, userName }) => {
    const { isLoaded, isLoggedIn } = loadingStatus;
    if (!isLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading</Text>
        </View>
      );
    }
    if (isLoggedIn) {
      return <MainScreen />;
    }
    return null;
  };

  const NotLoggedIn = ({ loadingStatus }) => {
    if (!loadingStatus.isLoggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register">
              {() => <Register store={store} />}
            </Stack.Screen>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return null;
  };
  return (
    <Provider store={store}>
      <NotLoaded loadingStatus={loadingStatus} userName={userName} />
      <NotLoggedIn loadingStatus={loadingStatus} />
    </Provider>
  );
}
