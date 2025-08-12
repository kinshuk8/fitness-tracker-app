import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; // Import RootStackParamList

interface UserDetails {
    name: string;
    weight: string;
    weightUnit: 'kg' | 'lbs';
    height: string;
    heightUnit: 'cm' | 'ft';
}

interface HomeScreenProps extends StackScreenProps<RootStackParamList, 'Home'> {
    userDetails: UserDetails;
    onNavigateToFitnessTracker: () => void;
    onNavigateToCalorieTracker: () => void;
    onEditUserDetails: () => void;
}

const HomeScreen = ({ userDetails, onNavigateToFitnessTracker, onNavigateToCalorieTracker, onEditUserDetails, navigation }: HomeScreenProps) => {
    return (
        <View style={styles.container}>
            {/* The back button to edit details is now handled by navigation.navigate('UserDetails') */}
            <Text style={styles.title}>Welcome, {userDetails.name}!</Text>
            <Text style={styles.userDetailsText}>
                Weight: {userDetails.weight} {userDetails.weightUnit} | Height: {userDetails.height} {userDetails.heightUnit}
            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={onNavigateToFitnessTracker}>
                    <Text style={styles.actionButtonText}>Fitness Tracker</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={onNavigateToCalorieTracker}>
                    <Text style={styles.actionButtonText}>Calorie Tracker</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1a1a1a', // Dark background
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ff8c00',
        marginBottom: 10,
        textAlign: 'center',
        marginTop: 40, // Add top margin to account for removed back button space
    },
    userDetailsText: {
        fontSize: 18,
        color: '#e0e0e0',
        textAlign: 'center',
        marginBottom: 40,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    actionButton: {
        backgroundColor: '#ff8c00', // Dark orange accent
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 7,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
