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

// const subStepsThree = [
//   {
//     title: "Define Your Criteria",
//     bullets: [
//       {
//         text: "Determine the number of bedrooms and bathrooms you need.",
//         detail: "Consider your current lifestyle and future plans.",
//       },
//       {
//         text: "Decide on must-have features, such as a backyard or garage.",
//         detail: "Make a list of priorities to guide your search.",
//       },
//       {
//         text: "Choose your preferred neighborhoods based on your research.",
//         detail: "Consider factors like schools, safety, and amenities.",
//         resource: "https://www.trulia.com",
//       },
//     ],
//   },
//   {
//     title: "Use Real Estate Platforms",
//     bullets: [
//       {
//         text: "Search listings on websites like Zillow, Realtor.com, or local MLS.",
//         detail: "Set alerts for new listings that meet your criteria.",
//       },
//       {
//         text: "Explore virtual tours to narrow down options.",
//         detail: "This saves time before visiting in person.",
//         resource: "https://www.redfin.com",
//       },
//       {
//         text: "Utilize apps that allow you to filter homes based on your preferences.",
//         detail: "This can streamline your search process.",
//       },
//     ],
//   },
//   {
//     title: "Engage a Real Estate Agent",
//     bullets: [
//       {
//         text: "Find an experienced agent familiar with your target area.",
//         detail: "They can provide valuable insights and access to listings.",
//         resource: "https://www.nar.realtor",
//       },
//       {
//         text: "Discuss your criteria and budget with your agent.",
//         detail: "This will help them tailor their search to your needs.",
//       },
//       {
//         text: "Attend open houses with your agent to view homes.",
//         detail: "They can guide you through the process and answer questions.",
//       },
//     ],
//   },
// ];

// const StepThreeFindingAHome = () => {
//   const [expanded, setExpanded] = useState(false); // State to track the expanded state of the main step
//   const [showQuestion, setShowQuestion] = useState(false);
//   const [selectedOption, setSelectedOption] = useState<string | null>(null); // Define type for selectedOption
//   const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
//   const [explanation, setExplanation] = useState<string | null>(null);
//   const [fadeAnim] = useState(new Animated.Value(0)); // Animation value for fade
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index

//   // State to track the expanded state of each substep
//   const [expandedSubSteps, setExpandedSubSteps] = useState<boolean[]>(
//     Array(subStepsThree.length).fill(false)
//   );

//   const questionsStepThree: Question[] = [
//     {
//       text: "What is the first step in the home search process?",
//       options: [
//         "A) Make an offer",
//         "B) Get pre-approved for a mortgage",
//         "C) Hire a moving company",
//         "D) Schedule a home inspection",
//       ],
//       correctAnswer: "B) Get pre-approved for a mortgage",
//       correctExplanation:
//         "Correct! Getting pre-approved helps you understand your budget before starting your home search.",
//       incorrectExplanation:
//         "Actually, the first step should be getting pre-approved for a mortgage to determine your budget.",
//     },
//     {
//       text: "What is a key factor to consider when choosing a neighborhood?",
//       options: [
//         "A) Proximity to work or school",
//         "B) Local amenities and services",
//         "C) Safety and crime rates",
//         "D) All of the above",
//       ],
//       correctAnswer: "D) All of the above",
//       correctExplanation:
//         "Exactly! All these factors contribute to the overall quality of life in a neighborhood.",
//       incorrectExplanation:
//         "Actually, you should consider all of these factors when choosing a neighborhood.",
//     },
//     {
//       text: "What should you do during a home viewing?",
//       options: [
//         "A) Only focus on the aesthetic appeal",
//         "B) Check for any signs of damage or needed repairs",
//         "C) Ignore the neighborhood noise levels",
//         "D) Make an offer immediately",
//       ],
//       correctAnswer: "B) Check for any signs of damage or needed repairs",
//       correctExplanation:
//         "Correct! It's important to thoroughly inspect the property for any potential issues during a viewing.",
//       incorrectExplanation:
//         "Not quite. During a home viewing, you should carefully check for any signs of damage or repairs needed.",
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
//     if (currentQuestionIndex < questionsStepThree.length - 1) {
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
//           3. Finding A Home{" "}
//         </Text>
//       </TouchableOpacity>

//       {expanded && (
//         <View className="bg-gray-200 p-4 rounded-lg">
//           <FlatList
//             data={subStepsThree}
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
//             {questionsStepThree[currentQuestionIndex].text}
//           </Text>
//           {questionsStepThree[currentQuestionIndex].options.map((option) => (
//             <TouchableOpacity
//               key={option}
//               onPress={() =>
//                 handleOptionSelect(
//                   option,
//                   questionsStepThree[currentQuestionIndex]
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

// export default StepThreeFindingAHome;
