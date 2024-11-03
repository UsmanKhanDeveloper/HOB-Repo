import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image, FlatList, Linking, Animated} from 'react-native';
import {useRouter} from 'expo-router';
import {images} from "@/constants";
import {SafeAreaView} from "react-native-safe-area-context";
import StepOnePrePurchasing from '@/app/(auth)/StepOnePrePurchasing';
import StepTwoUnderstandingMarketCondition from "@/app/(auth)/StepTwoUnderstandingMarketCondition";
import StepThreeFindingAHome from "@/app/(auth)/StepThreeFindingAHome";
import StepFourMakingAnOffer from "@/app/(auth)/StepFourMakingAnOffer";
import StepFivePostPurchase from "@/app/(auth)/StepFivePostPurchase";

interface Question {
    text: string;
    options: string[];
    correctAnswer: string;
    correctExplanation: string;
    incorrectExplanation: string;
}

// // Define subStepsOne outside of the component
// const subStepsOne = [
//     {
//         title: "a) Review Your Income",
//         bullets: [
//             {
//                 text: "Create a Budget",
//                 detail: "Establish a clear monthly budget to track your income and expenses.",
//                 resource: "https://www.mint.com"
//             },
//             {
//                 text: "Calculate Debt-to-Income Ratio",
//                 detail: "Analyze your total monthly debt payments compared to your gross monthly income.",
//                 resource: "https://www.calculator.net/debt-to-income-ratio-calculator.html"
//             },
//             {
//                 text: "Identify Other Income Sources",
//                 detail: "Include any additional income sources such as bonuses, freelance work, or rental income."
//             }
//         ]
//     },
//     {
//         title: "b) Understand Your Credit Score",
//         bullets: [
//             {
//                 text: "Check Your Credit Report",
//                 detail: "Obtain a free copy of your credit report from annualcreditreport.com to review your credit history.",
//                 resource: "https://www.annualcreditreport.com"
//             },
//             {
//                 text: "Improve Your Credit Score",
//                 detail: "Learn ways to improve your credit score before applying for a mortgage.",
//                 resource: "https://www.experian.com/blogs/news/2020/07/how-to-improve-your-credit-score/"
//             },
//             {
//                 text: "Understand Credit Scoring Models",
//                 detail: "Familiarize yourself with the different scoring models (FICO, VantageScore) and what factors contribute to your score."
//             }
//         ]
//     },
//     {
//         title: "c) Save for a Down Payment",
//         bullets: [
//             {
//                 text: "Determine Down Payment Percentage",
//                 detail: "Research typical down payment percentages required for different types of loans.",
//                 resource: "https://www.hud.gov/topics/down_payment_assistance"
//             },
//             {
//                 text: "Explore Down Payment Assistance",
//                 detail: "Look into programs that provide financial assistance for down payments."
//             },
//             {
//                 text: "Set Up a Dedicated Savings Account",
//                 detail: "Open a separate savings account specifically for your down payment."
//             }
//         ]
//     },
//     {
//         title: "d) Get Pre-Approved for a Mortgage",
//         bullets: [
//             {
//                 text: "Research Lenders",
//                 detail: "Compare mortgage lenders to find the best rates and terms for your situation.",
//                 resource: "https://www.bankrate.com/mortgages/lender-reviews/"
//             },
//             {
//                 text: "Gather Necessary Documents",
//                 detail: "Prepare your financial documents to streamline the pre-approval process."
//             },
//             {
//                 text: "Understand Pre-Approval vs. Pre-Qualification",
//                 detail: "Learn the difference between pre-approval and pre-qualification."
//             }
//         ]
//     },
//     {
//         title: "e) Determine Your Budget for a Home",
//         bullets: [
//             {
//                 text: "Consider All Associated Costs",
//                 detail: "Factor in not just the purchase price, but also closing costs, property taxes, and maintenance."
//             },
//             {
//                 text: "Use Mortgage Calculators",
//                 detail: "Utilize online mortgage calculators to estimate your monthly payments.",
//                 resource: "https://www.mortgagecalculator.net"
//             }
//         ]
//     },
// ];
//
// interface StepOnePrePurchasingProps {
//     goToNextStep?: () => void
// }
//
// const StepOnePrePurchasing = ({goToNextStep}: StepOnePrePurchasingProps) => {
//     const [expanded, setExpanded] = useState(false); // State to track the expanded state of the main step
//     const [showQuestion, setShowQuestion] = useState(false);
//     const [selectedOption, setSelectedOption] = useState<string | null>(null); // Define type for selectedOption
//     const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
//     const [explanation, setExplanation] = useState<string | null>(null);
//     const [fadeAnim] = useState(new Animated.Value(0)); // Animation value for fade
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index
//
//     // State to track the expanded state of each substep
//     const [expandedSubSteps, setExpandedSubSteps] = useState<boolean[]>(Array(subStepsOne.length).fill(false));
//
//     //const scrollViewRef = useRef<ScrollView>(null); // ScrollView ref for scrolling to bottom
//
//     const questionsStepOne: Question[] = [
//         {
//             text: "What is considered a good credit score for a better mortgage rate?",
//             options: ["A- Below 600", "B- 600-699", "C- 750 above"],
//             correctAnswer: "C- 750 above",
//             correctExplanation: "That's right! A credit score of 750 or higher generally qualifies for the best mortgage rates. If your score is lower, you might consider steps to improve it.",
//             incorrectExplanation: "Not quite. A score of 750 or above is ideal for getting the best mortgage rates. It’s worth checking your credit score and improving it before you apply for a mortgage."
//         },
//         {
//             text: "What is the typical down payment required for a home?",
//             options: [
//                 "A) 1% of the home’s price",
//                 "B) 5% to 20% of the home’s price",
//                 "C) 25% of the home’s price",
//                 "D) 50% of the home’s price"
//             ],
//             correctAnswer: "B) 5% to 20% of the home’s price",
//             correctExplanation: "Great! The typical down payment ranges from 5% to 20% of the home’s price, depending on the market and your financial situation.",
//             incorrectExplanation: "Not quite. A down payment usually falls between 5% and 20%, though some buyers might be eligible for programs with lower requirements."
//         },
//         {
//             text: "What percentage of your monthly income should go toward housing expenses (including your mortgage)?",
//             options: ["A) 10%", "B) 20%", "C) 30%", "D) 50%"],
//             correctAnswer: "C) 30%",
//             correctExplanation: "Correct! A common rule of thumb is that your housing expenses should be about 30% of your monthly income to ensure affordability.",
//             incorrectExplanation: "Actually, around 30% of your income should go toward housing expenses, including your mortgage, to keep it affordable."
//         },
//         {
//             text: "What is a good way to improve your credit score before applying for a mortgage?",
//             options: ["A) Pay down outstanding debts", "B) Close unused credit accounts", "C) Make multiple credit card applications", "D) Ignore your credit score until you apply"],
//             correctAnswer: "A) Pay down outstanding debts",
//             correctExplanation: "Good job! Paying down debts helps improve your credit score, which can lead to better mortgage terms.",
//             incorrectExplanation: "Not quite. Paying down outstanding debts is a great way to improve your credit score before applying for a mortgage."
//         },
//         {
//             text: "Which of the following is typically required for mortgage pre-approval?",
//             options: ["A) Proof of income and employment", "B) A completed home inspection", "C) The exact address of the home you're buying", "D) Homeowners insurance"],
//             correctAnswer: "A) Proof of income and employment",
//             correctExplanation: "Exactly! Lenders will want proof of income and employment to assess whether you qualify for a mortgage.",
//             incorrectExplanation: "For mortgage pre-approval, lenders primarily need proof of income and employment—not the details of the home just yet."
//         },
//         {
//             text: "What’s the purpose of getting pre-approved for a mortgage before house hunting?",
//             options: ["A) To show sellers you're serious", "B) To secure a fixed interest rate early", "C) To understand your borrowing limit", "D) All of the above"],
//             correctAnswer: "D) All of the above",
//             correctExplanation: "Exactly! Getting pre-approved helps you know your budget, shows sellers you're serious, and locks in an interest rate.",
//             incorrectExplanation: "Actually, all of these are reasons why pre-approval is important. It helps with budgeting, credibility, and securing an interest rate."
//         },
//         {
//             text: "What is the minimum down payment typically required for a conventional mortgage?",
//             options: ["A) 0%", "B) 3%", "C) 5%", "D) 20%"],
//             correctAnswer: "B) 3%",
//             correctExplanation: "Correct! Many lenders allow as little as 3% down for a conventional mortgage, though 20% is common to avoid PMI.",
//             incorrectExplanation: "Actually, many lenders allow a minimum down payment of 3% for a conventional mortgage."
//         },
//     ];
//
//     const handleExpand = () => {
//         setExpanded(!expanded);
//     };
//
//     const handleSubStepExpand = (index: number) => {
//         const newExpandedState = [...expandedSubSteps];
//         newExpandedState[index] = !newExpandedState[index]; // Toggle the specific substep
//         setExpandedSubSteps(newExpandedState);
//     };
//
//     const handleOptionSelect = (option: string, question: Question) => {
//         setSelectedOption(option);
//         const correct = option === question.correctAnswer;
//         setIsCorrect(correct);
//         setExplanation(correct ? question.correctExplanation : question.incorrectExplanation);
//
//         // Fade in explanation
//         Animated.timing(fadeAnim, {toValue: 1, duration: 500, useNativeDriver: true}).start(() => {
//             setTimeout(() => {
//                 // Fade out after 3 seconds
//                 Animated.timing(fadeAnim, {toValue: 0, duration: 500, useNativeDriver: true}).start(() => {
//                     setExplanation(null);
//                     //setIsCorrect(null); // Reset highlighting after fading out
//                     //setSelectedOption(null); // Reset selected option
//                 });
//             }, 3000);
//         });
//     };
//
//     //tried to add auto scroll to bottom but not working
//     // useEffect(() => {
//     //     if (explanation && scrollViewRef.current) {
//     //         setTimeout(() => {
//     //             scrollViewRef.current?.scrollToEnd({ animated: true });
//     //         }, 1000);  // Add a small delay to ensure content is fully rendered
//     //     }
//     // }, [explanation]);
//
//     const nextQuestion = () => {
//         // Check if this is the last question
//         if (currentQuestionIndex < questionsStepOne.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//         } else {
//             setCurrentQuestionIndex(0); // Reset to the first question
//         }
//         setSelectedOption(null); // Reset selected option for the next question
//         setIsCorrect(null); // Reset correctness for the next question
//     };
//
//     const nextStep = () => {
//         // Logic for proceeding to the next step can be added here
//         console.log('Proceeding to the next step...');
//     };
//
//     return (
//         // <ScrollView ref={scrollViewRef}>
//         <View className="flex-1 bg-white p-4">
//             <TouchableOpacity onPress={handleExpand}
//                               className="bg-blue-100 p-4 rounded-lg flex-row items-center justify-center mb-2">
//                 <Text className="text-xl font-bold text-blue-700">1. Pre-Purchasing</Text>
//             </TouchableOpacity>
//
//
//             {expanded && (
//                 <View className="bg-gray-200 p-4 rounded-lg">
//                     <FlatList
//                         data={subStepsOne}
//                         keyExtractor={(item) => item.title}
//                         renderItem={({item, index}) => (
//                             <View className="mb-4">
//                                 <TouchableOpacity onPress={() => handleSubStepExpand(index)}
//                                                   className="flex-row items-center justify-between bg-gray-300 p-3 rounded-lg">
//                                     <Text className="text-lg font-bold">{item.title}</Text>
//                                     <Text>{expandedSubSteps[index] ? '-' : '+'}</Text>
//                                 </TouchableOpacity>
//                                 {expandedSubSteps[index] && (
//                                     <View className="ml-4">
//                                         {item.bullets.map((bullet, bulletIndex) => (
//                                             <View key={bulletIndex} className="mb-2">
//                                                 <Text className="font-semibold">• {bullet.text}</Text>
//                                                 {bullet.detail && (
//                                                     <Text className="mt-1 text-sm text-gray-700">{bullet.detail}</Text>
//                                                 )}
//                                                 {bullet.resource && (
//                                                     <Text className="mt-1 text-sm">
//                                                         <Text style={{color: 'black'}}>Helpful link: </Text>
//                                                         <Text
//                                                             className="text-blue-500 underline"
//                                                             onPress={() => Linking.openURL(bullet.resource)}
//                                                         >
//                                                             {bullet.resource}
//                                                         </Text>
//                                                     </Text>
//                                                 )}
//                                             </View>
//                                         ))}
//                                     </View>
//                                 )}
//                             </View>
//                         )}
//                     />
//                 </View>
//             )}
//
//             {!showQuestion && expanded && (
//                 <TouchableOpacity onPress={() => setShowQuestion(true)} className="mt-4 bg-blue-600 p-2 rounded-lg">
//                     <Text className="text-white text-center">Test Your Knowledge</Text>
//                 </TouchableOpacity>
//             )}
//
//             {showQuestion && (
//                 <View className="mt-4">
//                     <Text className="font-bold text-lg">{questionsStepOne[currentQuestionIndex].text}</Text>
//                     {questionsStepOne[currentQuestionIndex].options.map((option) => (
//                         <TouchableOpacity
//                             key={option}
//                             onPress={() => handleOptionSelect(option, questionsStepOne[currentQuestionIndex])}
//                             className={`p-2 rounded-lg mt-2 ${selectedOption === option ? (isCorrect ? 'bg-green-200' : 'bg-red-200') : 'bg-gray-300'}`}
//                         >
//                             <Text>{option}</Text>
//                         </TouchableOpacity>
//                     ))}
//                     {explanation && (
//                         <Animated.View style={{opacity: fadeAnim}}>
//                             <Text className="mt-2">{explanation}</Text>
//                         </Animated.View>
//                     )}
//
//                 </View>
//             )}
//
//
//             {selectedOption && (<View className="flex-row justify-between mt-4">
//                 <TouchableOpacity onPress={nextQuestion} className="bg-blue-600 p-2 rounded-lg">
//                     <Text className="text-white text-center">Next Question</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={nextStep} className="bg-green-600 p-2 rounded-lg">
//                     <Text className="text-white text-center">Next Step</Text>
//                 </TouchableOpacity>
//             </View>)}
//
//         </View>
//         //</ScrollView>
//     );
// };

