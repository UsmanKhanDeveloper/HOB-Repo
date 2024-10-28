import { Stack } from 'expo-router';
import React from 'react';

const Layout = () =>{

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Homepage" options={{ headerShown: false }}/>
        <Stack.Screen name="favorites" options={{ headerShown: false }}/>
        <Stack.Screen name="log-in" options={{ headerShown: false }}/>
      </Stack>
  );
}
export default Layout;

