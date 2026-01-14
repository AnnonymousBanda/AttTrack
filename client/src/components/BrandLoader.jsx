import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated, Text, Image, Easing } from 'react-native'
import { logo } from '../assets'

export const BrandLoader = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current

    // Create an array of 3 animated values for the dots
    const dotAnims = useRef([
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
    ]).current

    useEffect(() => {
        // 1. Fade in the logo and text
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start()

        // 2. Start dot animations with stagger effect
        Animated.stagger(
            200, // 200ms delay between each dot
            dotAnims.map((anim) =>
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(anim, {
                            toValue: 1,
                            duration: 500,
                            easing: Easing.inOut(Easing.quad),
                            useNativeDriver: true,
                        }),
                        Animated.timing(anim, {
                            toValue: 0,
                            duration: 500,
                            easing: Easing.inOut(Easing.quad),
                            useNativeDriver: true,
                        }),
                    ])
                )
            )
        ).start()
    }, [])

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                {/* 1. App Logo */}
                <Image source={logo} style={styles.logo} resizeMode="contain" />

                {/* 2. Brand Name */}
                <Text style={styles.h1}>AttTrack</Text>

                {/* 3. Three Dot Loader */}
                <View style={styles.dotContainer}>
                    {dotAnims.map((anim, index) => (
                        <Animated.View
                            key={index}
                            style={[
                                styles.dot,
                                {
                                    opacity: anim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.3, 1],
                                    }),
                                    transform: [
                                        {
                                            translateY: anim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [0, -2.5], // Moves dot up by 2.5 units
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        />
                    ))}
                </View>
            </Animated.View>
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
    content: {
        alignItems: 'center',
        width: '100%',
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    h1: {
        fontSize: 36,
        fontWeight: '800',
        color: '#1A1A1A',
        letterSpacing: -1,
    },
    dotContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#3a3a3a',
        marginHorizontal: 4,
    },
})
