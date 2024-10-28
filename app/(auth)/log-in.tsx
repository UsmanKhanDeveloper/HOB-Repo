import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { images, icons } from "@/constants";
import { Link, router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useAuth, useSignIn } from "@clerk/clerk-expo";

const LogIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { isSignedIn } = useAuth();
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Redirect to homepage if already signed in
  useEffect(() => {
    if (isSignedIn) {
      router.replace("/(root)/Homepage");
    }
  }, [isSignedIn]);

  const onLogInPress = useCallback(async () => {
    if (!isLoaded) return;
  
    try {
      const logInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });
  
      if (logInAttempt.status === "complete") {
        await setActive({ session: logInAttempt.createdSessionId });
        router.replace("/(root)/Homepage");
      } else {
        console.log(JSON.stringify(logInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: unknown) {
      if (err instanceof Error && "errors" in err && Array.isArray((err as any).errors)) {
        const error = (err as any).errors[0];
        Alert.alert("Error", error.longMessage);
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
      console.log(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, form, signIn, setActive]);

  return (
    <ScrollView>
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.houseHeader} className="z-0 w-full h-[250px]" />
          <View className="bottom-70 items-center">
            <Text className="text-3xl text-black font-JakartaBold text-center text-[#0286FF]">
              Welcome to Home of Beginners
            </Text>
          </View>
        </View>
        <View className="p-5 top-20">
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />

          <View className="relative">
            <InputField
              label="Password"
              placeholder="Enter password"
              icon={icons.lock}
              secureTextEntry={!isPasswordVisible}
              textContentType="password"
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={{
                position: 'absolute',
                right: 10,
                top: 15,
              }}
            >
              <Image
                source={isPasswordVisible ? icons.eyeOpen : icons.eyeClose}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          </View>

          <Link href="/forgot-password" className="text-sm left-4 text-primary-500 mt-2">
            Forgot Password?
          </Link>

          <CustomButton
            title="Log In"
            onPress={onLogInPress}
            className="mt-6"
          />
          <OAuth />
          <Link
            href="/sign-up"
            className="text-lg text-center text-general-200 mt-10"
          >
            Don't have an account?{" "}
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
          <Link
            href="/guides"
            className="text-lg text-center text-general-200 mt-10"
          >
            Go to Guides Page?{" "}
            <Text className="text-primary-500">Guides</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default LogIn;
