import React, { useEffect, useState } from "react";
import { Image } from 'expo-image';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Link, router, useNavigation} from "expo-router";
import { icons, images } from "@/constants"; // Assuming your favorite icon is in this folder
import { useAuth, useUser } from "@clerk/clerk-react"; // Importing useUser

// Define the interface for a Property Listing
interface Property {
    id: string;
    price: number;
    location: string;
    address: string;
    time: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    image: any; // Add image property to the interface
}

const Homepage: React.FC = () => {
    // Clerk authentication
    const { isSignedIn, signOut } = useAuth(); // Get the sign-in state and sign out function
    const { user } = useUser(); // Use the useUser hook to get user info

    // Navigation
    const navigation = useNavigation();
    const [listing, setListings] = useState<Property[]>([]); 

    // Create an array of property listings with images
    const properties: Property[] = [
        { id: '1', price: 899000, location: 'Mississauga', address: '7222 Triumph Lane', time: '56 min ago', bedrooms: 3, bathrooms: 3, sqft: 1400, image: images.houseHeader },
        { id: '2', price: 920000, location: 'Toronto', address: '123 Maple Street', time: '10 min ago', bedrooms: 4, bathrooms: 3, sqft: 1600, image: images.houseHeader },
        { id: '3', price: 875000, location: 'Brampton', address: '55 Oak Avenue', time: '2 hours ago', bedrooms: 3, bathrooms: 2, sqft: 1350, image: images.houseHeader },
        { id: '4', price: 950000, location: 'Oakville', address: '789 Pine Road', time: '30 min ago', bedrooms: 5, bathrooms: 4, sqft: 2000, image: images.houseHeader },
        { id: '5', price: 765000, location: 'Kitchener', address: '101 River Lane', time: '15 min ago', bedrooms: 2, bathrooms: 2, sqft: 1200, image: images.houseHeader },
    ];

    // State to hold favorite listings (IDs)
    const [favorites, setFavorites] = useState<string[]>([]);

    // Function to handle adding a property to favorites
    const handleAddToFavorites = (id: string) => {
        if (!favorites.includes(id)) {
            setFavorites((prevFavorites) => [...prevFavorites, id]);
            Alert.alert("Added to Favorites", "This property has been added to your favorites!");
        } else {
            Alert.alert("Already in Favorites", "This property is already in your favorites!");
        }
    };

    // Function to handle property click
    const handlePropertyClick = (id: string) => {
        console.log(`Property ID ${id} clicked!`); // Debugging
        // You can navigate to a property detail screen here
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={images.appLogo}
                contentFit="cover"
                transition={1000}
            />

            <View>
                {isSignedIn && user ? ( // Check if the user is signed in
                    <>
                        <View style={styles.buttonContainer}>
                        <Text style={styles.welcomeText}>Welcome, {user.firstName}!</Text>
                        </View>
                        <TouchableOpacity style={styles.signOutButton} onPress={() => signOut()}>
                            <Text style={styles.buttonText}>Sign out</Text>
                        </TouchableOpacity>
                        <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.favoriteButton} onPress={() => router.push('/(root)/favorites')}>
                        <Image source={icons.favIcon} style={styles.favoriteIcon} />
                        <Text style={styles.favoriteText}>Your Favorite Listings</Text>
                        </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/(auth)/log-in')}>
                        <Text style={styles.buttonText}>Sign in</Text>
                    </TouchableOpacity>
                )}
            </View>
            <Text style={styles.listingHeader}>Property Listings</Text>

            {/* save search, search bar and filter menu */}
            


    {/* horizontal container */}
    <View style={styles.flexHorizontalContainer}>

      {/* vertical container */}
      <View style={styles.flexVerticalContainer}>
          <TouchableOpacity>
              <Image style={styles.image}
              source={images.primary}
              ></Image>
          </TouchableOpacity>

          <Text style={styles.iconText}>Save Search</Text>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchBarText}>Dream Big: Find Your Home</Text>
        <Image style={styles.searchIcon} source={icons.search}></Image>
      </View> 

      <View style={styles.flexVerticalContainer}>
          <TouchableOpacity>
              <Image style={styles.image}
              source={icons.filters}
              ></Image>
          </TouchableOpacity>
          <Text style={styles.iconText}>Save Search</Text>
      </View>
    </View>

    {/* toggle, num of listings and menu */}
    <View style={styles.flexHorizontalContainer}>

    </View>


