import React, {forwardRef, useState} from "react";
import {Animated, FlatList, Linking, Text, TouchableOpacity, View} from "react-native";
import {Question} from "@/types/type";

const subStepsFive = [
    {
        title: 'Prepare for Closing',
        bullets: [
            {
                text: 'Review the closing disclosure to understand costs.',
                detail: 'This document outlines the final terms of your loan and closing costs.',
                resource: 'https://www.consumerfinance.gov'
            },
            {
                text: 'Schedule a final walkthrough of the property.',
                detail: 'Ensure the home is in the agreed-upon condition before closing.',
                resource: 'https://www.realtor.com'
            },
            {
                text: 'Secure homeowners insurance and provide proof to your lender.',
                detail: 'This protects your investment and is required by most lenders.',
                resource: 'https://www.nolo.com'
            },
            {
                text: 'Prepare funds for closing costs.',
                detail: 'Ensure you have the down payment and any additional closing costs ready to go.',
                resource: 'https://www.hud.gov'
            },
            {
                text: 'Confirm with your lender that all paperwork is in order.',
                detail: 'This helps avoid any last-minute issues on closing day.'
            },
        ]
    },
    {
        title: 'Attend the Closing Meeting',
        bullets: [
            {
                text: 'Bring a government-issued ID and any required documents.',
                detail: 'This includes your down payment and closing costs.',
                resource: 'https://www.hud.gov'
            },
            {
                text: 'Review and sign all closing documents carefully.',
                detail: 'Ask questions if you do not understand any part of the paperwork.',
                resource: 'https://www.consumerfinance.gov'
            },
            {
                text: 'Ensure all parties are present, including your agent and lender.',
                detail: 'This facilitates smooth communication during the meeting.'
            },
            {text: 'Receive the keys to your new home!', detail: 'Congratulations on becoming a homeowner!'},
        ]
    },
    {
        title: 'Move into Your New Home',
        bullets: [
            {
                text: 'Plan your move and hire movers if necessary.',
                detail: 'Consider timing to make the transition smoother.'
            },
            {
                text: 'Set up essential services like utilities and internet.',
                detail: 'Do this before moving in to avoid delays.'
            },
            {
                text: 'Change the locks for security reasons.',
                detail: 'It’s always good to have peace of mind in a new place.'
            },
        ]
    },
    {
        title: 'Maintain Your Investment',
        bullets: [
            {
                text: 'Create a home maintenance schedule.',
                detail: 'Regular upkeep can prevent costly repairs down the line.',
                resource: 'https://www.hgtv.com'
            },
            {
                text: 'Keep track of home improvements for future resale value.',
                detail: 'Document renovations and upgrades you make.'
            },
            {
                text: 'Stay informed about the local market to monitor your home’s value.',
                detail: 'This can help you make informed decisions in the future.'
            },
        ]
    },
];

interface StepProps {
    goToNextStep: () => void;
}

const StepFivePostPurchase = forwardRef<unknown, StepProps>(({ goToNextStep }, ref) => {
    const [expanded, setExpanded] = useState(false); // State to track the expanded state of the main step
    const [showQuestion, setShowQuestion] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null); // Define type for selectedOption
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [explanation, setExplanation] = useState<string | null>(null);
    const [fadeAnim] = useState(new Animated.Value(0)); // Animation value for fade
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index

    // State to track the expanded state of each substep
    const [expandedSubSteps, setExpandedSubSteps] = useState<boolean[]>(Array(subStepsFive.length).fill(false));

    const questionsStepFive: Question[] = [
        {
            text: "What is a closing disclosure?",
            options: ["A) A document detailing the home’s history", "B) A summary of the final loan terms and closing costs", "C) A form to apply for a mortgage", "D) An inspection report"],
            correctAnswer: "B) A summary of the final loan terms and closing costs",
            correctExplanation: "Correct! The closing disclosure provides detailed information about the mortgage and associated costs.",
            incorrectExplanation: "Not quite. A closing disclosure summarizes the final loan terms and closing costs associated with your mortgage."
        },
        {
            text: "What should you do after closing on your new home?",
            options: ["A) Immediately start renovations", "B) Change the locks", "C) Ignore the neighborhood", "D) Begin looking for a new home"],
            correctAnswer: "B) Change the locks",
            correctExplanation: "Exactly! Changing the locks is a wise security measure after closing on your new home.",
            incorrectExplanation: "Actually, changing the locks is one of the first things you should do for your safety after closing."
        },
        {
            text: "What is the purpose of a home warranty?",
            options: ["A) To cover all repair costs", "B) To provide protection for major home systems and appliances", "C) To ensure property value increases", "D) To cover moving expenses"],
            correctAnswer: "B) To provide protection for major home systems and appliances",
            correctExplanation: "Correct! A home warranty protects against repairs on essential home systems and appliances after purchase.",
            incorrectExplanation: "Not quite. A home warranty is meant to protect you from unexpected repair costs for major home systems and appliances."
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
        if (currentQuestionIndex < questionsStepFive.length - 1) {
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
                <Text className="text-xl font-bold text-blue-700">5. Post-Purchasing </Text>
            </TouchableOpacity>


            {expanded && (
                <View className="bg-gray-200 p-4 rounded-lg">
                    <FlatList
                        data={subStepsFive}
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
                    <Text className="font-bold text-lg">{questionsStepFive[currentQuestionIndex].text}</Text>
                    {questionsStepFive[currentQuestionIndex].options.map((option) => (
                        <TouchableOpacity
                            key={option}
                            onPress={() => handleOptionSelect(option, questionsStepFive[currentQuestionIndex])}
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

export default StepFivePostPurchase;