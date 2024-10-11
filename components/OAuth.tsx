import { View, Text, Image } from "react-native";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";

const OAuth = () => (
  <View>
    {/* "Or" Section */}
    <View className="flex flex-row justify-center items-center mt-2 gap-x-3">
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
    />
  </View>
);

export default OAuth;
