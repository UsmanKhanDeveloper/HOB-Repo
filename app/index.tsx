import { Redirect } from "expo-router";
import {Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react';
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { NavigationContainer } from '@react-navigation/native';


const Home =() => {
  const { isSignedIn } = useAuth()

if (isSignedIn) {
  return <Redirect href="/(auth)/sign-up"/> //change and redirect to home page
}
  return <Redirect href="/(auth)/sign-up"/>;
};

export default Home; 