//
//
// const subStepsTwo = [
//     {
//         title: 'Research Local Market Trends',
//         bullets: [
//             {
//                 text: 'Look into recent sales in your desired neighborhoods.',
//                 detail: 'Check websites like Zillow, Realtor.com, and local real estate listings.',
//                 resource: 'https://www.zillow.com'
//             },
//             {
//                 text: 'Observe the average days on market for homes.',
//                 detail: 'This indicates how quickly homes are selling in the area.'
//             },
//             {
//                 text: 'Analyze the price per square foot in different neighborhoods.',
//                 detail: 'Compare different areas to determine where you can get the most value.'
//             },
//         ]
//     },
//     {
//         title: 'Understand Economic Indicators',
//         bullets: [
//             {
//                 text: 'Review interest rates and how they affect purchasing power.',
//                 detail: 'Lower rates can make buying a home more affordable.',
//                 resource: 'https://www.realtor.com'
//             },
//             {
//                 text: 'Follow job growth and unemployment rates in your area.',
//                 detail: 'These can influence housing demand and prices.'
//             },
//             {
//                 text: 'Consider local government policies affecting real estate.',
//                 detail: 'These can include taxes, incentives for homebuyers, and zoning laws.'
//             },
//         ]
//     },
//     {
//         title: 'Analyze Housing Inventory',
//         bullets: [
//             {
//                 text: 'Evaluate the number of homes available for sale.',
//                 detail: 'A low inventory can lead to competitive bidding situations.'
//             },
//             {
//                 text: 'Look into the types of homes available: new builds vs. resales.',
//                 detail: 'Each has different pros and cons regarding price and upkeep.'
//             },
//             {
//                 text: 'Understand seasonal trends in housing inventory.',
//                 detail: 'Inventory often rises in spring and summer and falls in fall and winter.',
//                 resource: 'https://www.hud.gov'
//             },
//         ]
//     },
// ];
//
// const StepTwoUnderstandingMarketCondition = () => {
//     const [expanded, setExpanded] = useState(false); // State to track the expanded state of the main step
//     const [showQuestion, setShowQuestion] = useState(false);
//     const [selectedOption, setSelectedOption] = useState<string | null>(null); // Define type for selectedOption
//     const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
//     const [explanation, setExplanation] = useState<string | null>(null);
//     const [fadeAnim] = useState(new Animated.Value(0)); // Animation value for fade
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index
//
//     // State to track the expanded state of each substep
//     const [expandedSubSteps, setExpandedSubSteps] = useState<boolean[]>(Array(subStepsTwo.length).fill(false));
//
//     const questionsStepTwo: Question[] = [
//         {
//             text: "What is a common indicator of a buyer's market?",
//             options: ["A) High demand and low inventory", "B) Decreasing home prices", "C) Multiple offers on properties", "D) Rapid sales"],
//             correctAnswer: "B) Decreasing home prices",
//             correctExplanation: "Correct! A buyer's market is typically characterized by decreasing home prices due to higher inventory and lower demand.",
//             incorrectExplanation: "Not quite. A buyer's market usually features decreasing home prices, as demand is lower than supply."
//         },
//         {
//             text: "How can you assess whether it's a good time to buy a home?",
//             options: ["A) Check current mortgage rates", "B) Analyze local job market trends", "C) Monitor the housing inventory in your area", "D) All of the above"],
//             correctAnswer: "D) All of the above",
//             correctExplanation: "Exactly! All these factors can indicate whether it’s a favorable time to buy a home.",
//             incorrectExplanation: "Actually, you should consider all of these factors to determine if it's a good time to buy."
//         },
//         {
//             text: "What role does the local economy play in the housing market?",
//             options: ["A) It has no impact", "B) It influences home prices and demand", "C) It only affects rental prices", "D) It’s only important for commercial real estate"],
//             correctAnswer: "B) It influences home prices and demand",
//             correctExplanation: "Correct! The local economy directly impacts job stability and income levels, affecting housing demand and prices.",
//             incorrectExplanation: "Not quite. The local economy significantly influences home prices and demand in the housing market."
//         },
//     ];
//
//     const handleExpand = () => {
//         setExpanded(!expanded);
//     };
//
//     const handleSubStepExpand = (index: number) => {
//         const newExpandedState = [...expandedSubSteps];
//         newExpandedState[index] = !newExpandedState[index]; // Toggle the specific substep
//         setExpandedSubSteps(newExpandedState);
//     };
//
//     const handleOptionSelect = (option: string, question: Question) => {
//         setSelectedOption(option);
//         const correct = option === question.correctAnswer;
//         setIsCorrect(correct);
//         setExplanation(correct ? question.correctExplanation : question.incorrectExplanation);
//
//         // Fade in explanation
//         Animated.timing(fadeAnim, {toValue: 1, duration: 500, useNativeDriver: true}).start(() => {
//             setTimeout(() => {
//                 // Fade out after 3 seconds
//                 Animated.timing(fadeAnim, {toValue: 0, duration: 500, useNativeDriver: true}).start(() => {
//                     setExplanation(null);
//                     //setIsCorrect(null); // Reset highlighting after fading out
//                     //setSelectedOption(null); // Reset selected option
//                 });
//             }, 3000);
//         });
//     };
//
//     const nextQuestion = () => {
//         // Check if this is the last question
//         if (currentQuestionIndex < questionsStepTwo.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//         } else {
//             setCurrentQuestionIndex(0); // Reset to the first question
//         }
//         setSelectedOption(null); // Reset selected option for the next question
//         setIsCorrect(null); // Reset correctness for the next question
//     };
//
//     const nextStep = () => {
//         // Logic for proceeding to the next step can be added here
//         console.log('Proceeding to the next step...');
//     };
//
//     return (
//         // <ScrollView ref={scrollViewRef}>
//         <View className="flex-1 bg-white p-4">
//             <TouchableOpacity onPress={handleExpand}
//                               className="bg-blue-100 p-4 rounded-lg flex-row items-center justify-center mb-2">
//                 <Text className="text-xl font-bold text-blue-700">2. Understanding Market Conditions </Text>
//             </TouchableOpacity>
//
//
//             {expanded && (
//                 <View className="bg-gray-200 p-4 rounded-lg">
//                     <FlatList
//                         data={subStepsTwo}
//                         keyExtractor={(item) => item.title}
//                         renderItem={({item, index}) => (
//                             <View className="mb-4">
//                                 <TouchableOpacity onPress={() => handleSubStepExpand(index)}
//                                                   className="flex-row items-center justify-between bg-gray-300 p-3 rounded-lg">
//                                     <Text className="text-lg font-bold">{item.title}</Text>
//                                     <Text>{expandedSubSteps[index] ? '-' : '+'}</Text>
//                                 </TouchableOpacity>
//                                 {expandedSubSteps[index] && (
//                                     <View className="ml-4">
//                                         {item.bullets.map((bullet, bulletIndex) => (
//                                             <View key={bulletIndex} className="mb-2">
//                                                 <Text className="font-semibold">• {bullet.text}</Text>
//                                                 {bullet.detail && (
//                                                     <Text className="mt-1 text-sm text-gray-700">{bullet.detail}</Text>
//                                                 )}
//                                                 {bullet.resource && (
//                                                     <Text className="mt-1 text-sm">
//                                                         <Text style={{color: 'black'}}>Helpful link: </Text>
//                                                         <Text
//                                                             className="text-blue-500 underline"
//                                                             onPress={() => Linking.openURL(bullet.resource)}
//                                                         >
//                                                             {bullet.resource}
//                                                         </Text>
//                                                     </Text>
//                                                 )}
//                                             </View>
//                                         ))}
//                                     </View>
//                                 )}
//                             </View>
//                         )}
//                     />
//                 </View>
//             )}
//
//             {!showQuestion && expanded && (
//                 <TouchableOpacity onPress={() => setShowQuestion(true)} className="mt-4 bg-blue-600 p-2 rounded-lg">
//                     <Text className="text-white text-center">Test Your Knowledge</Text>
//                 </TouchableOpacity>
//             )}
//
//             {showQuestion && (
//                 <View className="mt-4">
//                     <Text className="font-bold text-lg">{questionsStepTwo[currentQuestionIndex].text}</Text>
//                     {questionsStepTwo[currentQuestionIndex].options.map((option) => (
//                         <TouchableOpacity
//                             key={option}
//                             onPress={() => handleOptionSelect(option, questionsStepTwo[currentQuestionIndex])}
//                             className={`p-2 rounded-lg mt-2 ${selectedOption === option ? (isCorrect ? 'bg-green-200' : 'bg-red-200') : 'bg-gray-300'}`}
//                         >
//                             <Text>{option}</Text>
//                         </TouchableOpacity>
//                     ))}
//                     {explanation && (
//                         <Animated.View style={{opacity: fadeAnim}}>
//                             <Text className="mt-2">{explanation}</Text>
//                         </Animated.View>
//                     )}
//
//                 </View>
//             )}
//
//
//             {selectedOption && (<View className="flex-row justify-between mt-4">
//                 <TouchableOpacity onPress={nextQuestion} className="bg-blue-600 p-2 rounded-lg">
//                     <Text className="text-white text-center">Next Question</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={nextStep} className="bg-green-600 p-2 rounded-lg">
//                     <Text className="text-white text-center">Next Step</Text>
//                 </TouchableOpacity>
//             </View>)}
//
//         </View>
//         //</ScrollView>
//     );
// };
//
// const subStepsThree = [
//     {
//         title: 'Define Your Criteria',
//         bullets: [
//             {
//                 text: 'Determine the number of bedrooms and bathrooms you need.',
//                 detail: 'Consider your current lifestyle and future plans.'
//             },
//             {
//                 text: 'Decide on must-have features, such as a backyard or garage.',
//                 detail: 'Make a list of priorities to guide your search.'
//             },
//             {
//                 text: 'Choose your preferred neighborhoods based on your research.',
//                 detail: 'Consider factors like schools, safety, and amenities.',
//                 resource: 'https://www.trulia.com'
//             },
//         ]
//     },
//     {
//         title: 'Use Real Estate Platforms',
//         bullets: [
//             {
//                 text: 'Search listings on websites like Zillow, Realtor.com, or local MLS.',
//                 detail: 'Set alerts for new listings that meet your criteria.'
//             },
//             {
//                 text: 'Explore virtual tours to narrow down options.',
//                 detail: 'This saves time before visiting in person.',
//                 resource: 'https://www.redfin.com'
//             },
//             {
//                 text: 'Utilize apps that allow you to filter homes based on your preferences.',
//                 detail: 'This can streamline your search process.'
//             },
//         ]
//     },
//     {
//         title: 'Engage a Real Estate Agent',
//         bullets: [
//             {
//                 text: 'Find an experienced agent familiar with your target area.',
//                 detail: 'They can provide valuable insights and access to listings.',
//                 resource: 'https://www.nar.realtor'
//             },
//             {
//                 text: 'Discuss your criteria and budget with your agent.',
//                 detail: 'This will help them tailor their search to your needs.'
//             },
//             {
//                 text: 'Attend open houses with your agent to view homes.',
//                 detail: 'They can guide you through the process and answer questions.'
//             },
//         ]
//     },
// ];
//
// const StepThreeFindingAHome = () => {
//     const [expanded, setExpanded] = useState(false); // State to track the expanded state of the main step
//     const [showQuestion, setShowQuestion] = useState(false);
//     const [selectedOption, setSelectedOption] = useState<string | null>(null); // Define type for selectedOption
//     const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
//     const [explanation, setExplanation] = useState<string | null>(null);
//     const [fadeAnim] = useState(new Animated.Value(0)); // Animation value for fade
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index
//
//     // State to track the expanded state of each substep
//     const [expandedSubSteps, setExpandedSubSteps] = useState<boolean[]>(Array(subStepsThree.length).fill(false));
//
//     const questionsStepThree: Question[] = [
//         {
//             text: "What is the first step in the home search process?",
//             options: ["A) Make an offer", "B) Get pre-approved for a mortgage", "C) Hire a moving company", "D) Schedule a home inspection"],
//             correctAnswer: "B) Get pre-approved for a mortgage",
//             correctExplanation: "Correct! Getting pre-approved helps you understand your budget before starting your home search.",
//             incorrectExplanation: "Actually, the first step should be getting pre-approved for a mortgage to determine your budget."
//         },
//         {
//             text: "What is a key factor to consider when choosing a neighborhood?",
//             options: ["A) Proximity to work or school", "B) Local amenities and services", "C) Safety and crime rates", "D) All of the above"],
//             correctAnswer: "D) All of the above",
//             correctExplanation: "Exactly! All these factors contribute to the overall quality of life in a neighborhood.",
//             incorrectExplanation: "Actually, you should consider all of these factors when choosing a neighborhood."
//         },
//         {
//             text: "What should you do during a home viewing?",
//             options: ["A) Only focus on the aesthetic appeal", "B) Check for any signs of damage or needed repairs", "C) Ignore the neighborhood noise levels", "D) Make an offer immediately"],
//             correctAnswer: "B) Check for any signs of damage or needed repairs",
//             correctExplanation: "Correct! It's important to thoroughly inspect the property for any potential issues during a viewing.",
//             incorrectExplanation: "Not quite. During a home viewing, you should carefully check for any signs of damage or repairs needed."
//         },
//     ];
//
//     const handleExpand = () => {
//         setExpanded(!expanded);
//     };
//
//     const handleSubStepExpand = (index: number) => {
//         const newExpandedState = [...expandedSubSteps];
//         newExpandedState[index] = !newExpandedState[index]; // Toggle the specific substep
//         setExpandedSubSteps(newExpandedState);
//     };
//
//     const handleOptionSelect = (option: string, question: Question) => {
//         setSelectedOption(option);
//         const correct = option === question.correctAnswer;
//         setIsCorrect(correct);
//         setExplanation(correct ? question.correctExplanation : question.incorrectExplanation);
//
//         // Fade in explanation
//         Animated.timing(fadeAnim, {toValue: 1, duration: 500, useNativeDriver: true}).start(() => {
//             setTimeout(() => {
//                 // Fade out after 3 seconds
//                 Animated.timing(fadeAnim, {toValue: 0, duration: 500, useNativeDriver: true}).start(() => {
//                     setExplanation(null);
//                     //setIsCorrect(null); // Reset highlighting after fading out
//                     //setSelectedOption(null); // Reset selected option
//                 });
//             }, 3000);
//         });
//     };
//
//     const nextQuestion = () => {
//         // Check if this is the last question
//         if (currentQuestionIndex < questionsStepThree.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//         } else {
//             setCurrentQuestionIndex(0); // Reset to the first question
//         }
//         setSelectedOption(null); // Reset selected option for the next question
//         setIsCorrect(null); // Reset correctness for the next question
//     };
//
//     const nextStep = () => {
//         // Logic for proceeding to the next step can be added here
//         console.log('Proceeding to the next step...');
//     };
//
//     return (
//         // <ScrollView ref={scrollViewRef}>
//         <View className="flex-1 bg-white p-4">
//             <TouchableOpacity onPress={handleExpand}
//                               className="bg-blue-100 p-4 rounded-lg flex-row items-center justify-center mb-2">
//                 <Text className="text-xl font-bold text-blue-700">3. Finding A Home </Text>
//             </TouchableOpacity>
//
//
//             {expanded && (
//                 <View className="bg-gray-200 p-4 rounded-lg">
//                     <FlatList
//                         data={subStepsThree}
//                         keyExtractor={(item) => item.title}
//                         renderItem={({item, index}) => (
//                             <View className="mb-4">
//                                 <TouchableOpacity onPress={() => handleSubStepExpand(index)}
//                                                   className="flex-row items-center justify-between bg-gray-300 p-3 rounded-lg">
//                                     <Text className="text-lg font-bold">{item.title}</Text>
//                                     <Text>{expandedSubSteps[index] ? '-' : '+'}</Text>
//                                 </TouchableOpacity>
//                                 {expandedSubSteps[index] && (
//                                     <View className="ml-4">
//                                         {item.bullets.map((bullet, bulletIndex) => (
//                                             <View key={bulletIndex} className="mb-2">
//                                                 <Text className="font-semibold">• {bullet.text}</Text>
//                                                 {bullet.detail && (
//                                                     <Text className="mt-1 text-sm text-gray-700">{bullet.detail}</Text>
//                                                 )}
//                                                 {bullet.resource && (
//                                                     <Text className="mt-1 text-sm">
//                                                         <Text style={{color: 'black'}}>Helpful link: </Text>
//                                                         <Text
//                                                             className="text-blue-500 underline"
//                                                             onPress={() => Linking.openURL(bullet.resource)}
//                                                         >
//                                                             {bullet.resource}
//                                                         </Text>
//                                                     </Text>
//                                                 )}
//                                             </View>
//                                         ))}
//                                     </View>
//                                 )}
//                             </View>
//                         )}
//                     />
//                 </View>
//             )}
//
//             {!showQuestion && expanded && (
//                 <TouchableOpacity onPress={() => setShowQuestion(true)} className="mt-4 bg-blue-600 p-2 rounded-lg">
//                     <Text className="text-white text-center">Test Your Knowledge</Text>
//                 </TouchableOpacity>
//             )}
//
//             {showQuestion && (
//                 <View className="mt-4">
//                     <Text className="font-bold text-lg">{questionsStepThree[currentQuestionIndex].text}</Text>
//                     {questionsStepThree[currentQuestionIndex].options.map((option) => (
//                         <TouchableOpacity
//                             key={option}
//                             onPress={() => handleOptionSelect(option, questionsStepThree[currentQuestionIndex])}
//                             className={`p-2 rounded-lg mt-2 ${selectedOption === option ? (isCorrect ? 'bg-green-200' : 'bg-red-200') : 'bg-gray-300'}`}
//                         >
//                             <Text>{option}</Text>
//                         </TouchableOpacity>
//                     ))}
//                     {explanation && (
//                         <Animated.View style={{opacity: fadeAnim}}>
//                             <Text className="mt-2">{explanation}</Text>
//                         </Animated.View>
//                     )}
//
//                 </View>
//             )}
//
//
//             {selectedOption && (<View className="flex-row justify-between mt-4">
//                 <TouchableOpacity onPress={nextQuestion} className="bg-blue-600 p-2 rounded-lg">
//                     <Text className="text-white text-center">Next Question</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={nextStep} className="bg-green-600 p-2 rounded-lg">
//                     <Text className="text-white text-center">Next Step</Text>
//                 </TouchableOpacity>
//             </View>)}
//
//         </View>
//         //</ScrollView>
//     );
// };

