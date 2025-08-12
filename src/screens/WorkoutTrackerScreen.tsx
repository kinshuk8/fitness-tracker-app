import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// Define the shape of a single workout
interface Workout {
  name: string;
  sets: string;
  reps: string;
}

// Define the shape of a workout routine
interface Routine {
  name: string;
  workouts: Workout[];
}

// Define the props for this screen
interface UserDetails {
  name: string;
  weight: string;
  weightUnit: 'kg' | 'lbs';
  height: string;
  heightUnit: 'cm' | 'ft';
}

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; // Import RootStackParamList

interface WorkoutTrackerScreenProps extends StackScreenProps<RootStackParamList, 'FitnessTracker'> {
  userDetails: UserDetails;
  // onGoBack is no longer needed with stack navigation
}

const WorkoutTrackerScreen: React.FC<WorkoutTrackerScreenProps> = ({ userDetails }) => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [newRoutineName, setNewRoutineName] = useState<string>('');
  const [newWorkout, setNewWorkout] = useState<Workout>({ name: '', sets: '', reps: '' });

  const addRoutine = () => {
    if (newRoutineName.trim()) {
      setRoutines([...routines, { name: newRoutineName.trim(), workouts: [] }]);
      setNewRoutineName('');
    } else {
      Alert.alert("Input Error", "Routine name cannot be empty.");
    }
  };

  const addWorkoutToRoutine = (routineIndex: number) => {
    if (newWorkout.name.trim() && newWorkout.sets.trim() && newWorkout.reps.trim()) {
      const updatedRoutines = [...routines];
      updatedRoutines[routineIndex].workouts.push({
        name: newWorkout.name.trim(),
        sets: newWorkout.sets.trim(),
        reps: newWorkout.reps.trim(),
      });
      setRoutines(updatedRoutines);
      setNewWorkout({ name: '', sets: '', reps: '' });
    } else {
      Alert.alert("Input Error", "Please fill all workout fields.");
    }
  };

  const renderRoutine = ({ item, index }: { item: Routine, index: number }) => (
    <View style={styles.routineCard}>
      <Text style={styles.routineTitle}>{item.name}</Text>
      {item.workouts.length > 0 ? (
        <FlatList
          data={item.workouts}
          renderItem={({ item: workout }: { item: Workout }) => (
            <View style={styles.workoutItem}>
              <Text style={styles.workoutText}>
                {workout.name} - {workout.sets} sets x {workout.reps} reps
              </Text>
            </View>
          )}
          keyExtractor={(_, idx) => idx.toString()}
        />
      ) : (
        <Text style={styles.noWorkoutsText}>No workouts added yet. Add some below!</Text>
      )}

      <View style={styles.workoutInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Workout Name"
          placeholderTextColor="#999"
          value={newWorkout.name}
          onChangeText={text => setNewWorkout({ ...newWorkout, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Sets"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={newWorkout.sets}
          onChangeText={text => setNewWorkout({ ...newWorkout, sets: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Reps"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={newWorkout.reps}
          onChangeText={text => setNewWorkout({ ...newWorkout, reps: text })}
        />
        <TouchableOpacity style={styles.addWorkoutButton} onPress={() => addWorkoutToRoutine(index)}>
          <Text style={styles.addWorkoutButtonText}>Add Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Welcome, {userDetails.name}!</Text>
      <Text style={styles.userDetailsText}>
        Weight: {userDetails.weight} {userDetails.weightUnit} | Height: {userDetails.height} {userDetails.heightUnit}
      </Text>

      <View style={styles.addRoutineContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Routine Name (e.g., Push Day)"
          placeholderTextColor="#999"
          value={newRoutineName}
          onChangeText={setNewRoutineName}
        />
        <TouchableOpacity style={styles.addRoutineButton} onPress={addRoutine}>
          <Text style={styles.addRoutineButtonText}>Add Routine</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={routines}
        renderItem={renderRoutine}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.routinesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70, // Increased padding to make space for the back button
    backgroundColor: '#1a1a1a', // Dark background
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff8c00', // Dark orange accent
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 10, // Add some top margin to push it down further
  },
  userDetailsText: {
    fontSize: 16,
    color: '#e0e0e0', // Light grey text
    textAlign: 'center',
    marginBottom: 20,
  },
  addRoutineContainer: {
    backgroundColor: '#2a2a2a', // Slightly lighter dark for containers
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#444', // Darker border
    backgroundColor: '#3a3a3a', // Input background
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#f0f0f0', // Light text
    marginBottom: 10,
  },
  addRoutineButton: {
    backgroundColor: '#ff8c00', // Dark orange accent
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 7,
  },
  addRoutineButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  routinesList: {
    paddingBottom: 20,
  },
  routineCard: {
    backgroundColor: '#2a2a2a', // Slightly lighter dark for cards
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  routineTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff8c00', // Dark orange accent
    marginBottom: 10,
  },
  workoutItem: {
    backgroundColor: '#3a3a3a', // Even lighter dark for workout items
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  workoutText: {
    fontSize: 16,
    color: '#f0f0f0', // Light text
  },
  noWorkoutsText: {
    fontSize: 14,
    color: '#aaa', // Lighter grey for italic text
    fontStyle: 'italic',
    marginBottom: 10,
  },
  workoutInputContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#444', // Darker separator
    paddingTop: 15,
  },
  addWorkoutButton: {
    backgroundColor: '#ff8c00', // Dark orange accent
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 7,
  },
  addWorkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WorkoutTrackerScreen;
