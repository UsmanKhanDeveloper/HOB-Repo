// StepThreeFindingAHomeDB.tsx

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

const StepThreeFindingAHomeDB = () => {
  const [expanded, setExpanded] = useState(false);
  const [subSteps, setSubSteps] = useState<SubStep[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [expandedSubSteps, setExpandedSubSteps] = useState<boolean[]>([]);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // Fetch substeps and bullets from the server
    const fetchSubSteps = async () => {
      try {
        const response = await axios.get(
          `http://192.168.125.14:3000/api/substepsThreeBuying?include_bullets=true`
        );
        const subStepsWithBullets = response.data.map((subStep: any) => ({
          ...subStep,
          bullets: subStep.bullets || [],
        }));
        setSubSteps(subStepsWithBullets);
        setExpandedSubSteps(Array(subStepsWithBullets.length).fill(false));
      } catch (error) {
        console.error("Error fetching substepsThreeBuying and bullets:", error);
      }
    };

    // Fetch questions from the server
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://192.168.125.14:3000/api/questions?step_number=3`
        );

        const parsedQuestions = response.data.map((q: any) => ({
          ...q,
          options: Array.isArray(q.options) ? q.options : [],
        }));

        setQuestions(parsedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchSubSteps();
    fetchQuestions();
  }, []);

  // Explanation fade-in and fade-out animation
  useEffect(() => {
    if (explanation) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }).start(() => {
            setExplanation(null);
          });
        }, 5000); // Show explanation for 5 seconds
      });
    }
  }, [explanation]);

  const handleSubStepExpand = (index: number) => {
    const newExpandedState = [...expandedSubSteps];
    newExpandedState[index] = !newExpandedState[index]; // Toggle the specific substep
    setExpandedSubSteps(newExpandedState);
  };

  const handleOptionSelect = (option: string, question: Question) => {
    setSelectedOption(option);
    const correct = option === question.correct_answer;
    setIsCorrect(correct);
    setExplanation(
      correct ? question.correct_explanation : question.incorrect_explanation
    );
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setExplanation(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
  };

  const handleShowQuestion = () => {
    setShowQuestion(true);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setExplanation(null);
  };

  const nextStep = () => {
    // Logic for proceeding to the next step can be added here
    console.log("Proceeding to the next step...");
  };

  return (
    <View className="bg-white p-4">
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        className="bg-blue-100 p-4 rounded-lg flex-row items-center justify-center mb-2"
      >
        <Text className="text-xl font-bold text-blue-700">
          3. Finding A Home test
        </Text>
      </TouchableOpacity>

      {expanded && (
        <>
          <FlatList
            data={subSteps}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View className="mb-4 bg-gray-200 p-4 rounded-lg">
                <TouchableOpacity
                  onPress={() => handleSubStepExpand(index)}
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

          {showQuestion && (
            <View key={`question-${currentQuestionIndex}`} className="mt-4">
              <Text className="font-bold text-lg">
                {questions[currentQuestionIndex]?.question_text}
              </Text>
              {questions[currentQuestionIndex]?.options?.map((option, idx) => (
                <TouchableOpacity
                  key={`${questions[currentQuestionIndex]?.id}-${idx}`}
                  onPress={() =>
                    handleOptionSelect(option, questions[currentQuestionIndex])
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
              ))}
              {explanation && (
                <Animated.View
                  style={{
                    opacity: fadeAnim,
                    transform: [
                      {
                        scale: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.95, 1],
                        }),
                      },
                    ],
                  }}
                >
                  <Text className="mt-2 text-center">{explanation}</Text>
                </Animated.View>
              )}

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
                      setShowQuestion(false);
                      setCurrentQuestionIndex(0);
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
  );
};

export default StepThreeFindingAHomeDB;
