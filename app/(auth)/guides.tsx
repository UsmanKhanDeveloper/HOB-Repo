import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import {images} from "@/constants";
import buyingGuideSelection from "*.png";

const Guides = () => {
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>
                Choose Your Guide
            </Text>
            <Text style={styles.subtitle}>
                Start Your Journey to Buying, Selling, or Renting Today!
            </Text>

            {/* Row 1 */}
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.card}
                    //onPress={() => router.push('/guide-Buying')}
                >
                    <Image
                        source={images.buyingGuideSelection} // replace with your actual image
                        style={styles.image}
                    />
                    <Text style={styles.cardText}>Buying Guide</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    //onPress={() => router.push('/guide-Selling')}
                >
                    <Image
                        source={images.buyingGuideSelection} // replace with your actual image
                        style={styles.image}
                    />
                    <Text style={styles.cardText}>Selling Guide</Text>
                </TouchableOpacity>
            </View>

            {/* Row 2 */}
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.card}
                   //onPress={() => router.push('/guide-Landlord-Renting')}
                >
                    <Image
                        source={images.buyingGuideSelection} // replace with your actual image
                        style={styles.image}
                    />
                    <Text style={styles.cardText}>Landlord Renting Guide</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    //onPress={() => router.push('/guide-Tenant-Renting')}
                >
                    <Image
                        source={images.buyingGuideSelection} // replace with your actual image
                        style={styles.image}
                    />
                    <Text style={styles.cardText}>Tenant Renting Guide</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4C76A5',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        color: '#38597F',
        marginTop: 10,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        width: '45%',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    cardText: {
        fontSize: 16,
        color: '#38597F',
        textAlign: 'center',
    }
});

export default Guides;