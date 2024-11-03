import React, {forwardRef, useState} from "react";
import {Animated, FlatList, Linking, Text, TouchableOpacity, View} from "react-native";
import {Question} from "@/types/type";

const subStepsTwo = [
    {
        title: 'Research Local Market Trends',
        bullets: [
            {
                text: 'Look into recent sales in your desired neighborhoods.',
                detail: 'Check websites like Zillow, Realtor.com, and local real estate listings.',
                resource: 'https://www.zillow.com'
            },
            {
                text: 'Observe the average days on market for homes.',
                detail: 'This indicates how quickly homes are selling in the area.'
            },
            {
                text: 'Analyze the price per square foot in different neighborhoods.',
                detail: 'Compare different areas to determine where you can get the most value.'
            },
        ]
    },
    {
        title: 'Understand Economic Indicators',
        bullets: [
            {
                text: 'Review interest rates and how they affect purchasing power.',
                detail: 'Lower rates can make buying a home more affordable.',
                resource: 'https://www.realtor.com'
            },
            {
                text: 'Follow job growth and unemployment rates in your area.',
                detail: 'These can influence housing demand and prices.'
            },
            {
                text: 'Consider local government policies affecting real estate.',
                detail: 'These can include taxes, incentives for homebuyers, and zoning laws.'
            },
        ]
    },
    {
        title: 'Analyze Housing Inventory',
        bullets: [
            {
                text: 'Evaluate the number of homes available for sale.',
                detail: 'A low inventory can lead to competitive bidding situations.'
            },
            {
                text: 'Look into the types of homes available: new builds vs. resales.',
                detail: 'Each has different pros and cons regarding price and upkeep.'
            },
            {
                text: 'Understand seasonal trends in housing inventory.',
                detail: 'Inventory often rises in spring and summer and falls in fall and winter.',
                resource: 'https://www.hud.gov'
            },
        ]
    },
];
interface StepProps {
    goToNextStep: () => void;
}

