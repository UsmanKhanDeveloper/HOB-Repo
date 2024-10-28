import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Image } from 'react-native';
import { icons } from '@/constants';
import { router } from 'expo-router';

interface FavoriteProperty {
    id: string;
    price: number;
    location: string;
    address: string;
    time: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
}

const FavoritesScreen = () => {
    const [favorites, setFavorites] = useState<FavoriteProperty[]>([]);
    const [sortModalVisible, setSortModalVisible] = useState(false);
    const [sortBy, setSortBy] = useState<'price' | 'location'>('price');

    useEffect(() => {
        // Placeholder: Fetch favorite properties from API
        setFavorites([
            { id: '1', price: 899000, location: 'Mississauga', address: '7222 Triumph Lane', time: '56 min ago', bedrooms: 3, bathrooms: 3, sqft: 1400 }
        ]); //TODO: FIX THE BUG LOGIC PART
    }, []);

    const handleSort = (criteria: 'price' | 'location') => {
        setSortBy(criteria);
        const sortedFavorites = [...favorites].sort((a, b) => {
            if (criteria === 'price') return a.price - b.price;
            if (criteria === 'location') return a.location.localeCompare(b.location);
            return 0;
        });
        setFavorites(sortedFavorites);
        setSortModalVisible(false);
    };

    const deleteFavorite = (id: string) => {
        setFavorites(favorites.filter(item => item.id !== id));
    };

    const renderFavoriteItem = ({ item }: { item: FavoriteProperty }) => (
        <TouchableOpacity className="bg-white p-4 my-2 rounded-lg shadow-md" onPress={() => console.log('Clicked on:', item)}>
            <Text className="text-xl font-bold">${item.price}</Text>
            <Text>{item.bedrooms} bd • {item.bathrooms} ba • {item.sqft} sqft</Text>
            <Text>{item.address}, {item.location}</Text>
            <Text>{item.time}</Text>
            <TouchableOpacity onPress={() => deleteFavorite(item.id)} className="absolute right-4 top-2">
                <Image source={icons.deleteCan} className="w-8 h-8 top-5"/>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 p-4 bg-white">
            {favorites.length === 0 ? (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-2xl font-bold text-center mb-4">You have no Favorites yet!</Text>
                    <Text className="text-center mb-5">Add your favorite listing to track price and status changes!</Text>
                    <TouchableOpacity
                        className="bg-blue-500 py-3 px-6 rounded-lg"
                        onPress={() => router.push('/Homepage')}
                    >
                        <Text className="text-white font-bold text-center">Browse Properties</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="flex-1 top-10">
                    <Text className="text-2xl font-bold mb-2 text-[#3c84d6]">Your Favorites</Text>
                    <View className="flex-row justify-between items-center mb-4">
                        <TouchableOpacity className="bg-white border rounded-lg px-4 py-2 top-2" onPress={() => setSortModalVisible(true)}>
                            <Text className="font-semibold">Sort</Text>
                        </TouchableOpacity>
                        <Text>{favorites.length} results</Text>
                    </View>
                    <FlatList
                        data={favorites}
                        keyExtractor={(item) => item.id}
                        renderItem={renderFavoriteItem}
                        contentContainerStyle={{ paddingBottom: 60 }} // Space for the button
                    />
                    <TouchableOpacity
                        className="absolute bottom-10 left-4 right-4 bg-blue-500 py-3 rounded-lg"
                        onPress={() => router.push('/Homepage')}
                    >
                        <Text className="text-white font-bold text-center">Add More Listings</Text>
                    </TouchableOpacity>
                </View>
            )}
            <Modal
                transparent={true}
                animationType="fade"
                visible={sortModalVisible}
                onRequestClose={() => setSortModalVisible(false)}
            >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(100, 100, 100, 0.5)'
}}>
                        <View className="w-72 p-5 bg-white rounded-lg">
                        <Text className="text-lg font-bold mb-4">Sort By</Text>
                        <TouchableOpacity onPress={() => handleSort('price')} className="flex-row items-center mb-2">
                            <Text className="text-lg">Price</Text>
                            {sortBy === 'price' ? <Text className="ml-2">✓</Text> : null}
                            </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSort('location')} className="flex-row items-center mb-2">
                            <Text className="text-lg">Location</Text>
                            {sortBy === 'location' ? <Text className="ml-2">✓</Text> : null}
                            </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSortModalVisible(false)} className="bg-gray-300 p-2 rounded-md">
                            <Text className="text-center">Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default FavoritesScreen;
