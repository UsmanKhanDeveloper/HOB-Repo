import React, { useEffect, useState } from "react";
import { Image } from 'expo-image';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { icons, images } from "@/constants";
import { router, useNavigation } from "expo-router";

interface listing {
  id: string;
  price: number;
  location: string;
  address: string;
  time: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
};

function Homepage(){

  const navigation = useNavigation();
  const [listing, setListings] = useState<listing[]>([]); 

  useEffect(() => {
    console.log("use effect called");
    setListings([
      { id: '1', price: 899000, location: 'Mississauga', address: '7222 Triumph Lane', time: '56 min ago', bedrooms: 3, bathrooms: 3, sqft: 1400 },
      { id: '2', price: 920000, location: 'Toronto', address: '123 Maple Street', time: '10 min ago', bedrooms: 4, bathrooms: 3, sqft: 1600 },
      { id: '3', price: 875000, location: 'Brampton', address: '55 Oak Avenue', time: '2 hours ago', bedrooms: 3, bathrooms: 2, sqft: 1350 },
  ]);
  }, []); 
    
  // const renderItem = ({ item }: { item: listing }) => (
  //   <View style={styles.propertyContainer}>
  //   <Text style={styles.price}>${item.price.toLocaleString()}</Text>
  //   <Text style={styles.location}>{item.location}</Text>
  //   <Text>{item.address}</Text>
  //   <Text>{item.bedrooms} Bedrooms, {item.bathrooms} Bathrooms</Text>
  //   <Text>{item.sqft} sqft</Text>
  //   <Text style={styles.time}>Listed {item.time}</Text>
  //   </View>
  // );

    return (
    <> 
    {/* ^ this is a fragment and u use it to wrap views together <3333 333 3/}

    {/* horizontal container */}
    <View style={styles.container}>
    <Image
      style={styles.logo}
      source={images.appLogo}
      contentFit="cover"
      transition={1000} 
    />

    <TouchableOpacity style={styles.Button}
      onPress = {() => {
        router.replace("/(auth)/log-in");
        console.log("Button pressed");
      }}>
      <Text style={styles.ButtonText}>Sign up</Text>
    </TouchableOpacity>

    </View>
    
    <View style={styles.centeredContainer}>
      <Text style={styles.boldedText}>Turning Home Dreams Into a Reality</Text>
    </View>

    {/* horizontal container */}
    <View style={styles.flexHorizontalContainer}>

      {/* vertical container */}
      <View style={styles.flexVerticalContainer}>
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

      <View style={styles.flexVerticalContainer}>
          <TouchableOpacity>
              <Image style={styles.icon}
              source={icons.filters}
              ></Image>
          </TouchableOpacity>
          <Text style={styles.iconText}>Save Search</Text>
      </View>
    </View>

    {/* toggle, num of listings and menu */}
    <View style={styles.flexHorizontalContainer}>

    </View>

    {/* listings */}
    <View style={styles.flexHorizontalContainer}>
      {/* const renderListingItem = ({ item }) => (); */}
    </View>
    </>) 
}

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
    icon: {
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
    Button: {
      borderRadius: 40,
      backgroundColor: '#596E85',
      height: 40,
    },
    ButtonText: {
      color: '#fff', 
      fontWeight: 'bold',
      fontFamily: 'Jakarta-Bold',
      textAlign: 'center',
      padding: 10,
      fontSize: 11,
    }
  }); 