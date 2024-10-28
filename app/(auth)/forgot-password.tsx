import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { images, icons } from "@/constants";
import { Link, router } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, Image, Text, View, TouchableOpacity } from "react-native";
import { useAuth, useSignIn } from "@clerk/clerk-expo";

const ForgotPasswordScreen = () => {
  const { isSignedIn } = useAuth();
  const { signIn, setActive, isLoaded } = useSignIn();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility

  // Redirect to homepage if the user is already signed in
  if (isSignedIn) {
    router.replace('/Homepage'); 
  }

  const handleCreate = useCallback(async () => {
    if (!isLoaded || !signIn) return; // Check if signIn is defined
    
    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      setSuccessfulCreation(true);
      setError('');
    } catch (err: any) { // Use 'any' type for simplicity, or define a custom error type
      console.error(err);
      setError(err.errors?.[0]?.longMessage || 'An error occurred');
    }
  }, [email, isLoaded, signIn]);

  const handleReset = useCallback(async () => {
    if (!signIn) {
      console.error('signIn is not defined');
      return;
    }

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });

      if (result?.status === 'complete') {
        // Ensure setActive is defined before invoking it
        if (setActive) {
          setActive({ session: result.createdSessionId });
        } else {
          console.error('setActive is not defined');
        }
        Alert.alert('Success', 'Password reset successful');
        router.push('/Homepage'); 
      } else {
        console.log(result);
      }
    } catch (err: any) { // Use 'any' type for simplicity
      console.error(err);
      setError(err.errors?.[0]?.longMessage || 'An error occurred');
    }
  }, [code, password, router, signIn, setActive]);

  return (
    <View className="flex-1 bg-white">
      <View className="relative w-full h-[250px]">
        <Image source={images.houseHeader} className="z-0 w-full h-[250px]" />
        <View className="bottom-70 items-center">
          <Text className="text-3xl text-black font-JakartaBold text-center text-[#0286FF]">
            Forgot Password?
          </Text>
        </View>
      </View>
      <View className="p-5 top-20">
        {!successfulCreation ? (
          <>
            <InputField
              label="Email"
              placeholder="Enter email"
              icon={icons.email}
              textContentType="emailAddress"
              value={email}
              onChangeText={setEmail}
            />
            {error ? <Text className="text-red-500">{error}</Text> : null}
            <CustomButton title="Send password reset code" onPress={handleCreate} className="mt-6" />
          </>
        ) : (
          <>
            <View className="relative">
              <InputField
                label="New Password"
                placeholder="Enter new password"
                icon={icons.lock}
                secureTextEntry={!isPasswordVisible} // Use the state to determine visibility
                textContentType="password"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)} // Toggle password visibility
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 15, // Adjust this value to vertically center the icon
                }}
              >
                <Image
                  source={isPasswordVisible ? icons.eyeOpen : icons.eyeClose} // Change icon based on visibility
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            </View>
            <InputField
              label="Reset Code"
              placeholder="Enter reset code"
              icon={icons.lock}
              keyboardType="numeric"
              value={code}
              onChangeText={setCode}
            />
            {error ? <Text className="text-red-500">{error}</Text> : null}
            <CustomButton title="Reset Password" onPress={handleReset} className="mt-6" />
          </>
        )}

        <Link href="/log-in" className="text-lg text-center text-general-200 mt-10">
          Remembered your password?{" "}
          <Text className="text-primary-500">Log In</Text>
        </Link>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
