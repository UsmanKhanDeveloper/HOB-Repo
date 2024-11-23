import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="log-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="guides" options={{ headerShown: false }} />
      <Stack.Screen
        name="BuyingGuides/guide-Buying"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SellingGuides/guide-Selling"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BuyingGuides/StepOnePrePurchase"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BuyingGuides/StepTwoUnderstandingMarketCondition"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BuyingGuides/StepThreeFindingAHome"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BuyingGuides/StepFourMakingAnOffer"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BuyingGuides/StepFivePostPurchase"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};
export default Layout;
