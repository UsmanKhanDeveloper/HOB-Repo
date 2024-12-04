import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  Image,
} from "react-native";
import { fetchPropertyData } from "../services/apiService";
import { Link, router, useNavigation } from "expo-router";
import { handleAddToFavorites } from "../(root)/Homepage";
import { icons, images } from "@/constants";

// type 
// interface SearchControllerProps {
//     title: string;
//   }

  type ListingData = {

    id: string;
    media: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    time: number; 
    
    address: {
        street: string,
        city: string,
        state:  string,
        zip: string,
        country: string,
      },
  }

  // Searches the Zillow Database for matching entries
  const SearchController: React.FC = ({ }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<ListingData[]>([]);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    // Search is sent to API
    const search = async (searchTerm: string) => {
      // setSearchTerm(searchTerm);
      console.log("Search term:", searchTerm);
  
      try {
        const result = await fetchPropertyData(searchTerm);
        // set it in a variable

        console.log("Search results:", result);
        setSearchResults(result);
      } catch (error) {
        console.error("Error fetching property data:", error);
        throw error;
      }
    };

    const handlePropertyClick = (id: string) => {
        console.log(`Property ID ${id} clicked!`);
        // EDIT: You can navigate to a property detail screen here
      };

      function logMessage(message: any) {
        console.log("Logging message:", message);
        return message;
      }
      
      function MyComponent() {
        const message = "Hello, world!";
      }

    return (

        // search bar
        <View style={styles.container}>
        <TouchableOpacity onPress={toggleMenu} style={styles.button}>
        {/* TODO: look at "title" in the ui where is it*/}
        <Text style={styles.buttonText}></Text> 
        <TextInput 
        placeholder="Dream Big: Find Your Home"
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.input}
        onSubmitEditing={() => search(searchTerm)}
        />

        </TouchableOpacity>
        
        <ScrollView style={styles.listingsContainer}>

        {/* Logs the message and returns it for rendering */}
        <View>
            <Text>
                {logMessage(searchResults)}
            </Text>
        </View>
    
            {/* results */}
        
            {Array.isArray(searchResults) && searchResults.map((property) => (
            <TouchableOpacity
              key={property.id}
              style={styles.propertyItem}
              onPress={() => handlePropertyClick(property.id)} // Handle click
            >
                <Image source={{ uri: property.media}} style={styles.propertyImage}></Image>
              {/* <img src={property.media} style={styles.propertyImage} /> */}
              <View style={styles.propertyDetailsContainer}>
                <Text style={styles.propertyTitle}>
                  {property.address.street}, 
                  {property.address.city}, 
                  {property.address.state},
                  {property.address.zip}
                  {property.address.country}
                </Text>
                <Text style={styles.propertyDescription}>
                  Price: ${property.price.toLocaleString()}
                </Text>
                <Text style={styles.propertyDetails}>
                  {property.bedrooms} Bedrooms, {property.bathrooms} Bathrooms,{" "}
                  {property.sqft} sqft
                </Text>
                <Text style={styles.propertyTime}>{property.time}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleAddToFavorites(property.id)}
              >
                <img src={icons.favIcon} style={styles.favoriteIcon} alt="Favorite" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
        </View>
    );
     
    // return (

    //   <ScrollView style={styles.container}>
    //     <TouchableOpacity onPress={toggleMenu} style={styles.button}>
    //       <Text style={styles.buttonText}>{title}</Text> 
    //     </TouchableOpacity>
    //     {isOpen && (
    //       <View style={styles.menu}>
    //         <TextInput
    //           placeholder="Search..."
    //           value={searchTerm}
    //           onChangeText={setSearchTerm} // called when a text input changes
    //           style={styles.input}
    //           onSubmitEditing={() => search(searchTerm)} // runs when u press enter :)
    //         />
    //         {searchResults.length > 0 ? (
    //           <FlatList
    //             data={searchResults}
    //             keyExtractor={(item, index) => index.toString()}
    //             renderItem={({ item }) => <Text style={styles.option}>{item.address.city},{item.address.state}</Text>} // this is how you compose different properties (in this case a string "city" and "country") in a interface?? 
    //           />
    //         ) : (
    //           <Text style={styles.noOptionsText}>No options found</Text>
    //         )}
    //       </View>
    //     )}
    //   </View>
    // );
  };
  
  export default SearchController;

  const styles = StyleSheet.create({

    favoriteIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
      },
       
    propertyDetailsContainer: {
        alignItems: "center",
        padding: 10,
      },
      propertyTitle: {
        fontSize: 16,
        fontWeight: "600",
      },
      propertyDescription: {
        fontSize: 12,
        color: "#555",
      },
      propertyDetails: {
        fontSize: 12,
        color: "#777",
      },
      propertyTime: {
        fontSize: 10,
        color: "#999",
      },

    propertyImage: {
        width: "100%",
        height: 200,
        borderRadius: 8,
      },

    propertyItem: {
        marginBottom: 15,
        alignItems: "center",
        width: "90%",
        alignSelf: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 2,
      },

    listingsContainer: {
        flexGrow: 1, // Allow ScrollView to expand
      },
    container: {
      flexGrow: 1,
      // borderRadius: 5,
      // width: 250,
      // marginBottom: 10,
  
      flexDirection: "column",
      marginBottom: 10,
    },
    button: {
      // backgroundColor: '#007BFF',
      // padding: 10,
      paddingBottom: 10,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
    buttonText: {
      color: "black",
      textAlign: "left",
      fontSize: 14,
      // padding: 0,
    },
    menu: {
      // padding: 10,
      backgroundColor: "#f9f9f9",
    },
    input: {
      width: "100%",
      padding: 8,
      marginBottom: 10,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 4,
    },
    option: {
      padding: 10,
    },
    noOptionsText: {
      textAlign: "center",
      color: "#999",
    },
  });