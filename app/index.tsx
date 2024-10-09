import { Redirect } from "expo-router";
import {Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home =() => {
    return <Redirect href="/(auth)/log-in"/>;
};

export default Home;