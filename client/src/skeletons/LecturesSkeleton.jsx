import { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

const SkeletonBox = ({ style }) => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.7,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        );
        animation.start();
        return () => animation.stop();
    }, [opacity]);

    return (
        <Animated.View style={[styles.skeletonColor, { opacity }, style]} />
    );
};

const LecturesCard = () => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.timeColumn}>
                <SkeletonBox style={{ width: 50, height: 20, borderRadius: 4 }} />
                <SkeletonBox style={{ width: 50, height: 16, borderRadius: 4 }} />
            </View>

            <View style={styles.card}>
                <SkeletonBox style={{ width: '75%', height: 24, borderRadius: 4 }} />
                <SkeletonBox style={{ width: '40%', height: 32, borderRadius: 6 }} />
            </View>
        </View>
    );
};

export default function LecturesSkeleton() {
    return (
        <View style={styles.container}>
            {Array.from({ length: 6 }).map((_, index) => (
                <LecturesCard key={index} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        gap: 20,
        paddingTop: 10,
    },
    cardContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    timeColumn: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        width: 50,
    },
    card: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#e5e7eb',
        borderLeftColor: '#d1d5db',
        borderLeftWidth: 2,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        padding: 24,
        gap: 24,
    },
    skeletonColor: {
        backgroundColor: '#d1d5db',
    },
});
