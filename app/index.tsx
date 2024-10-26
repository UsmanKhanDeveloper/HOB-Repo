import { Redirect } from "expo-router";
import {Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react';
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Home =() => {
  const { isSignedIn } = useAuth()

if (isSignedIn) {
  return <Redirect href='/Homepage/Homepage'/> //change and redirect to home page
}
  // return <Redirect href="/(auth)/sign-up"/>;
  return <Redirect href="/Homepage/Homepage"/>; 

};

export default Home; 