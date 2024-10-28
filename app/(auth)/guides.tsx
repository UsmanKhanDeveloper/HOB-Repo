import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { images } from "@/constants";

const Guides = () => {
    const router = useRouter();

    return (
        <ScrollView className="flex-1 bg-white">
            {/* Title and Subtitle */}
            <View className="flex-1 items-center justify-center py-10">
                <Text className="text-2xl font-bold text-center text-blue-800 mt-3 mb-3">
                    Choose Your Guide
                </Text>
                <Text className="text-lg text-center text-blue-700 mb-5">
                    Start Your Journey to Buying, Selling, or Renting Today!
                </Text>
            </View>

            {/* Centered Guide Rows Container */}
            <View className="flex-1 items-center justify-center">
                {/* Guide Rows */}
                <View className="w-full max-w-xs space-y-5">
                    {/* Row 1 */}
                    <View className="flex-row justify-between">
                        <TouchableOpacity className="w-[48%] bg-white p-4 rounded-lg shadow-md items-center" onPress={() => router.push('../guide-Buying')}>
                            <Image
                                source={images.buyingGuideSelection}
                                className="mb-2 mr-2"
                                style={{ width: 200, height: 200, resizeMode: 'contain' }}
                            />
                            <Text className="text-center text-lg text-blue-700">Buying Guide</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="w-[48%] bg-white p-4 rounded-lg shadow-md items-center">
                            <Image
                                source={images.sellingGuideSelection}
                                className="mb-2 ml-2"
                                style={{ width: 200, height: 200, resizeMode: 'contain' }}
                            />
                            <Text className="text-center text-lg text-blue-700">Selling Guide</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Row 2 */}
                    <View className="flex-row justify-between">
                        <TouchableOpacity className="w-[48%] bg-white p-4 rounded-lg shadow-md items-center">
                            <Image
                                source={images.rentingTenantGuideSelection}
                                className="mb-2 mr-2"
                                style={{ width: 200, height: 200, resizeMode: 'contain' }}
                            />
                            <Text className="text-center text-lg text-blue-700">Tenant Renting Guide</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="w-[48%] bg-white p-4 rounded-lg shadow-md items-center">
                            <Image
                                source={images.rentingLandlordGuideSelection}
                                className="mb-2 ml-2"
                                style={{ width: 200, height: 200, resizeMode: 'contain' }}
                            />
                            <Text className="text-center text-lg text-blue-700">Landlord Renting Guide</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Guides;
