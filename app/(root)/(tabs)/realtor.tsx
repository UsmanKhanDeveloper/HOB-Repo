import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import { icons } from '@/constants'; // Adjust this import if needed
import Icon from 'react-native-vector-icons/FontAwesome'; // Example of vector icon library
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Realtor {
  id: string;
  name: string;
  rating: number;
  company: string;
  location: string;
  profilePicture: string;
  address: string;
  phoneNumber: string;
  email: string; // Assuming email is available
}

const RealtorsScreen = () => {
  const [realtors, setRealtors] = useState<Realtor[]>([]);
  const [filteredRealtors, setFilteredRealtors] = useState<Realtor[]>([]);
  const [searchText, setSearchText] = useState('');
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'location'>('rating');

  // State for modal visibility and selected realtor
  const [selectedRealtor, setSelectedRealtor] = useState<Realtor | null>(null);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  // Fetch data from the JSON file
  useEffect(() => {
    const loadRealtorsData = async () => {
      try {
        const response = await require('../../(realtor)/realtor.json'); // Path to your JSON file
        const data: Realtor[] = response;
        setRealtors(data);
        setFilteredRealtors(data);
      } catch (error) {
        console.error('Error loading realtors data:', error);
      }
    };

    loadRealtorsData();
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const normalizedText = text.trim().toLowerCase();  // Normalize input
    const filtered = realtors.filter((realtor) => {
      const nameMatch = realtor.name && realtor.name.toLowerCase().includes(normalizedText);
      const locationMatch = realtor.location && realtor.location.toLowerCase().includes(normalizedText);
      return nameMatch || locationMatch;
    });
    setFilteredRealtors(filtered);
  };

  // Function to handle sending an email
  const handleEmail = (email: string) => {
    const emailUrl = `mailto:${email}`; // Dynamically use the realtor's email

    // Check if the device can open the mail app
    Linking.canOpenURL(emailUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(emailUrl);
        } else {
          // Show error popup if email is not supported
          Alert.alert('Error', 'Email functionality is not supported on this device.');
        }
      })
      .catch(() => {
        // Show error popup for any error
        Alert.alert('Error', 'There was an error opening the email client.');
      });
  };

  const handlePhoneCall = (phoneNumber: string) => {
    const phoneUrl = `tel://${phoneNumber}`; // Use the realtor's phone number dynamically

    // Check if the device supports making calls
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneUrl);
        } else {
          // Show error popup if call is not supported
          Alert.alert('Error', 'Call functionality is not supported on this device.');
        }
      })
      .catch(() => {
        // Show error popup for any error
        Alert.alert('Error', 'There was an error initiating the call.');
      });
  };

  const handleSort = () => {
    // Fallback to an empty array if filteredRealtors is undefined
    const realtors = filteredRealtors ?? []; 
  
    let sortedRealtors: Realtor[];
  
    if (sortBy === 'rating') {
      // Sort by rating (highest to lowest)
      sortedRealtors = [...realtors].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'location') {
      // Sort by location (address A-Z)
      sortedRealtors = [...realtors].sort((a, b) =>
        a.address.localeCompare(b.address)
      );
    } else {
      // If no sort criteria, retain the original order
      sortedRealtors = realtors;
    }
  
    // Update the state with sorted data
    setFilteredRealtors(sortedRealtors);
  
    // Close the modal after applying the sort
    setSortModalVisible(false);
  };

  const renderRealtorItem = ({ item }: { item: Realtor }) => (
    <TouchableOpacity
      className="bg-white-300 p-4 my-2 rounded-3xl border-2 border-blue-400 shadow-md"        
      onPress={() => {
          setSelectedRealtor(item);
          setProfileModalVisible(true);
        }}
    >
      <View className="flex-row items-center">
        {/* Left side: Realtor name and details */}
        <FontAwesome
          name="user-circle"
          size={64} // Match the w-16 and h-16 size (16 * 4 = 64)
          color="#3c84d6" // Customize the icon color as needed
          style={{ borderRadius: 32, marginRight: 16 }} // Matches rounded-full and mr-4
        />
        <View className="flex-1">
          <Text className="text-lg font-bold">{item.name}</Text>
          <Text>{item.company}</Text>
          <Text className="text-sm text-gray-500">
            {item.location} • ⭐ {item.rating ? item.rating.toFixed(1) : ''}
          </Text>
        </View>
  
        {/* Right side: Icon buttons */}
        <View className="flex items-center">
          {/* Info Icon */}
          <TouchableOpacity
            onPress={() => {
              setSelectedRealtor(item);
              setProfileModalVisible(true);
            }}
            className="p-2"
          >
            <Icon name="info-circle" size={20} color="black" />
          </TouchableOpacity>
        </View>
  
        {/* Call Icon */}
        <View>
          <TouchableOpacity
            onPress={() => handlePhoneCall(item.phoneNumber)} // Call realtor
            className="p-2"
          >
            <Icon name="phone" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Email Icon */}
        <View className="flex items-center">
          <TouchableOpacity
            onPress={() => handleEmail(item.email)} // Send email to realtor
            className="p-2"
          >
            <Icon name="envelope" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderProfileModal = () => (
    <Modal
      transparent={true}
      animationType="slide"
      visible={profileModalVisible}
      onRequestClose={() => setProfileModalVisible(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(100, 100, 100, 0.5)',
        }}
      >
        <View className="w-72 p-5 bg-white rounded-lg">
          <Text className="text-2xl font-bold mb-4">{selectedRealtor?.name}</Text>
          <Text className="text-lg">{selectedRealtor?.company}</Text>
          <Text className="text-sm text-gray-500">{selectedRealtor?.location}</Text>
          <Text className="text-sm">{selectedRealtor?.address}</Text>
          <Text className="text-sm mt-3">Rating: {selectedRealtor?.rating}</Text>
          
          <TouchableOpacity
            onPress={() => setProfileModalVisible(false)}
            className="bg-[#3c84d6] p-2 rounded-md mt-4"
          >
            <Text className="text-white text-center">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mt-10 text-[#3c84d6]">Find Your Best Realtor</Text>
      
      <View className="flex-row justify-center mt-5 mb-4">
        <View className="relative w-5/6"> 
          <TextInput
            className="bg-gray-200 px-4 py-2 rounded-lg w-full"
            style={{
              left: 5,

            }}
            placeholder="Search by name"
            value={searchText}
            onChangeText={handleSearch}
          />
          <Icon
            name="search"
            size={15}
            color="gray"
            style={{
              position: 'absolute',
              left: 7,
              top: '55%',
              transform: [{ translateY: -10 }], // Centers the icon vertically
            }}
          />
        </View>
      </View>
      
      {/* Sort Button */}
      <View className="flex-row justify-between items-center mt-4">
        <TouchableOpacity
          className="bg-white border rounded-lg px-4 py-2"
          onPress={() => setSortModalVisible(true)}
        >
          <Text className="font-semibold">Sort</Text>
        </TouchableOpacity>
        <Text>{filteredRealtors.length} results</Text>
      </View>
      
      {/* Realtors List */}
      <FlatList
        data={filteredRealtors}
        keyExtractor={(item) => item.id}
        renderItem={renderRealtorItem}
        className="mt-4"
      />
  
      {/* Sort Modal */}
      {sortModalVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={sortModalVisible}
          onRequestClose={() => setSortModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <View className="w-80 bg-white rounded-lg p-6">
              <Text className="text-xl font-semibold mb-4">Sort By</Text>
  
              <TouchableOpacity
                className="mb-4"
                onPress={() => setSortBy('rating')}
              >
                <Text className="text-lg">Rating</Text>
              </TouchableOpacity>
  
              <TouchableOpacity
                className="mb-4"
                onPress={() => setSortBy('location')}
              >
                <Text className="text-lg">Location</Text>
              </TouchableOpacity>
  
              <TouchableOpacity
                className="bg-[#3c84d6] px-4 py-2 rounded-lg mt-4"
                onPress={handleSort}
              >
                <Text className="text-white text-center">Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {renderProfileModal()}
    </View>
  );
};

export default RealtorsScreen;