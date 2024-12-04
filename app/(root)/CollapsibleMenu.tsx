import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { fetchSuggestedLocation } from "../services/apiService";

// type 
interface CollapsibleMenuProps {
  title: string;
}

type PropertyData = {
  address: {
    city: string;
    state: string;
  },
}

// Searches the Zillow Database for suggested locations (City, State) for the search bar
const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<PropertyData[]>([]); // rename this

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Filter options based on the search term
  // const filteredOptions = options.filter(option =>
  //   option.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // Search is sent to API
  const search = async (searchTerm: string) => {
    // setSearchTerm(searchTerm);

    try {
      const result = await fetchSuggestedLocation(searchTerm);
      // set it in a variable
      setSearchResults(result);
    } catch (error) {
      console.error("Error fetching property data:", error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu} style={styles.button}>
        {/* TODO: look at "title" in the ui where is it*/}
        <Text style={styles.buttonText}>{title}</Text> 
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.menu}>
          <TextInput
            placeholder="Search..."
            value={searchTerm}
            onChangeText={setSearchTerm} // called when a text input changes
            style={styles.input}
            onSubmitEditing={() => search(searchTerm)} // runs when u press enter :)
          />
          {searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <Text style={styles.option}>{item.address.city},{item.address.state}</Text>} // this is how you compose different properties (in this case a string "city" and "country") in a interface?? 
            />
          ) : (
            <Text style={styles.noOptionsText}>No options found</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default CollapsibleMenu;

const styles = StyleSheet.create({
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
