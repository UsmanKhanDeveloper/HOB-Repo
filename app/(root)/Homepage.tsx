import React from "react";
import Logo from "./Logo.png";
import { Image } from 'expo-image';
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { images } from "@/constants";

function Homepage(){
    
    return (<View style={styles.container}>
    <Image
      style={styles.image}
      source={images.icon}
      contentFit="cover"
      transition={1000} 
    />

    <View style={styles.Button}>
      <Text style={styles.ButtonText}>Sign in</Text>  
    </View> 

    </View>) 
}

export default Homepage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    //   alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      padding: 15,
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