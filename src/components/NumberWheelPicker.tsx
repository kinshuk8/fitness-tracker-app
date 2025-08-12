import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

interface NumberWheelPickerProps {
    data: number[];
    selectedValue: number;
    onValueChange: (value: number) => void;
    itemHeight?: number;
}

const NumberWheelPicker: React.FC<NumberWheelPickerProps> = ({
    data,
    selectedValue,
    onValueChange,
    itemHeight = 50, // Default item height
}) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const initialScrollIndex = data.indexOf(selectedValue);

    useEffect(() => {
        if (scrollViewRef.current && initialScrollIndex !== -1) {
            // Scroll to the initial selected value after render
            // Use setTimeout to ensure layout is calculated
            setTimeout(() => {
                scrollViewRef.current?.scrollTo({
                    y: initialScrollIndex * itemHeight,
                    animated: false,
                });
            }, 0);
        }
    }, [data, initialScrollIndex, itemHeight]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const y = event.nativeEvent.contentOffset.y;
        const index = Math.round(y / itemHeight);
        const newValue = data[index];
        if (newValue !== undefined && newValue !== selectedValue) {
            onValueChange(newValue);
        }
    };

    const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const y = event.nativeEvent.contentOffset.y;
        const index = Math.round(y / itemHeight);
        scrollViewRef.current?.scrollTo({
            y: index * itemHeight,
            animated: true,
        });
    };

    // Add padding to the top and bottom to center the selected item
    const padding = (screenHeight / 2) - (itemHeight / 2); // Adjust based on actual container height

    return (
        <View style={[styles.container, { height: itemHeight * 3 }]}> {/* Show 3 items at a time */}
            <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                scrollEventThrottle={16}
                contentContainerStyle={{
                    paddingVertical: (itemHeight * 3 / 2) - (itemHeight / 2), // Center the middle item
                }}
            >
                {data.map((item, index) => (
                    <View key={index} style={[styles.item, { height: itemHeight }]}>
                        <Text style={[
                            styles.itemText,
                            item === selectedValue && styles.selectedItemText,
                        ]}>
                            {item.toFixed(item % 1 !== 0 ? 1 : 0)}
                        </Text>
                    </View>
                ))}
            </ScrollView>
            <View style={[styles.selectionOverlay, { height: itemHeight }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: '#2a2a2a', // Match input background
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 20,
        color: '#e0e0e0', // Light grey for inactive items
    },
    selectedItemText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ff8c00', // Dark orange for selected item
    },
    selectionOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#ff8c00', // Dark orange border for selection
        top: '50%',
        marginTop: -25, // Half of itemHeight to center it
        opacity: 0.7,
    },
});

export default NumberWheelPicker;
