import React from "react";
import { Image } from 'expo-image';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { icons, images } from "@/constants";
import { router, useNavigation } from "expo-router";

function Homepage(){

  const navigation = useNavigation();
    
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