const StepTwoUnderstandingMarketCondition = forwardRef<unknown, StepProps>(({ goToNextStep }, ref) => {
    const [expanded, setExpanded] = useState(false); // State to track the expanded state of the main step
    const [showQuestion, setShowQuestion] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null); // Define type for selectedOption
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [explanation, setExplanation] = useState<string | null>(null);
    const [fadeAnim] = useState(new Animated.Value(0)); // Animation value for fade
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index

    // State to track the expanded state of each substep
    const [expandedSubSteps, setExpandedSubSteps] = useState<boolean[]>(Array(subStepsTwo.length).fill(false));

    const questionsStepTwo: Question[] = [
        {
            text: "What is a common indicator of a buyer's market?",
            options: ["A) High demand and low inventory", "B) Decreasing home prices", "C) Multiple offers on properties", "D) Rapid sales"],
            correctAnswer: "B) Decreasing home prices",
            correctExplanation: "Correct! A buyer's market is typically characterized by decreasing home prices due to higher inventory and lower demand.",
            incorrectExplanation: "Not quite. A buyer's market usually features decreasing home prices, as demand is lower than supply."
        },
        {
            text: "How can you assess whether it's a good time to buy a home?",
            options: ["A) Check current mortgage rates", "B) Analyze local job market trends", "C) Monitor the housing inventory in your area", "D) All of the above"],
            correctAnswer: "D) All of the above",
            correctExplanation: "Exactly! All these factors can indicate whether it’s a favorable time to buy a home.",
            incorrectExplanation: "Actually, you should consider all of these factors to determine if it's a good time to buy."
        },
        {
            text: "What role does the local economy play in the housing market?",
            options: ["A) It has no impact", "B) It influences home prices and demand", "C) It only affects rental prices", "D) It’s only important for commercial real estate"],
            correctAnswer: "B) It influences home prices and demand",
            correctExplanation: "Correct! The local economy directly impacts job stability and income levels, affecting housing demand and prices.",
            incorrectExplanation: "Not quite. The local economy significantly influences home prices and demand in the housing market."
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
        const correct = option === question.correctAnswer;
        setIsCorrect(correct);
        setExplanation(correct ? question.correctExplanation : question.incorrectExplanation);

        // Fade in explanation
        Animated.timing(fadeAnim, {toValue: 1, duration: 500, useNativeDriver: true}).start(() => {
            setTimeout(() => {
                // Fade out after 3 seconds
                Animated.timing(fadeAnim, {toValue: 0, duration: 500, useNativeDriver: true}).start(() => {
                    setExplanation(null);
                    //setIsCorrect(null); // Reset highlighting after fading out
                    //setSelectedOption(null); // Reset selected option
                });
            }, 3000);
        });
    };

    const nextQuestion = () => {
        // Check if this is the last question
        if (currentQuestionIndex < questionsStepTwo.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setCurrentQuestionIndex(0); // Reset to the first question
        }
        setSelectedOption(null); // Reset selected option for the next question
        setIsCorrect(null); // Reset correctness for the next question
    };

    const nextStep = () => {
        // Logic for proceeding to the next step can be added here
        console.log('Proceeding to the next step...');
    };

    return (
        // <ScrollView ref={scrollViewRef}>
        <View className="flex-1 bg-white p-4">
            <TouchableOpacity onPress={handleExpand}
                              className="bg-blue-100 p-4 rounded-lg flex-row items-center justify-center mb-2">
                <Text className="text-xl font-bold text-blue-700">2. Understanding Market Conditions </Text>
            </TouchableOpacity>


            {expanded && (
                <View className="bg-gray-200 p-4 rounded-lg">
                    <FlatList
                        data={subStepsTwo}
                        keyExtractor={(item) => item.title}
                        renderItem={({item, index}) => (
                            <View className="mb-4">
                                <TouchableOpacity onPress={() => handleSubStepExpand(index)}
                                                  className="flex-row items-center justify-between bg-gray-300 p-3 rounded-lg">
                                    <Text className="text-lg font-bold">{item.title}</Text>
                                    <Text>{expandedSubSteps[index] ? '-' : '+'}</Text>
                                </TouchableOpacity>
                                {expandedSubSteps[index] && (
                                    <View className="ml-4">
                                        {item.bullets.map((bullet, bulletIndex) => (
                                            <View key={bulletIndex} className="mb-2">
                                                <Text className="font-semibold">• {bullet.text}</Text>
                                                {bullet.detail && (
                                                    <Text className="mt-1 text-sm text-gray-700">{bullet.detail}</Text>
                                                )}
                                                {bullet.resource && (
                                                    <Text className="mt-1 text-sm">
                                                        <Text style={{color: 'black'}}>Helpful link: </Text>
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
                <TouchableOpacity onPress={() => setShowQuestion(true)} className="mt-4 bg-blue-600 p-2 rounded-lg">
                    <Text className="text-white text-center">Test Your Knowledge</Text>
                </TouchableOpacity>
            )}

            {showQuestion && (
                <View className="mt-4">
                    <Text className="font-bold text-lg">{questionsStepTwo[currentQuestionIndex].text}</Text>
                    {questionsStepTwo[currentQuestionIndex].options.map((option) => (
                        <TouchableOpacity
                            key={option}
                            onPress={() => handleOptionSelect(option, questionsStepTwo[currentQuestionIndex])}
                            className={`p-2 rounded-lg mt-2 ${selectedOption === option ? (isCorrect ? 'bg-green-200' : 'bg-red-200') : 'bg-gray-300'}`}
                        >
                            <Text>{option}</Text>
                        </TouchableOpacity>
                    ))}
                    {explanation && (
                        <Animated.View style={{opacity: fadeAnim}}>
                            <Text className="mt-2">{explanation}</Text>
                        </Animated.View>
                    )}

                </View>
            )}


            {selectedOption && (<View className="flex-row justify-between mt-4">
                <TouchableOpacity onPress={nextQuestion} className="bg-blue-600 p-2 rounded-lg">
                    <Text className="text-white text-center">Next Question</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToNextStep} className="bg-green-600 p-2 rounded-lg">
                    <Text className="text-white text-center">Next Step</Text>
                </TouchableOpacity>
            </View>)}

        </View>
        //</ScrollView>
    );
});

export default StepTwoUnderstandingMarketCondition;