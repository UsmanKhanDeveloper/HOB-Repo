import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { images, icons } from "@/constants";
import { Link } from "expo-router";
import React, { useState } from "react";
import {GestureResponderEvent, Image, ScrollView,Text, View} from "react-native";

const LogIn =() => {
    const [form, setForm] = useState({
        email: "",
        password: "",
      });
    

    const onLogInPress = async () =>{};

    return(
        <View className="flex-1 bg-white">
        <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.houseHeader} className="z-0 w-full h-[250px]"/>
          <View className="bottom-70 items-center">
            <Text className="text-3xl text-black font-JakartaBold text-center text-[#0286FF]">
              Welcome to House of Beginners
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
  
            <InputField
              label="Password"
              placeholder="Enter password"
              icon={icons.lock}
              secureTextEntry={true}
              textContentType="password"
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
            />
  
            <CustomButton
              title="Log In"
              onPress={onLogInPress}
              className="mt-6"
            />
            <View>
            <OAuth/>
            </View>
            <View className="p-4 bottom-10">
            <Link
              href="/sign-up"
              className="text-lg text-center text-general-200 mt-10"
            >
              Don't have an account?{" "}
              <Text className="text-primary-500">Sign Up</Text>
            </Link>
            </View>
          </View>
        </View>
      </View>
    );
};

export default LogIn;