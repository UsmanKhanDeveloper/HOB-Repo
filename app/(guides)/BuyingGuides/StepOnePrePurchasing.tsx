import React, { useRef, useState, useEffect, forwardRef } from "react";
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
import { Question } from "@/types/type";

// Define subStepsOne outside of the component
const subStepsOneBuying = [
  {
    title: "a) Review Your Income",
    bullets: [
      {
        text: "Create a Budget",
        detail:
          "Establish a clear monthly budget to track your income and expenses.",
        resource: "https://www.mint.com",
      },
      {
        text: "Calculate Debt-to-Income Ratio",
        detail:
          "Analyze your total monthly debt payments compared to your gross monthly income.",
        resource:
          "https://www.calculator.net/debt-to-income-ratio-calculator.html",
      },
      {
        text: "Identify Other Income Sources",
        detail:
          "Include any additional income sources such as bonuses, freelance work, or rental income.",
      },
    ],
  },
  {
    title: "b) Understand Your Credit Score",
    bullets: [
      {
        text: "Check Your Credit Report",
        detail:
          "Obtain a free copy of your credit report from annualcreditreport.com to review your credit history.",
        resource: "https://www.annualcreditreport.com",
      },
      {
        text: "Improve Your Credit Score",
        detail:
          "Learn ways to improve your credit score before applying for a mortgage.",
        resource:
          "https://www.experian.com/blogs/news/2020/07/how-to-improve-your-credit-score/",
      },
      {
        text: "Understand Credit Scoring Models",
        detail:
          "Familiarize yourself with the different scoring models (FICO, VantageScore) and what factors contribute to your score.",
      },
    ],
  },
  {
    title: "c) Save for a Down Payment",
    bullets: [
      {
        text: "Determine Down Payment Percentage",
        detail:
          "Research typical down payment percentages required for different types of loans.",
        resource: "https://www.hud.gov/topics/down_payment_assistance",
      },
      {
        text: "Explore Down Payment Assistance",
        detail:
          "Look into programs that provide financial assistance for down payments.",
      },
      {
        text: "Set Up a Dedicated Savings Account",
        detail:
          "Open a separate savings account specifically for your down payment.",
      },
    ],
  },
  {
    title: "d) Get Pre-Approved for a Mortgage",
    bullets: [
      {
        text: "Research Lenders",
        detail:
          "Compare mortgage lenders to find the best rates and terms for your situation.",
        resource: "https://www.bankrate.com/mortgages/lender-reviews/",
      },
      {
        text: "Gather Necessary Documents",
        detail:
          "Prepare your financial documents to streamline the pre-approval process.",
      },
      {
        text: "Understand Pre-Approval vs. Pre-Qualification",
        detail:
          "Learn the difference between pre-approval and pre-qualification.",
      },
    ],
  },
  {
    title: "e) Determine Your Budget for a Home",
    bullets: [
      {
        text: "Consider All Associated Costs",
        detail:
          "Factor in not just the purchase price, but also closing costs, property taxes, and maintenance.",
      },
      {
        text: "Use Mortgage Calculators",
        detail:
          "Utilize online mortgage calculators to estimate your monthly payments.",
        resource: "https://www.mortgagecalculator.net",
      },
    ],
  },
];

interface StepProps {
  goToNextStep: () => void;
}

