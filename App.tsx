import React, { useState } from 'react';
import { StatusBar, StyleSheet, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UserDetailsScreen from './src/screens/UserDetailsScreen';
import WorkoutTrackerScreen from './src/screens/WorkoutTrackerScreen';
import HomeScreen from './src/screens/HomeScreen';

// Define the type for UserDetails
interface UserDetails {
  name: string;
  weight: string;
  weightUnit: 'kg' | 'lbs';
  height: string;
  heightUnit: 'cm' | 'ft';
}

// Define the types for the navigation parameters
export type RootStackParamList = {
  UserDetails: undefined; // No params needed for initial screen
  Home: { userDetails: UserDetails };
  FitnessTracker: { userDetails: UserDetails };
  CalorieTracker: undefined; // Or define params if it becomes a real screen
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator initialRouteName="UserDetails" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="UserDetails">
            {props => (
              <UserDetailsScreen
                {...props}
                onSaveDetails={(details) => {
                  setUserDetails(details);
                  props.navigation.replace('Home', { userDetails: details });
                }}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Home">
            {props => userDetails ? (
              <HomeScreen
                {...props}
                userDetails={userDetails}
                onNavigateToFitnessTracker={() => props.navigation.navigate('FitnessTracker', { userDetails: userDetails })}
                onNavigateToCalorieTracker={() => Alert.alert("Under Development", "The Calorie Tracker is currently under development.")}
                onEditUserDetails={() => props.navigation.navigate('UserDetails')} // Navigate back to UserDetails
              />
            ) : (
              // If userDetails is null, navigate back to UserDetails screen
              props.navigation.navigate('UserDetails')
            )}
          </Stack.Screen>
          <Stack.Screen name="FitnessTracker">
            {props => userDetails ? (
              <WorkoutTrackerScreen
                {...props}
                userDetails={userDetails}
                // onGoBack is no longer needed as stack navigator handles back button
              />
            ) : (
              // If userDetails is null, navigate back to UserDetails screen
              props.navigation.navigate('UserDetails')
            )}
          </Stack.Screen>
          {/* CalorieTracker screen can be added here if it becomes a full screen */}
          {/* <Stack.Screen name="CalorieTracker" component={CalorieTrackerScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Ensure background matches theme
  },
});
