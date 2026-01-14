import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated, Easing } from 'react-native'

const Bar = ({ delay }) => {
    const scaleY = useRef(new Animated.Value(1)).current

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                // 1. Wait for the wave to reach this bar
                Animated.delay(delay),
                // 2. Quick rise
                Animated.timing(scaleY, {
                    toValue: 2.8,
                    duration: 350,
                    easing: Easing.bezier(0.4, 0, 0.2, 1),
                    useNativeDriver: true,
                }),
                // 3. Smooth fall back to base
                Animated.timing(scaleY, {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.bezier(0.4, 0, 0.2, 1),
                    useNativeDriver: true,
                }),
                // 4. Brief pause before the next wave cycle starts
                Animated.delay(300),
            ])
        ).start()
    }, [])

    return (
        <View style={styles.barWrapper}>
            <Animated.View style={[styles.bar, { transform: [{ scaleY }] }]} />
        </View>
    )
}

export const BrandLoader = () => {
    return (
        <View style={styles.container}>
            <View style={styles.barContainer}>
                {/* Each bar has a 100ms increment to create the left-to-right wave */}
                <Bar delay={0} />
                <Bar delay={100} />
                <Bar delay={200} />
                <Bar delay={300} />
                <Bar delay={400} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    barContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end', // Aligns bars to the bottom of the line
        height: 40,
    },
    barWrapper: {
        height: 12, // The base height
        justifyContent: 'flex-end',
        marginHorizontal: 3,
    },
    bar: {
        width: 4,
        height: 12,
        backgroundColor: '#3a3a3a',
        borderRadius: 2,
    },
})
