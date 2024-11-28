// import React, { forwardRef, useState } from "react";
// import {
//   Animated,
//   FlatList,
//   Linking,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { Question } from "@/types/type";

// const subStepsFour = [
//   {
//     title: "Understand the Offer Process",
//     bullets: [
//       {
//         text: "Review the purchase agreement with your real estate agent.",
//         detail: "Understand the terms and conditions before signing.",
//       },
//       {
//         text: "Prepare an earnest money deposit to show seriousness.",
//         detail: "This deposit is typically 1-2% of the purchase price.",
//         resource: "https://www.realtor.com",
//       },
//       {
//         text: "Include contingencies in your offer, such as financing and inspection.",
//         detail:
//           "These protect you in case issues are found during the inspection.",
//       },
//     ],
//   },
//   {
//     title: "Negotiate the Offer",
//     bullets: [
//       {
//         text: "Work with your agent to determine a competitive offer price.",
//         detail: "Consider market conditions and recent sales in the area.",
//         resource: "https://www.zillow.com",
//       },
//       {
//         text: "Discuss negotiation strategies with your agent.",
//         detail: "They can advise on how to present a strong offer.",
//       },
//       {
//         text: "Be prepared for counteroffers from the seller.",
//         detail:
//           "Negotiations may go back and forth before reaching an agreement.",
//       },
//     ],
//   },
//   {
//     title: "Finalize the Purchase Agreement",
//     bullets: [
//       {
//         text: "Sign the final purchase agreement once all terms are agreed upon.",
//         detail:
//           "This legally binds you to the purchase and sets the closing process in motion.",
//         resource: "https://www.hud.gov",
//       },
//       {
//         text: "Submit any required documentation to your lender.",
//         detail:
//           "This includes financial statements, tax returns, and employment verification.",
//       },
//       {
//         text: "Schedule a home appraisal to confirm the property value.",
//         detail:
//           "The appraisal ensures the home is worth the agreed-upon price.",
//       },
//     ],
//   },
// ];

// const StepFourMakingAnOffer = () => {
//   const [expanded, setExpanded] = useState(false); // State to track the expanded state of the main step
//   const [showQuestion, setShowQuestion] = useState(false);
//   const [selectedOption, setSelectedOption] = useState<string | null>(null); // Define type for selectedOption
//   const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
//   const [explanation, setExplanation] = useState<string | null>(null);
//   const [fadeAnim] = useState(new Animated.Value(0)); // Animation value for fade
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index

//   // State to track the expanded state of each substep
//   const [expandedSubSteps, setExpandedSubSteps] = useState<boolean[]>(
//     Array(subStepsFour.length).fill(false)
//   );

//   const questionsStepFour: Question[] = [
//     {
//       text: "What is typically included in an offer to purchase a home?",
//       options: [
//         "A) Price you’re willing to pay",
//         "B) Desired closing date",
//         "C) Any contingencies (e.g., inspection, financing)",
//         "D) All of the above",
//       ],
//       correctAnswer: "D) All of the above",
//       correctExplanation:
//         "Exactly! An offer typically includes the price, desired closing date, and any contingencies.",
//       incorrectExplanation:
//         "Actually, all these elements should be included in an offer to purchase a home.",
//     },
//     {
//       text: "What is an earnest money deposit?",
//       options: [
//         "A) A fee for listing a home",
//         "B) A deposit to show commitment to the purchase",
//         "C) A payment for home repairs",
//         "D) A deposit for moving services",
//       ],
//       correctAnswer: "B) A deposit to show commitment to the purchase",
//       correctExplanation:
//         "Correct! An earnest money deposit shows the seller that you are serious about your offer.",
//       incorrectExplanation:
//         "Not quite. The earnest money deposit is meant to demonstrate your commitment to purchasing the home.",
//     },
//     {
//       text: "What might a counteroffer from the seller include?",
//       options: [
//         "A) A different price",
//         "B) Changes to contingencies",
//         "C) A different closing date",
//         "D) All of the above",
//       ],
//       correctAnswer: "D) All of the above",
//       correctExplanation:
//         "Exactly! A counteroffer can include any changes to the original offer, including price and terms.",
//       incorrectExplanation:
//         "Actually, a counteroffer can encompass all these aspects, including price and terms.",
//     },
//   ];

//   const handleExpand = () => {
//     setExpanded(!expanded);
//   };

//   const handleSubStepExpand = (index: number) => {
//     const newExpandedState = [...expandedSubSteps];
//     newExpandedState[index] = !newExpandedState[index]; // Toggle the specific substep
//     setExpandedSubSteps(newExpandedState);
//   };

//   const handleOptionSelect = (option: string, question: Question) => {
//     setSelectedOption(option);
//     const correct = option === question.correctAnswer;
//     setIsCorrect(correct);
//     setExplanation(
//       correct ? question.correctExplanation : question.incorrectExplanation
//     );

