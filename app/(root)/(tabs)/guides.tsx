//guides is main pages guideBuying, guideSelling, guideLandlordRenting, guideTenantRenting are the others

import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';


const Guides = () => {
    const router = useRouter();

    return (
        <ScrollView className="flex-1 bg-white px-5">
            <Text className="text-2xl font-bold text-center text-[#4C76A5] mt-10">
                Choose Your Guide
            </Text>
            <Text className="text-lg text-center text-[#38597F] mt-3 mb-10">
                Start Your Journey to Buying, Selling or Renting Today!
            </Text>

            {/* Row 1 */}
            <View className="flex-row justify-between mb-8">
                <TouchableOpacity
                    className="w-[45%] bg-white p-5 rounded-lg shadow-md"
                    //onPress={() => router.push('/guide-Buying')}
                >
                    <Image></Image> //change this to actual image
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-[45%] bg-white p-5 rounded-lg shadow-md"
                    //onPress={() => router.push('/guide-Selling')}
                >
                    <Image></Image>
                </TouchableOpacity>
            </View>

            {/* Row 2 */}
            <View className="flex-row justify-between mb-8">
                <TouchableOpacity
                    className="w-[45%] bg-white p-5 rounded-lg shadow-md"
                    //onPress={() => router.push('/guide-Landlord-Renting')}
                >
                    <Image></Image>
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-[45%] bg-white p-5 rounded-lg shadow-md"
                    //onPress={() => router.push('/guide-Tenant-Renting')}
                >
                    <Image></Image>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Guides;