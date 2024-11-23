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
import StepOnePrePurchasing from "@/app/(guides)/BuyingGuides/StepOnePrePurchasing";
import StepTwoUnderstandingMarketCondition from "@/app/(guides)/BuyingGuides/StepTwoUnderstandingMarketCondition";
import StepThreeFindingAHome from "@/app/(guides)/BuyingGuides/StepThreeFindingAHome";
import StepFourMakingAnOffer from "@/app/(guides)/BuyingGuides/StepFourMakingAnOffer";
import StepFivePostPurchase from "@/app/(guides)/BuyingGuides/StepFivePostPurchase";
import TestDatabasePage from "./TestDatabasePage";
import TestDatabasePageDynamic from "./TestDatabasePageDynamic";

const guideBuying = () => {
  const router = useRouter();

  const goToNextStep = (nextStep: string) => {
    router.push(nextStep as any); // Ensure this path is correct
  };

  return (
    <>
      {/* Title View */}
      <SafeAreaView className="w-full bg-white py-4">
        <Text className="text-2xl font-bold text-center text-blue-800">
          Steps For Buying A Home
        </Text>
      </SafeAreaView>

      {/* Content Scroll View */}
      <ScrollView className="flex-1 bg-white">
        <Text className="text-lg text-center text-blue-700 mb-5 mt-3">
          ‣ Navigate Each Step Answering Questions to Track Your Progress
        </Text>
        {/* Step Components below */}
        <TestDatabasePage />
        <StepOnePrePurchasing />
        <StepTwoUnderstandingMarketCondition />
        <StepThreeFindingAHome />
        <StepFourMakingAnOffer />
        <StepFivePostPurchase />
      </ScrollView>
    </>
  );
};

export default guideBuying;