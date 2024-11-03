import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

interface CollapsibleMenuProps {
  title: string;
  options: string[];
}

const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Filter options based on the search term
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu} style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.menu}>
          <TextInput
            placeholder="Search..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={styles.input}
          />
          {filteredOptions.length > 0 ? (
            <FlatList
              data={filteredOptions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <Text style={styles.option}>{item}</Text>}
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

    flexDirection: 'column',
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
    color: 'black',
    textAlign: 'left',
    fontSize: 14,
    // padding: 0,

  },
  menu: {
    // padding: 10,
    backgroundColor: '#f9f9f9',
  },
  input: {
    width: '100%',
    padding: 8,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
  option: {
    padding: 10,
  },
  noOptionsText: {
    textAlign: 'center',
    color: '#999',
  },
});
