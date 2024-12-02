import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Linking,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { images } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";

const guideTenantRenting = () => {
  const router = useRouter();

  return (
    <>
      {/* Title View */}
      <SafeAreaView className="w-full bg-white py-4">
        <Text className="text-2xl font-bold text-center text-blue-800">
          Steps For Renting A Home
        </Text>
      </SafeAreaView>

      {/* Content Scroll View */}
      <ScrollView className="flex-1 bg-white">
        <Text className="text-lg text-center text-blue-700 mb-5 mt-3">
          ‣ Navigate Each Step Answering Questions to Track Your Progress
        </Text>
        {/* Step Components below */}
      </ScrollView>
    </>
  );
};

export default guideTenantRenting;