//     // Fade in explanation
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 500,
//       useNativeDriver: true,
//     }).start(() => {
//       setTimeout(() => {
//         // Fade out after 3 seconds
//         Animated.timing(fadeAnim, {
//           toValue: 0,
//           duration: 500,
//           useNativeDriver: true,
//         }).start(() => {
//           setExplanation(null);
//           //setIsCorrect(null); // Reset highlighting after fading out
//           //setSelectedOption(null); // Reset selected option
//         });
//       }, 3000);
//     });
//   };

//   const nextQuestion = () => {
//     // Check if this is the last question
//     if (currentQuestionIndex < questionsStepFour.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       setCurrentQuestionIndex(0); // Reset to the first question
//     }
//     setSelectedOption(null); // Reset selected option for the next question
//     setIsCorrect(null); // Reset correctness for the next question
//   };

//   const nextStep = () => {
//     // Logic for proceeding to the next step can be added here
//     console.log("Proceeding to the next step...");
//   };

//   return (
//     // <ScrollView ref={scrollViewRef}>
//     <View className="flex-1 bg-white p-4">
//       <TouchableOpacity
//         onPress={handleExpand}
//         className="bg-blue-100 p-4 rounded-lg flex-row items-center justify-center mb-2"
//       >
//         <Text className="text-xl font-bold text-blue-700">
//           4. Making An Offer{" "}
//         </Text>
//       </TouchableOpacity>

//       {expanded && (
//         <View className="bg-gray-200 p-4 rounded-lg">
//           <FlatList
//             data={subStepsFour}
//             keyExtractor={(item) => item.title}
//             renderItem={({ item, index }) => (
//               <View className="mb-4">
//                 <TouchableOpacity
//                   onPress={() => handleSubStepExpand(index)}
//                   className="flex-row items-center justify-between bg-gray-300 p-3 rounded-lg"
//                 >
//                   <Text className="text-lg font-bold">{item.title}</Text>
//                   <Text>{expandedSubSteps[index] ? "-" : "+"}</Text>
//                 </TouchableOpacity>
//                 {expandedSubSteps[index] && (
//                   <View className="ml-4">
//                     {item.bullets.map((bullet, bulletIndex) => (
//                       <View key={bulletIndex} className="mb-2">
//                         <Text className="font-semibold">• {bullet.text}</Text>
//                         {bullet.detail && (
//                           <Text className="mt-1 text-sm text-gray-700">
//                             {bullet.detail}
//                           </Text>
//                         )}
//                         {bullet.resource && (
//                           <Text className="mt-1 text-sm">
//                             <Text style={{ color: "black" }}>
//                               Helpful link:{" "}
//                             </Text>
//                             <Text
//                               className="text-blue-500 underline"
//                               onPress={() => Linking.openURL(bullet.resource)}
//                             >
//                               {bullet.resource}
//                             </Text>
//                           </Text>
//                         )}
//                       </View>
//                     ))}
//                   </View>
//                 )}
//               </View>
//             )}
//           />
//         </View>
//       )}

//       {!showQuestion && expanded && (
//         <TouchableOpacity
//           onPress={() => setShowQuestion(true)}
//           className="mt-4 bg-blue-600 p-2 rounded-lg"
//         >
//           <Text className="text-white text-center">Test Your Knowledge</Text>
//         </TouchableOpacity>
//       )}

//       {showQuestion && (
//         <View className="mt-4">
//           <Text className="font-bold text-lg">
//             {questionsStepFour[currentQuestionIndex].text}
//           </Text>
//           {questionsStepFour[currentQuestionIndex].options.map((option) => (
//             <TouchableOpacity
//               key={option}
//               onPress={() =>
//                 handleOptionSelect(
//                   option,
//                   questionsStepFour[currentQuestionIndex]
//                 )
//               }
//               className={`p-2 rounded-lg mt-2 ${
//                 selectedOption === option
//                   ? isCorrect
//                     ? "bg-green-200"
//                     : "bg-red-200"
//                   : "bg-gray-300"
//               }`}
//             >
//               <Text>{option}</Text>
//             </TouchableOpacity>
//           ))}
//           {explanation && (
//             <Animated.View style={{ opacity: fadeAnim }}>
//               <Text className="mt-2">{explanation}</Text>
//             </Animated.View>
//           )}
//         </View>
//       )}

//       {selectedOption && (
//         <View className="flex-row justify-between mt-4">
//           <TouchableOpacity
//             onPress={nextQuestion}
//             className="bg-blue-600 p-2 rounded-lg"
//           >
//             <Text className="text-white text-center">Next Question</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={nextStep}
//             className="bg-green-600 p-2 rounded-lg"
//           >
//             <Text className="text-white text-center">Next Step</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//     //</ScrollView>
//   );
// };

// export default StepFourMakingAnOffer;
