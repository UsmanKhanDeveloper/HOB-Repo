import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
      <Stack>
        <Stack.Screen name="log-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />                   
        <Stack.Screen name="guides" options={{ headerShown: false }} />                    
        <Stack.Screen name="guide-Buying" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" options={{headerShown: false}}/>
      </Stack>
  );
};
export default Layout;
