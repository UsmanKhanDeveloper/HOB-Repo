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
    {/* ^ this is a fragment and u use it to wrap views together  */}

    {/* horizontal container */}
    <View style={styles.container}>
    <Image
      style={styles.image}
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
    <View style={styles.container}>

      {/* vertical container */}
      <View style={styles.verticalContainer}>
          <TouchableOpacity>
              <Image style={styles.icon}
              source={images.primary}
              ></Image>
          </TouchableOpacity>

          <Text>Save Search</Text>
      </View>

      <Text>Find Your Dream Home</Text>

      <View style={styles.verticalContainer}>
          <TouchableOpacity>
              <Image style={styles.icon}
              source={icons.filters}
              ></Image>
          </TouchableOpacity>

          <Text>Save Search</Text>
      </View>
    </View>


    </>) 
}

export default Homepage;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      justifyContent: 'space-between',
      flexDirection: 'row',
      padding: 15,
    }, 
    verticalContainer: {
      backgroundColor: '#fff',
      justifyContent: 'space-between',
      flexDirection: 'column',
      padding: 10,
    },
    centeredContainer: {
      // flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      fontSize: 16,
    },
    boldedText: {
      fontWeight: 'bold',
    },
    icon: {
      width: 20,
      height: 20,
    },
    image: {
      width: 140, 
      height: 60, 
      backgroundColor: '#0553', 
    },
    Button: {
      borderRadius: 38.5,
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