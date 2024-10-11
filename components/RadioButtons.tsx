// CustomRadioButton.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface RadioOption {
    label: string;
    value: string;
}

interface CustomRadioButtonProps {
    options: RadioOption[];
    selectedValue: string;
    onSelect: (value: string) => void;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({ options, selectedValue, onSelect }) => {
    return (
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
            {options.map((option) => (
                <TouchableOpacity
                    key={option.value}
                    style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                    onPress={() => onSelect(option.value)}
                >
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: selectedValue === option.value ? '#0286FF' : '#ccc',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {selectedValue === option.value && (
                            <View
                                style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: 6,
                                    backgroundColor: '#0286FF',
                                }}
                            />
                        )}
                    </View>
                    <Text style={{ marginLeft: 5, color: '#000' }}>{option.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default CustomRadioButton;
