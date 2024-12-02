import React, { useEffect, useState } from "react";
import { Image } from 'expo-image';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, Modal } from "react-native";
import { Link, router, useNavigation} from "expo-router";
import { icons, images } from "@/constants"; // Assuming your favorite icon is in this folder
import { useAuth, useUser } from "@clerk/clerk-react"; // Importing useUser
import CollapsibleMenu from './CollapsibleMenu'; // Importing CollapsibleMenu
import { fetchPropertyData } from "../services/apiService";
import MatterportView from '@/components/MatterportView';

// const API_HOST = "zillow-com1.p.rapidapi.com"
// const API_KEY= process.env.REACT_APP_RAPIDAPI_KEY;

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

    // for API Call
    const [apiProperties, setProperties] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    // for collapsible menu
    const options = [
        'Option 1',
        'Option 2',
        'Option 3',
        'Another Option',
        'More Options',
      ];

    // Modal for filter menu
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
      };

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
            // entered if statement in handleAddToFavorites
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
      <>
        <MatterportView />
        <View style={styles.container}>
            <Image
                style={styles.logo}
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

            {/* save search, search bar and filter menu */}
            
            <View>
            {/* horizontal container */}
            <View style={styles.flexHorizontalContainer}>

            {/* vertical container */}
            <View style={styles.topBarVerticalContainer}>
                <TouchableOpacity>
                    <Image style={styles.icon}
                    source={images.primary}
                    ></Image>
                </TouchableOpacity>

                <Text style={styles.iconText}>Save Search</Text>
            </View>

            <View style={styles.searchBar}>
            <Text style={styles.searchBarText}>Dream Big: Find Your Home</Text>
            <Image style={styles.searchIcon} source={icons.search}></Image>
            </View> 

            <View style={styles.topBarVerticalContainer}>
                {/* Modal is not part of the page structure but it's on TOP of it */}
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    // onRequestClose={() => {
                    //     Alert.alert('Modal has been closed.');
                    //     setModalVisible(!modalVisible);
                    // }}>
                    >

                <View style={styles.overlayContainer}>
                    

                        {/* Gray overlay */}
                    <TouchableOpacity style={styles.overlay} onPress={toggleModal} activeOpacity={1}>
                        {/* Touching outside of the modal will dismiss it */}

                        <View style={styles.filterMenuContainer}>
                        {/* Change this closing Icon to the filter menu*/}

                        {/* <TouchableOpacity onPress={toggleModal} style={styles.icon}> */}
                        {/* <Image style={styles.icon}source={icons.search}></Image> */}
                        {/* </TouchableOpacity> */}

                        <View style={styles.filterVerticalContainer}>
                            <Text style={styles.titleText}>Filters</Text>

                            <View style={styles.selectAViewContainer}>                                                 
                            <Text>Select a view</Text>
                            <Image style={styles.icon} source={icons.dropDownMenu}></Image>      
                            </View>

                            {/* <View style={styles.flexHorizontalContainer}>
                            <Image style={styles.icon}source={icons.arrowDown}></Image>
                            <Text style={styles.testText}>Zones</Text>
                            </View> */}

                            {/* <View style={styles.selectAViewContainer}>
                            <Text>Search Zones</Text>
                            <Image style={styles.icon} source={icons.search}></Image>            
                            </View> */}

                            <View style={styles.flexHorizontalContainer}>
                                <Image style={styles.icon} source={icons.arrowDown}></Image>
                                <CollapsibleMenu title="Zones"/>
                            </View>

                            {/* <View style={styles.filterVerticalContainer}>
                            <View style={styles.flexHorizontalContainer}>
                                <Image style={styles.icon} source={icons.square}></Image> */}

                                {/* Placeholder text */}
                                {/* <Text style={styles.testText}> Zone 1</Text> 
                            </View> */}

                            {/* <View style={styles.flexHorizontalContainer}> */}
                                {/* <Image style={styles.icon} source={icons.square}></Image> */}

                                {/* Placeholder text */}
                                {/* <Text style={styles.testText}> Zone 2</Text>  */}
                            {/* </View> */}

                            {/* <View style={styles.flexHorizontalContainer}>
                                <Image style={styles.icon} source={icons.square}></Image> */}

                                {/* Placeholder text */}
                                {/* <Text style={styles.testText}> Zone 3</Text>  */}
                            {/* </View> */}

                            {/* </View> */}

                            <View style={styles.flexHorizontalContainer}>
                            <Image style={styles.icon}source={icons.arrowDown}></Image>
                            <Text style={styles.testText}>People</Text>
                            </View>

                            <View style={styles.flexHorizontalContainer}>
                            <Image style={styles.icon}source={icons.arrowDown}></Image>
                            <Text style={styles.testText}>Company</Text>
                            </View>

                            <View style={styles.flexHorizontalContainer}>
                            <Image style={styles.icon}source={icons.arrowDown}></Image>
                            <Text style={styles.testText}>Contract Time</Text>
                            </View>
                        </View>
                    </View>
                        

                    </TouchableOpacity>
                    </View>
                </Modal>

                <TouchableOpacity
                onPress={() => setModalVisible(true)}>
                    <Image style={styles.icon}
                    source={icons.filters}
                    ></Image>
                <Text style={styles.iconText}>Filter Menu</Text>
                </TouchableOpacity>

            </View>
            </View>
        </View>
    <View>
    <Text style={styles.listingHeader}>Property Listings</Text>
    </View>

    {/* <View style={styles.testView}>
        {error && <p>{error}</p>}
        {properties.map((property, index) => (
            <View key={index}>
                <Text>{property.address}</Text>
                <Text>{property.price}</Text> */}
                {/* add more property details here */}
            {/* </View> */}
        {/* ))} */}
    {/* </View> */}

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
        </>
    );
};

