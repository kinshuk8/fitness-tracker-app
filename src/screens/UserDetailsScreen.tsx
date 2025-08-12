import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
// import { Picker } from '@react-native-picker/picker'; // Remove Picker import
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; // Import RootStackParamList
import NumberWheelPicker from '../components/NumberWheelPicker'; // Import custom wheel picker

interface UserDetails {
    name: string;
    weight: string;
    weightUnit: 'kg' | 'lbs';
    height: string;
    heightUnit: 'cm' | 'ft';
}

interface UserDetailsScreenProps extends StackScreenProps<RootStackParamList, 'UserDetails'> {
    onSaveDetails: (details: UserDetails) => void;
}

const UserDetailsScreen = ({ onSaveDetails, navigation }: UserDetailsScreenProps) => {
    const [name, setName] = useState("");
    const [weight, setWeight] = useState(70); // Default weight in kg
    const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
    const [height, setHeight] = useState(170); // Default height in cm
    const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");

    const handleSave = () => {
        if (name.trim() && weight > 0 && height > 0) {
            onSaveDetails({
                name: name.trim(),
                weight: weight.toString(),
                weightUnit,
                height: height.toString(),
                heightUnit
            });
        } else {
            Alert.alert("Validation Error", "Please fill out your name and ensure weight/height are valid.");
        }
    };

    const generateNumberArray = (min: number, max: number, step: number) => {
        const numbers = [];
        for (let i = min; i <= max; i += step) {
            numbers.push(parseFloat(i.toFixed(1))); // Ensure consistent decimal places
        }
        return numbers;
    };

    const weightData = weightUnit === 'kg' ? generateNumberArray(0, 200, 0.5) : generateNumberArray(0, 440, 1);
    const heightData = heightUnit === 'cm' ? generateNumberArray(0, 220, 1) : generateNumberArray(0, 7, 0.1);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tell Us About Yourself</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Weight</Text>
                <View style={styles.valueUnitContainer}>
                    <View style={styles.pickerValueContainer}>
                        <NumberWheelPicker
                            data={weightData}
                            selectedValue={weight}
                            onValueChange={setWeight}
                            itemHeight={50}
                        />
                    </View>
                    <View style={styles.unitToggleContainer}>
                        <TouchableOpacity
                            style={[styles.unitToggleButton, weightUnit === 'kg' && styles.unitToggleButtonActive]}
                            onPress={() => setWeightUnit('kg')}
                        >
                            <Text style={[styles.unitToggleButtonText, weightUnit === 'kg' && styles.unitToggleButtonTextActive]}>kg</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.unitToggleButton, weightUnit === 'lbs' && styles.unitToggleButtonActive]}
                            onPress={() => setWeightUnit('lbs')}
                        >
                            <Text style={[styles.unitToggleButtonText, weightUnit === 'lbs' && styles.unitToggleButtonTextActive]}>lbs</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Height</Text>
                <View style={styles.valueUnitContainer}>
                    <View style={styles.pickerValueContainer}>
                        <NumberWheelPicker
                            data={heightData}
                            selectedValue={height}
                            onValueChange={setHeight}
                            itemHeight={50}
                        />
                    </View>
                    <View style={styles.unitToggleContainer}>
                        <TouchableOpacity
                            style={[styles.unitToggleButton, heightUnit === 'cm' && styles.unitToggleButtonActive]}
                            onPress={() => setHeightUnit('cm')}
                        >
                            <Text style={[styles.unitToggleButtonText, heightUnit === 'cm' && styles.unitToggleButtonTextActive]}>cm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.unitToggleButton, heightUnit === 'ft' && styles.unitToggleButtonActive]}
                            onPress={() => setHeightUnit('ft')}
                        >
                            <Text style={[styles.unitToggleButtonText, heightUnit === 'ft' && styles.unitToggleButtonTextActive]}>ft</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save and Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 25,
        backgroundColor: '#1a1a1a', // Dark background
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ff8c00', // Dark orange accent
        marginBottom: 30,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#e0e0e0', // Light grey for labels
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#444', // Darker border
        backgroundColor: '#2a2a2a', // Slightly lighter dark for inputs
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        color: '#f0f0f0', // Light text
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    valueUnitContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden', // Clip children to rounded borders
        height: 150, // Fixed height for the container
    },
    pickerValueContainer: {
        flex: 2,
        height: '100%', // Take full height of parent
        justifyContent: 'center',
    },
    valuePicker: {
        height: '100%', // Take full height of parent
        width: '100%',
        color: '#f0f0f0',
    },
    unitToggleContainer: {
        flex: 1,
        flexDirection: 'column', // Changed to column for side-by-side radio buttons
        borderLeftWidth: 1,
        borderLeftColor: '#444',
        height: '100%',
    },
    unitToggleButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3a3a3a', // Slightly lighter dark for inactive
        paddingVertical: 15,
        borderBottomWidth: 1, // Separator for buttons
        borderBottomColor: '#444',
    },
    unitToggleButtonActive: {
        backgroundColor: '#ff8c00', // Dark orange for active
    },
    unitToggleButtonText: {
        color: '#f0f0f0', // Light text for inactive
        fontSize: 16,
        fontWeight: 'bold',
    },
    unitToggleButtonTextActive: {
        color: '#fff', // White text for active
    },
    saveButton: {
        backgroundColor: '#ff8c00', // Dark orange accent for button
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 7,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default UserDetailsScreen;