// const subStepsFour = [
//     {
//         title: 'Understand the Offer Process',
//         bullets: [
//             {
//                 text: 'Review the purchase agreement with your real estate agent.',
//                 detail: 'Understand the terms and conditions before signing.'
//             },
//             {
//                 text: 'Prepare an earnest money deposit to show seriousness.',
//                 detail: 'This deposit is typically 1-2% of the purchase price.',
//                 resource: 'https://www.realtor.com'
//             },
//             {
//                 text: 'Include contingencies in your offer, such as financing and inspection.',
//                 detail: 'These protect you in case issues are found during the inspection.'
//             },
//         ]
//     },
//     {
//         title: 'Negotiate the Offer',
//         bullets: [
//             {
//                 text: 'Work with your agent to determine a competitive offer price.',
//                 detail: 'Consider market conditions and recent sales in the area.',
//                 resource: 'https://www.zillow.com'
//             },
//             {
//                 text: 'Discuss negotiation strategies with your agent.',
//                 detail: 'They can advise on how to present a strong offer.'
//             },
//             {
//                 text: 'Be prepared for counteroffers from the seller.',
//                 detail: 'Negotiations may go back and forth before reaching an agreement.'
//             },
//         ]
//     },
//     {
//         title: 'Finalize the Purchase Agreement',
//         bullets: [
//             {
//                 text: 'Sign the final purchase agreement once all terms are agreed upon.',
//                 detail: 'This legally binds you to the purchase and sets the closing process in motion.',
//                 resource: 'https://www.hud.gov'
//             },
//             {
//                 text: 'Submit any required documentation to your lender.',
//                 detail: 'This includes financial statements, tax returns, and employment verification.'
//             },
//             {
//                 text: 'Schedule a home appraisal to confirm the property value.',
//                 detail: 'The appraisal ensures the home is worth the agreed-upon price.'
//             },
//         ]
//     },
// ];
//
// const StepFourMakingAnOffer = () => {
//     const [expanded, setExpanded] = useState(false); // State to track the expanded state of the main step
//     const [showQuestion, setShowQuestion] = useState(false);
//     const [selectedOption, setSelectedOption] = useState<string | null>(null); // Define type for selectedOption
//     const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
//     const [explanation, setExplanation] = useState<string | null>(null);
//     const [fadeAnim] = useState(new Animated.Value(0)); // Animation value for fade
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index
//
//     // State to track the expanded state of each substep
//     const [expandedSubSteps, setExpandedSubSteps] = useState<boolean[]>(Array(subStepsFour.length).fill(false));
//
//     const questionsStepFour: Question[] = [
//         {
//             text: "What is typically included in an offer to purchase a home?",
//             options: ["A) Price you’re willing to pay", "B) Desired closing date", "C) Any contingencies (e.g., inspection, financing)", "D) All of the above"],
//             correctAnswer: "D) All of the above",
//             correctExplanation: "Exactly! An offer typically includes the price, desired closing date, and any contingencies.",
//             incorrectExplanation: "Actually, all these elements should be included in an offer to purchase a home."
//         },
//         {
//             text: "What is an earnest money deposit?",
//             options: ["A) A fee for listing a home", "B) A deposit to show commitment to the purchase", "C) A payment for home repairs", "D) A deposit for moving services"],
//             correctAnswer: "B) A deposit to show commitment to the purchase",
//             correctExplanation: "Correct! An earnest money deposit shows the seller that you are serious about your offer.",
//             incorrectExplanation: "Not quite. The earnest money deposit is meant to demonstrate your commitment to purchasing the home."
//         },
//         {
//             text: "What might a counteroffer from the seller include?",
//             options: ["A) A different price", "B) Changes to contingencies", "C) A different closing date", "D) All of the above"],
//             correctAnswer: "D) All of the above",
//             correctExplanation: "Exactly! A counteroffer can include any changes to the original offer, including price and terms.",
//             incorrectExplanation: "Actually, a counteroffer can encompass all these aspects, including price and terms."
//         },
//     ];
//
//     const handleExpand = () => {
//         setExpanded(!expanded);
//     };
//
//     const handleSubStepExpand = (index: number) => {
//         const newExpandedState = [...expandedSubSteps];
//         newExpandedState[index] = !newExpandedState[index]; // Toggle the specific substep
//         setExpandedSubSteps(newExpandedState);
//     };
//
//     const handleOptionSelect = (option: string, question: Question) => {
//         setSelectedOption(option);
//         const correct = option === question.correctAnswer;
//         setIsCorrect(correct);
//         setExplanation(correct ? question.correctExplanation : question.incorrectExplanation);
//
//         // Fade in explanation
//         Animated.timing(fadeAnim, {toValue: 1, duration: 500, useNativeDriver: true}).start(() => {
//             setTimeout(() => {
//                 // Fade out after 3 seconds
//                 Animated.timing(fadeAnim, {toValue: 0, duration: 500, useNativeDriver: true}).start(() => {
//                     setExplanation(null);
//                     //setIsCorrect(null); // Reset highlighting after fading out
//                     //setSelectedOption(null); // Reset selected option
//                 });
//             }, 3000);
//         });
//     };
//
//     const nextQuestion = () => {
//         // Check if this is the last question
//         if (currentQuestionIndex < questionsStepFour.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//         } else {
//             setCurrentQuestionIndex(0); // Reset to the first question
//         }
//         setSelectedOption(null); // Reset selected option for the next question
//         setIsCorrect(null); // Reset correctness for the next question
//     };
//
//     const nextStep = () => {
//         // Logic for proceeding to the next step can be added here
//         console.log('Proceeding to the next step...');
//     };
//
//     return (
//         // <ScrollView ref={scrollViewRef}>
//         <View className="flex-1 bg-white p-4">
//             <TouchableOpacity onPress={handleExpand}
//                               className="bg-blue-100 p-4 rounded-lg flex-row items-center justify-center mb-2">
//                 <Text className="text-xl font-bold text-blue-700">4. Making An Offer </Text>
//             </TouchableOpacity>
//
//
//             {expanded && (
//                 <View className="bg-gray-200 p-4 rounded-lg">
//                     <FlatList
//                         data={subStepsFour}
//                         keyExtractor={(item) => item.title}
//                         renderItem={({item, index}) => (
//                             <View className="mb-4">
//                                 <TouchableOpacity onPress={() => handleSubStepExpand(index)}
//                                                   className="flex-row items-center justify-between bg-gray-300 p-3 rounded-lg">
//                                     <Text className="text-lg font-bold">{item.title}</Text>
//                                     <Text>{expandedSubSteps[index] ? '-' : '+'}</Text>
//                                 </TouchableOpacity>
//                                 {expandedSubSteps[index] && (
//                                     <View className="ml-4">
//                                         {item.bullets.map((bullet, bulletIndex) => (
//                                             <View key={bulletIndex} className="mb-2">
//                                                 <Text className="font-semibold">• {bullet.text}</Text>
//                                                 {bullet.detail && (
//                                                     <Text className="mt-1 text-sm text-gray-700">{bullet.detail}</Text>
//                                                 )}
//                                                 {bullet.resource && (
//                                                     <Text className="mt-1 text-sm">
//                                                         <Text style={{color: 'black'}}>Helpful link: </Text>
//                                                         <Text
//                                                             className="text-blue-500 underline"
//                                                             onPress={() => Linking.openURL(bullet.resource)}
//                                                         >
//                                                             {bullet.resource}
//                                                         </Text>
//                                                     </Text>
//                                                 )}
//                                             </View>
//                                         ))}
//                                     </View>
//                                 )}
//                             </View>
//                         )}
//                     />
//                 </View>
//             )}
//
//             {!showQuestion && expanded && (
//                 <TouchableOpacity onPress={() => setShowQuestion(true)} className="mt-4 bg-blue-600 p-2 rounded-lg">
//                     <Text className="text-white text-center">Test Your Knowledge</Text>
//                 </TouchableOpacity>
//             )}
//
//             {showQuestion && (
//                 <View className="mt-4">
//                     <Text className="font-bold text-lg">{questionsStepFour[currentQuestionIndex].text}</Text>
//                     {questionsStepFour[currentQuestionIndex].options.map((option) => (
//                         <TouchableOpacity
//                             key={option}
//                             onPress={() => handleOptionSelect(option, questionsStepFour[currentQuestionIndex])}
//                             className={`p-2 rounded-lg mt-2 ${selectedOption === option ? (isCorrect ? 'bg-green-200' : 'bg-red-200') : 'bg-gray-300'}`}
//                         >
//                             <Text>{option}</Text>
//                         </TouchableOpacity>
//                     ))}
//                     {explanation && (
//                         <Animated.View style={{opacity: fadeAnim}}>
//                             <Text className="mt-2">{explanation}</Text>
//                         </Animated.View>
//                     )}
//
//                 </View>
//             )}
//
//
//             {selectedOption && (<View className="flex-row justify-between mt-4">
//                 <TouchableOpacity onPress={nextQuestion} className="bg-blue-600 p-2 rounded-lg">
//                     <Text className="text-white text-center">Next Question</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={nextStep} className="bg-green-600 p-2 rounded-lg">
//                     <Text className="text-white text-center">Next Step</Text>
//                 </TouchableOpacity>
//             </View>)}
//
//         </View>
//         //</ScrollView>
//     );
// };