export default Homepage;

const styles = StyleSheet.create({
    testView: {
        borderColor: 'red',
        borderWidth: 1,
    },
    selectAViewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start', // align items to the left 
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#6F6F6F',
    },
    overlayContainer: {
        // borderColor: 'red',
        // borderWidth: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    container: {
    //   borderColor: 'red',
    //   borderWidth: 1,
      backgroundColor: '#fff',
      justifyContent: 'space-between',
      flexGrow: 1,
      padding: 15,
    }, 
    filterMenuContainer: {
        // borderColor: 'red',
        // borderWidth: 1,
        // flexGrow: 1,
        flexDirection: 'row',
        width: 340,
        // height: 500,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'flex-start',
        zIndex: 10, // Ensures it’s above the overlay
    },
    filterVerticalContainer: {
      flexGrow: 1,
    //   borderColor: 'green',
    //   borderWidth: 1,  
      backgroundColor: '#fff',
      justifyContent: 'space-between',
      flexDirection: 'column',
    },
    centeredContainer: {
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      fontSize: 16,
    },
    flexHorizontalContainer: {
    //   borderColor: 'orange',
    //   borderWidth: 1,
      width: '100%',
      flexGrow: 1,
      flexDirection: 'row',
      // justifyContent: 'space-between',
      // alignItems: 'center',
      backgroundColor: '#fff',
    //   height: 60,
    //   padding: 5,
      paddingVertical: 10,
      paddingHorizontal: 0,
    },
    flexVerticalContainer: {
      borderColor: 'red',
      borderWidth: 1,
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
    topBarVerticalContainer: {
    //   borderColor: 'red',
    //   borderWidth: 1,
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
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent gray
        justifyContent: 'center',
        alignItems: 'center',
      },
    titleText: {
        paddingBottom: 10,
        fontSize: 24,
        fontWeight: 'bold',
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
    testText: {
      fontSize: 14,
    //   borderColor: 'pink',
    //   borderWidth: 1,
    //   flexGrow: 1,
      height: 25,
    },
    icon: {
    //   borderColor: 'blue',
    //   borderWidth: 1,
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
    //   borderColor: 'red',
    //   borderWidth: 1,
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
        // borderColor: 'red',
        // borderWidth: 1,
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
        paddingHorizontal: 10,
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
