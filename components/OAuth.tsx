import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Alert, Image, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { googleOAuth } from "@/lib/auth";
import React from "react";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleLogIn = async () => {
    try {
      console.log("Starting Google login flow...");
      const result = await googleOAuth(startOAuthFlow);
      console.log("Login result:", result);
  
      if (result.code === "session_exists") {
        Alert.alert("Success", "Session exists. Redirecting to home screen.");
        router.push("/(root)/Homepage");
      } else {
        Alert.alert(result.success ? "Success" : "Error", result.message);
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };
  
  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

    {/* Google Login Button */}
    <CustomButton
      title="Log In with Google"
      className="flex-row justify-center items-center bg-black border border-black rounded-full mt-2 w-[75%] py-2"
      IconLeft={() => (
        <Image
          source={icons.google}
          resizeMode="contain"
          className="w-5 h-5 mr-2"
        />
      )}
      bgVariant="outline"
        textVariant="default"
        onPress={handleGoogleLogIn}
    />
    </View>
  );
};

export default OAuth;