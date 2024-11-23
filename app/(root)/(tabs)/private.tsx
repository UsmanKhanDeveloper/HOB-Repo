import React from 'react';
 
import { View, Text } from 'react-native';
 
const PrivatePage = () => {
    return (
        <View>
            <View>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Private Listings</Text>
            </View>
            <View>
                <Text>This is the private page where you can post private listings as a user.</Text>
            </View>
        </View>
    );
};
 
export default PrivatePage;