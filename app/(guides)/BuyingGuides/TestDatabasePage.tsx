// TestDatabasePage.tsx (React Native page to display substeps)
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  Linking,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { Question } from "@/types/type";

interface Bullet {
  id: number;
  text: string;
  detail?: string;
  resource?: string;
}

interface SubStep {
  id: number;
  title: string;
  bullets: Bullet[];
}

const TestDatabasePage = () => {
  const [expanded, setExpanded] = useState(false); // State to track the expanded state of the main step
  const [subSteps, setSubSteps] = useState<SubStep[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [expandedSubSteps, setExpandedSubSteps] = useState<boolean[]>([]);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [questionsLoaded, setQuestionsLoaded] = useState(false);
  // const [forceRender, setForceRender] = useState(0); // State to force re-render

  useEffect(() => {
    // Fetch substeps and bullets from the server
    const fetchSubSteps = async () => {
      let allSubSteps: SubStep[] = []; // Temporary array to hold all substeps

      for (let i = 0; i < 6; i++) {
        try {
          const response = await axios.get(
            `http://192.168.2.16:3000/api/substeps?step_number=${i}&include_bullets=true`
          );
          const subStepsWithBullets = response.data.map((subStep: any) => {
            return {
              ...subStep,
              bullets: subStep.bullets || [],
            };
          });
          allSubSteps = [...allSubSteps, ...subStepsWithBullets];
        } catch (error) {
          console.error("Error fetching substeps and bullets:", error);
        }
      }

      // Set the accumulated substeps
      setSubSteps(allSubSteps);
      setExpandedSubSteps(Array(allSubSteps.length).fill(false));
    };

    // Fetch questions from the server
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://192.168.2.16:3000/api/questions?step_number=1`
        );
        console.log("Fetched Questions:", response.data); // Debug log
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    // Call the async functions
    fetchSubSteps();
    fetchQuestions();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedSubSteps((prevExpanded) =>
      prevExpanded.map((exp, i) => (i === index ? !exp : exp))
    );
  };

  const handleOptionSelect = (option: string, question: Question) => {
    setSelectedOption(option);
    const correct = option === question.correctAnswer;
    setIsCorrect(correct);
    setExplanation(
      correct ? question.correctExplanation : question.incorrectExplanation
    );
  };

  // Fade in explanation
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start(() => {
    setTimeout(() => {
      // Fade out after 3 seconds
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setExplanation(null);
      });
    }, 3000);
  });

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(0); // Reset to the first question
    }
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleShowQuestion = () => {
    // Directly set showQuestion to true
    setShowQuestion((prev) => {
      console.log("Previous showQuestion state:", prev);
      return true;
    });

    // Forcefully re-render if needed
    setTimeout(() => {
      console.log("Forcing re-render...");
      console.log(showQuestion);
    }, 100);
  };

  return (
    <SafeAreaView>
      <View className="flex-1 bg-white p-4">
        {/* Main Step Toggle Button */}
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          className="bg-blue-100 p-4 rounded-lg flex-row items-center justify-center mb-2"
        >
          <Text className="text-xl font-bold text-blue-700">
            1. Pre-Purchasing
          </Text>
        </TouchableOpacity>

        {/* Substeps List */}
        {expanded && (
          <FlatList
            data={subSteps}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View className="mb-4 p-4 bg-gray-200 rounded-lg">
                <TouchableOpacity
                  onPress={() => toggleExpand(index)}
                  className="flex-row items-center justify-between bg-gray-300 p-3 rounded-lg"
                >
                  <Text className="text-lg font-bold">{item.title}</Text>
                  <Text>{expandedSubSteps[index] ? "-" : "+"}</Text>
                </TouchableOpacity>
                {expandedSubSteps[index] && (
                  <View className="ml-4">
                    {item.bullets.map((bullet, bulletIndex) => (
                      <View key={bulletIndex} className="mb-2">
                        <Text className="font-semibold">• {bullet.text}</Text>
                        {bullet.detail && (
                          <Text className="mt-1 text-sm text-gray-700">
                            {bullet.detail}
                          </Text>
                        )}
                        {bullet.resource && (
                          <Text className="mt-1 text-sm">
                            <Text style={{ color: "black" }}>
                              Helpful link:{" "}
                            </Text>
                            <Text
                              className="text-blue-500 underline"
                              onPress={() =>
                                Linking.openURL(bullet.resource || "")
                              }
                            >
                              {bullet.resource}
                            </Text>
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}
          />
        )}

        {expanded && (
          <>
            {!showQuestion && (
              <TouchableOpacity
                onPress={() => {
                  if (questions.length > 0) {
                    handleShowQuestion();
                  }
                }}
                className="mt-4 bg-blue-600 p-2 rounded-lg"
              >
                <Text className="text-white text-center">
                  Test Your Knowledge
                </Text>
              </TouchableOpacity>
            )}

            {showQuestion && questions.length > 0 && (
              <View className="mt-4">
                <Text className="font-bold text-lg">
                  {questions[currentQuestionIndex]?.text}
                </Text>
                {questions[currentQuestionIndex]?.options?.map(
                  (option, idx) => (
                    <TouchableOpacity
                      key={idx}
                      onPress={() =>
                        handleOptionSelect(
                          option,
                          questions[currentQuestionIndex]
                        )
                      }
                      className={`p-2 rounded-lg mt-2 ${
                        selectedOption === option
                          ? isCorrect
                            ? "bg-green-200"
                            : "bg-red-200"
                          : "bg-gray-300"
                      }`}
                    >
                      <Text>{option}</Text>
                    </TouchableOpacity>
                  )
                )}
                {explanation && (
                  <Animated.View style={{ opacity: fadeAnim }}>
                    <Text className="mt-2">{explanation}</Text>
                  </Animated.View>
                )}

                {/* Render the Next Question and Next Step buttons only when an option has been selected */}
                {selectedOption && (
                  <View className="flex-row justify-between mt-4">
                    <TouchableOpacity
                      onPress={nextQuestion}
                      className="bg-blue-600 p-2 rounded-lg"
                    >
                      <Text className="text-white text-center">
                        Next Question
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setShowQuestion(false); // Reset the quiz view after the step
                        setCurrentQuestionIndex(0); // Reset the question index
                      }}
                      className="bg-green-600 p-2 rounded-lg"
                    >
                      <Text className="text-white text-center">Next Step</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TestDatabasePage;
