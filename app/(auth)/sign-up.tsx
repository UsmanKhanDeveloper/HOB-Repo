import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import React, { useState } from "react";
import {Image, ScrollView,Text, View} from "react-native";

const SignUp =() => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
      });

      const onSignUpPress = async() => {}


    return(
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View>
                <Image source={images.houseHeader} className="z-0 w-full h-[250px]"/>
                <Text className="text-2xl text-black font-JakartaBold text-center text-[#0286FF]">
                        Create Your Account            
                    </Text>
                </View>

            </View>
        <View className="p-4 bottom-15">
          <InputField
            label="Name"
            placeholder="Enter name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-6"
          />
          <OAuth/>
          </View>
          <View className="bottom-10">
          <Link
            href="/log-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            Already have an account?{" "}
            <Text className="text-primary-500">Log In</Text>
          </Link>
          </View>
        </ScrollView>
    );
};

export default SignUp;