// TestDatabasePage.tsx (React Native page to display substeps)
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

interface SubStep {
  id: number;
  title: string;
}

const TestDatabasePage = () => {
  const [subSteps, setSubSteps] = useState<SubStep[]>([]);

  useEffect(() => {
    // Fetch substeps from the server
    const fetchSubSteps = async () => {
      try {
        const response = await axios.get(
          "http://192.168.144.14:3000/api/substeps?step_number=1"
        ); // Use 10.0.2.2 for Android emulator to connect to localhost
        setSubSteps(response.data);
      } catch (error) {
        console.error("Error fetching substeps:", error);
      }
    };

    fetchSubSteps();
  }, []);

  return (
    <SafeAreaView>
      <View className="flex-1 bg-white p-4">
        <Text className="text-xl font-bold mb-4">
          Substeps for Step One: Buying Pre-Purchasing
        </Text>
        <FlatList
          data={subSteps}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="mb-4 p-4 bg-gray-200 rounded-lg">
              <Text className="text-lg font-bold">{item.title}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default TestDatabasePage;