const StepOnePrePurchasing = () => {
  const [expanded, setExpanded] = useState(false); // State to track the expanded state of the main step
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Define type for selectedOption
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0)); // Animation value for fade
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index

  // State to track the expanded state of each substep
  const [expandedSubSteps, setExpandedSubSteps] = useState<boolean[]>(
    Array(subStepsOneBuying.length).fill(false)
  );

  //const scrollViewRef = useRef<ScrollView>(null); // ScrollView ref for scrolling to bottom

  const questionsStepOne: Question[] = [
    {
      question_text:
        "What is considered a good credit score for a better mortgage rate?",
      options: ["A- Below 600", "B- 600-699", "C- 750 above"],
      correct_answer: "C- 750 above",
      correct_explanation:
        "That's right! A credit score of 750 or higher generally qualifies for the best mortgage rates. If your score is lower, you might consider steps to improve it.",
      incorrect_explanation:
        "Not quite. A score of 750 or above is ideal for getting the best mortgage rates. It’s worth checking your credit score and improving it before you apply for a mortgage.",
    },
    {
      question_text: "What is the typical down payment required for a home?",
      options: [
        "A) 1% of the home’s price",
        "B) 5% to 20% of the home’s price",
        "C) 25% of the home’s price",
        "D) 50% of the home’s price",
      ],
      correct_answer: "B) 5% to 20% of the home’s price",
      correct_explanation:
        "Great! The typical down payment ranges from 5% to 20% of the home’s price, depending on the market and your financial situation.",
      incorrect_explanation:
        "Not quite. A down payment usually falls between 5% and 20%, though some buyers might be eligible for programs with lower requirements.",
    },
    {
      question_text:
        "What percentage of your monthly income should go toward housing expenses (including your mortgage)?",
      options: ["A) 10%", "B) 20%", "C) 30%", "D) 50%"],
      correct_answer: "C) 30%",
      correct_explanation:
        "Correct! A common rule of thumb is that your housing expenses should be about 30% of your monthly income to ensure affordability.",
      incorrect_explanation:
        "Actually, around 30% of your income should go toward housing expenses, including your mortgage, to keep it affordable.",
    },
    {
      question_text:
        "What is a good way to improve your credit score before applying for a mortgage?",
      options: [
        "A) Pay down outstanding debts",
        "B) Close unused credit accounts",
        "C) Make multiple credit card applications",
        "D) Ignore your credit score until you apply",
      ],
      correct_answer: "A) Pay down outstanding debts",
      correct_explanation:
        "Good job! Paying down debts helps improve your credit score, which can lead to better mortgage terms.",
      incorrect_explanation:
        "Not quite. Paying down outstanding debts is a great way to improve your credit score before applying for a mortgage.",
    },
    {
      question_text:
        "Which of the following is typically required for mortgage pre-approval?",
      options: [
        "A) Proof of income and employment",
        "B) A completed home inspection",
        "C) The exact address of the home you're buying",
        "D) Homeowners insurance",
      ],
      correct_answer: "A) Proof of income and employment",
      correct_explanation:
        "Exactly! Lenders will want proof of income and employment to assess whether you qualify for a mortgage.",
      incorrect_explanation:
        "For mortgage pre-approval, lenders primarily need proof of income and employment—not the details of the home just yet.",
    },
    {
      question_text:
        "What’s the purpose of getting pre-approved for a mortgage before house hunting?",
      options: [
        "A) To show sellers you're serious",
        "B) To secure a fixed interest rate early",
        "C) To understand your borrowing limit",
        "D) All of the above",
      ],
      correct_answer: "D) All of the above",
      correct_explanation:
        "Exactly! Getting pre-approved helps you know your budget, shows sellers you're serious, and locks in an interest rate.",
      incorrect_explanation:
        "Actually, all of these are reasons why pre-approval is important. It helps with budgeting, credibility, and securing an interest rate.",
    },
    {
      question_text:
        "What is the minimum down payment typically required for a conventional mortgage?",
      options: ["A) 0%", "B) 3%", "C) 5%", "D) 20%"],
      correct_answer: "B) 3%",
      correct_explanation:
        "Correct! Many lenders allow as little as 3% down for a conventional mortgage, though 20% is common to avoid PMI.",
      incorrect_explanation:
        "Actually, many lenders allow a minimum down payment of 3% for a conventional mortgage.",
    },
  ];

  const handleExpand = () => {
    setExpanded(!expanded);
  };

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
          //setIsCorrect(null); // Reset highlighting after fading out
          //setSelectedOption(null); // Reset selected option
        });
      }, 3000);
    });
  };

  //tried to add auto scroll to bottom but not working
  // useEffect(() => {
  //     if (explanation && scrollViewRef.current) {
  //         setTimeout(() => {
  //             scrollViewRef.current?.scrollToEnd({ animated: true });
  //         }, 1000);  // Add a small delay to ensure content is fully rendered
  //     }
  // }, [explanation]);

  const nextQuestion = () => {
    // Check if this is the last question
    if (currentQuestionIndex < questionsStepOne.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(0); // Reset to the first question
    }
    setSelectedOption(null); // Reset selected option for the next question
    setIsCorrect(null); // Reset correctness for the next question
  };

  const nextStep = () => {
    // Logic for proceeding to the next step can be added here
    console.log("Proceeding to the next step...");
  };

  return (
    // <ScrollView ref={scrollViewRef}>
    <View className="flex-1 bg-white p-4">
      <TouchableOpacity
        onPress={handleExpand}
        className="bg-blue-100 p-4 rounded-lg flex-row items-center justify-center mb-2"
      >
        <Text className="text-xl font-bold text-blue-700">
          1. Pre-Purchasing
        </Text>
      </TouchableOpacity>

      {expanded && (
        <View className="bg-gray-200 p-4 rounded-lg">
          <FlatList
            data={subStepsOneBuying}
            keyExtractor={(item) => item.title}
            renderItem={({ item, index }) => (
              <View className="mb-4">
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
                              onPress={() => Linking.openURL(bullet.resource)}
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
        </View>
      )}

      {!showQuestion && expanded && (
        <TouchableOpacity
          onPress={() => setShowQuestion(true)}
          className="mt-4 bg-blue-600 p-2 rounded-lg"
        >
          <Text className="text-white text-center">Test Your Knowledge</Text>
        </TouchableOpacity>
      )}

      {showQuestion && (
        <View className="mt-4">
          <Text className="font-bold text-lg">
            {questionsStepOne[currentQuestionIndex].question_text}
          </Text>
          {questionsStepOne[currentQuestionIndex].options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() =>
                handleOptionSelect(
                  option,
                  questionsStepOne[currentQuestionIndex]
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
          ))}
          {explanation && (
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text className="mt-2">{explanation}</Text>
            </Animated.View>
          )}
        </View>
      )}

      {selectedOption && (
        <View className="flex-row justify-between mt-4">
          <TouchableOpacity
            onPress={nextQuestion}
            className="bg-blue-600 p-2 rounded-lg"
          >
            <Text className="text-white text-center">Next Question</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={nextStep}
            className="bg-green-600 p-2 rounded-lg"
          >
            <Text className="text-white text-center">Next Step</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
    //</ScrollView>
  );
};

export default StepOnePrePurchasing;
