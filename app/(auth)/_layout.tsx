import { Stack } from 'expo-router';
import React = require('react');

const Layout = () =>{

  return (
      <Stack>
        <Stack.Screen name="log-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>
  );
}
export default Layout;