// const subStepsFive = [
//     {
//         title: 'Prepare for Closing',
//         bullets: [
//             {
//                 text: 'Review the closing disclosure to understand costs.',
//                 detail: 'This document outlines the final terms of your loan and closing costs.',
//                 resource: 'https://www.consumerfinance.gov'
//             },
//             {
//                 text: 'Schedule a final walkthrough of the property.',
//                 detail: 'Ensure the home is in the agreed-upon condition before closing.',
//                 resource: 'https://www.realtor.com'
//             },
//             {
//                 text: 'Secure homeowners insurance and provide proof to your lender.',
//                 detail: 'This protects your investment and is required by most lenders.',
//                 resource: 'https://www.nolo.com'
//             },
//             {
//                 text: 'Prepare funds for closing costs.',
//                 detail: 'Ensure you have the down payment and any additional closing costs ready to go.',
//                 resource: 'https://www.hud.gov'
//             },
//             {
//                 text: 'Confirm with your lender that all paperwork is in order.',
//                 detail: 'This helps avoid any last-minute issues on closing day.'
//             },
//         ]
//     },
//     {
//         title: 'Attend the Closing Meeting',
//         bullets: [
//             {
//                 text: 'Bring a government-issued ID and any required documents.',
//                 detail: 'This includes your down payment and closing costs.',
//                 resource: 'https://www.hud.gov'
//             },
//             {
//                 text: 'Review and sign all closing documents carefully.',
//                 detail: 'Ask questions if you do not understand any part of the paperwork.',
//                 resource: 'https://www.consumerfinance.gov'
//             },
//             {
//                 text: 'Ensure all parties are present, including your agent and lender.',
//                 detail: 'This facilitates smooth communication during the meeting.'
//             },
//             {text: 'Receive the keys to your new home!', detail: 'Congratulations on becoming a homeowner!'},
//         ]
//     },
//     {
//         title: 'Move into Your New Home',
//         bullets: [
//             {
//                 text: 'Plan your move and hire movers if necessary.',
//                 detail: 'Consider timing to make the transition smoother.'
//             },
//             {
//                 text: 'Set up essential services like utilities and internet.',
//                 detail: 'Do this before moving in to avoid delays.'
//             },
//             {
//                 text: 'Change the locks for security reasons.',
//                 detail: 'It’s always good to have peace of mind in a new place.'
//             },
//         ]
//     },
//     {
//         title: 'Maintain Your Investment',
//         bullets: [
//             {
//                 text: 'Create a home maintenance schedule.',
//                 detail: 'Regular upkeep can prevent costly repairs down the line.',
//                 resource: 'https://www.hgtv.com'
//             },
//             {
//                 text: 'Keep track of home improvements for future resale value.',
//                 detail: 'Document renovations and upgrades you make.'
//             },
//             {
//                 text: 'Stay informed about the local market to monitor your home’s value.',
//                 detail: 'This can help you make informed decisions in the future.'
//             },
//         ]
//     },
// ];
//
// const StepFivePostPurchase = () => {
//     const [expanded, setExpanded] = useState(false); // State to track the expanded state of the main step
//     const [showQuestion, setShowQuestion] = useState(false);
//     const [selectedOption, setSelectedOption] = useState<string | null>(null); // Define type for selectedOption
//     const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
//     const [explanation, setExplanation] = useState<string | null>(null);
//     const [fadeAnim] = useState(new Animated.Value(0)); // Animation value for fade
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index
//
//     // State to track the expanded state of each substep
//     const [expandedSubSteps, setExpandedSubSteps] = useState<boolean[]>(Array(subStepsFive.length).fill(false));
//
//     const questionsStepFive: Question[] = [
//         {
//             text: "What is a closing disclosure?",
//             options: ["A) A document detailing the home’s history", "B) A summary of the final loan terms and closing costs", "C) A form to apply for a mortgage", "D) An inspection report"],
//             correctAnswer: "B) A summary of the final loan terms and closing costs",
//             correctExplanation: "Correct! The closing disclosure provides detailed information about the mortgage and associated costs.",
//             incorrectExplanation: "Not quite. A closing disclosure summarizes the final loan terms and closing costs associated with your mortgage."
//         },
//         {
//             text: "What should you do after closing on your new home?",
//             options: ["A) Immediately start renovations", "B) Change the locks", "C) Ignore the neighborhood", "D) Begin looking for a new home"],
//             correctAnswer: "B) Change the locks",
//             correctExplanation: "Exactly! Changing the locks is a wise security measure after closing on your new home.",
//             incorrectExplanation: "Actually, changing the locks is one of the first things you should do for your safety after closing."
//         },
//         {
//             text: "What is the purpose of a home warranty?",
//             options: ["A) To cover all repair costs", "B) To provide protection for major home systems and appliances", "C) To ensure property value increases", "D) To cover moving expenses"],
//             correctAnswer: "B) To provide protection for major home systems and appliances",
//             correctExplanation: "Correct! A home warranty protects against repairs on essential home systems and appliances after purchase.",
//             incorrectExplanation: "Not quite. A home warranty is meant to protect you from unexpected repair costs for major home systems and appliances."
//         },
//     ];
//
//     const handleExpand = () => {
//         setExpanded(!expanded);
//     };
//
//     const handleSubStepExpand = (index: number) => {
//         const newExpandedState = [...expandedSubSteps];
//         newExpandedState[index] = !newExpandedState[index]; // Toggle the specific substep
//         setExpandedSubSteps(newExpandedState);
//     };
//
//     const handleOptionSelect = (option: string, question: Question) => {
//         setSelectedOption(option);
//         const correct = option === question.correctAnswer;
//         setIsCorrect(correct);
//         setExplanation(correct ? question.correctExplanation : question.incorrectExplanation);
//
//         // Fade in explanation
//         Animated.timing(fadeAnim, {toValue: 1, duration: 500, useNativeDriver: true}).start(() => {
//             setTimeout(() => {
//                 // Fade out after 3 seconds
//                 Animated.timing(fadeAnim, {toValue: 0, duration: 500, useNativeDriver: true}).start(() => {
//                     setExplanation(null);
//                     //setIsCorrect(null); // Reset highlighting after fading out
//                     //setSelectedOption(null); // Reset selected option
//                 });
//             }, 3000);
//         });
//     };
//
//     const nextQuestion = () => {
//         // Check if this is the last question
//         if (currentQuestionIndex < questionsStepFive.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//         } else {
//             setCurrentQuestionIndex(0); // Reset to the first question
//         }
//         setSelectedOption(null); // Reset selected option for the next question
//         setIsCorrect(null); // Reset correctness for the next question
//     };
//
//     const nextStep = () => {
//         // Logic for proceeding to the next step can be added here
//         console.log('Proceeding to the next step...');
//     };
//
//     return (
//         // <ScrollView ref={scrollViewRef}>
//         <View className="flex-1 bg-white p-4">
//             <TouchableOpacity onPress={handleExpand}
//                               className="bg-blue-100 p-4 rounded-lg flex-row items-center justify-center mb-2">
//                 <Text className="text-xl font-bold text-blue-700">5. Post-Purchasing </Text>
//             </TouchableOpacity>
//
//
//             {expanded && (
//                 <View className="bg-gray-200 p-4 rounded-lg">
//                     <FlatList
//                         data={subStepsFive}
//                         keyExtractor={(item) => item.title}
//                         renderItem={({item, index}) => (
//                             <View className="mb-4">
//                                 <TouchableOpacity onPress={() => handleSubStepExpand(index)}
//                                                   className="flex-row items-center justify-between bg-gray-300 p-3 rounded-lg">
//                                     <Text className="text-lg font-bold">{item.title}</Text>
//                                     <Text>{expandedSubSteps[index] ? '-' : '+'}</Text>
//                                 </TouchableOpacity>
//                                 {expandedSubSteps[index] && (
//                                     <View className="ml-4">
//                                         {item.bullets.map((bullet, bulletIndex) => (
//                                             <View key={bulletIndex} className="mb-2">
//                                                 <Text className="font-semibold">• {bullet.text}</Text>
//                                                 {bullet.detail && (
//                                                     <Text className="mt-1 text-sm text-gray-700">{bullet.detail}</Text>
//                                                 )}
//                                                 {bullet.resource && (
//                                                     <Text className="mt-1 text-sm">
//                                                         <Text style={{color: 'black'}}>Helpful link: </Text>
//                                                         <Text
//                                                             className="text-blue-500 underline"
//                                                             onPress={() => Linking.openURL(bullet.resource)}
//                                                         >
//                                                             {bullet.resource}
//                                                         </Text>
//                                                     </Text>
//                                                 )}
//                                             </View>
//                                         ))}
//                                     </View>
//                                 )}
//                             </View>
//                         )}
//                     />
//                 </View>
//             )}
//
//             {!showQuestion && expanded && (
//                 <TouchableOpacity onPress={() => setShowQuestion(true)} className="mt-4 bg-blue-600 p-2 rounded-lg">
//                     <Text className="text-white text-center">Test Your Knowledge</Text>
//                 </TouchableOpacity>
//             )}
//
//             {showQuestion && (
//                 <View className="mt-4">
//                     <Text className="font-bold text-lg">{questionsStepFive[currentQuestionIndex].text}</Text>
//                     {questionsStepFive[currentQuestionIndex].options.map((option) => (
//                         <TouchableOpacity
//                             key={option}
//                             onPress={() => handleOptionSelect(option, questionsStepFive[currentQuestionIndex])}
//                             className={`p-2 rounded-lg mt-2 ${selectedOption === option ? (isCorrect ? 'bg-green-200' : 'bg-red-200') : 'bg-gray-300'}`}
//                         >
//                             <Text>{option}</Text>
//                         </TouchableOpacity>
//                     ))}
//                     {explanation && (
//                         <Animated.View style={{opacity: fadeAnim}}>
//                             <Text className="mt-2">{explanation}</Text>
//                         </Animated.View>
//                     )}
//
//                 </View>
//             )}
//
//
//             {selectedOption && (<View className="flex-row justify-between mt-4">
//                 <TouchableOpacity onPress={nextQuestion} className="bg-blue-600 p-2 rounded-lg">
//                     <Text className="text-white text-center">Next Question</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={nextStep} className="bg-green-600 p-2 rounded-lg">
//                     <Text className="text-white text-center">Next Step</Text>
//                 </TouchableOpacity>
//             </View>)}
//
//         </View>
//         //</ScrollView>
//     );
// };


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
                <StepOnePrePurchasing goToNextStep={() => goToNextStep('StepTwoPrePurchasing')} />
                <StepTwoUnderstandingMarketCondition goToNextStep={() => goToNextStep('StepThreeFindingAHome')} />
                <StepThreeFindingAHome goToNextStep={() => goToNextStep('StepFourMakingAnOfferr')} />
                <StepFourMakingAnOffer goToNextStep={() => goToNextStep('StepFivePostPurchase')} />
                <StepFivePostPurchase goToNextStep={() => goToNextStep('StepOnePrePurchasing  ')} />
            </ScrollView>
        </>
    );
};

export default guideBuying;