{/* Listings ScrollView */}
            <ScrollView style={styles.listingsContainer}>
                {properties.map((property) => (
                    <TouchableOpacity
                        key={property.id}
                        style={styles.propertyItem}
                        onPress={() => handlePropertyClick(property.id)} // Handle click
                    >
                        <Image source={property.image} style={styles.propertyImage} />
                        <View style={styles.propertyDetailsContainer}>
                            <Text style={styles.propertyTitle}>{property.location} - {property.address}</Text>
                            <Text style={styles.propertyDescription}>Price: ${property.price.toLocaleString()}</Text>
                            <Text style={styles.propertyDetails}>{property.bedrooms} Bedrooms, {property.bathrooms} Bathrooms, {property.sqft} sqft</Text>
                            <Text style={styles.propertyTime}>{property.time}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleAddToFavorites(property.id)}>
                            <Image source={icons.favIcon} style={styles.favoriteIcon} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default Homepage;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      justifyContent: 'space-between',
      flexDirection: 'row',
      padding: 16,
    }, 
    verticalContainer: {
      backgroundColor: '#fff',
      justifyContent: 'space-between',
      flexDirection: 'column',
      padding: 10,
    },
    centeredContainer: {
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      fontSize: 16,
    },
    flexHorizontalContainer: {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
      // justifyContent: 'space-between',
      // alignItems: 'center',
      backgroundColor: '#fff',
      height: 60,
      padding: 10,
    },
    flexVerticalContainer: {
      flex: 1,
      flexDirection: 'column',
      // justifyContent: 'space-between',
      // alignItems: 'center',
      flexShrink: 0,
      height: 60,
      width: 39,
      backgroundColor: '#fff',
      padding: 10,  
    },
    iconText:  {
      fontSize: 10,
    },
    boldedText: {
      fontWeight: 'bold',
    },
    searchBarText: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 13,
      padding: 5,
    },
    image: {
      width: 20,
      height: 20,
    },
    searchBar: {
      alignItems: 'center',
      flexGrow: 1,
      flexDirection: 'row',
      borderRadius: 20,
      borderWidth: 1,
      justifyContent: 'center',
      height: 59,
      borderColor: '#6F6F6F',
    },
    searchIcon: {
      width: 12,
      height: 15,
      padding: 10,
    },
    logo: {
      width: 140, 
      height: 60, 
      backgroundColor: '#0553', 
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    signInButton: {
        borderRadius: 38.5,
        backgroundColor: '#596E85',
        height: 40,
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginLeft: 270
    },
    signOutButton: {
        borderRadius: 40,
        backgroundColor: '#596E85',
        height: 40,
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginLeft: 270

    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'Jakarta-Bold',
        textAlign: 'center',
        fontSize: 11,
    },
    favoriteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    favoriteIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    favoriteText: {
        fontSize: 12,
        color: '#596E85',
    },
    listingHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    listingsContainer: {
        flexGrow: 1, // Allow ScrollView to expand
    },
    propertyItem: {
        marginBottom: 15,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 2,
    },
    propertyImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    propertyDetailsContainer: {
        alignItems: 'center',
        padding: 10,
    },
    propertyTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    propertyDescription: {
        fontSize: 12,
        color: '#555',
    },
    propertyDetails: {
        fontSize: 12,
        color: '#777',
    },
    propertyTime: {
        fontSize: 10,
        color: '#999',
    },
    welcomeText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#596E85',
    },
});
