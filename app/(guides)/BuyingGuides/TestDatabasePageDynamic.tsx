// NewPage.js (React Native page to display substeps)
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

interface SubStep {
  id: number;
  title: string;
}

const SubstepsPage = () => {
  const [subSteps, setSubSteps] = useState<SubStep[]>([]);
  const [stepNumber, setStepNumber] = useState(1); // State to dynamically change step number

  useEffect(() => {
    // Fetch substeps from the server
    const fetchSubSteps = async () => {
      try {
        const response = await axios.get(
          `http://192.168.2.14:3000/api/substeps?step_number=${stepNumber}`
        );
        setSubSteps(response.data);
      } catch (error) {
        console.error("Error fetching substeps:", error);
      }
    };

    fetchSubSteps();
  }, [stepNumber]);

  return (
    <SafeAreaView>
      <View className="flex-1 bg-white p-4">
        <Text className="text-xl font-bold mb-4">
          Substeps for Step {stepNumber}
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
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <TouchableOpacity
            style={{
              marginHorizontal: 10,
              padding: 10,
              backgroundColor: "#007bff",
              borderRadius: 5,
            }}
            onPress={() => setStepNumber(stepNumber - 1)}
            disabled={stepNumber <= 1}
          >
            <Text style={{ color: "white" }}>Previous Step</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginHorizontal: 10,
              padding: 10,
              backgroundColor: "#28a745",
              borderRadius: 5,
            }}
            onPress={() => setStepNumber(stepNumber + 1)}
          >
            <Text style={{ color: "white" }}>Next Step</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SubstepsPage;
