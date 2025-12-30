import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SkeletonBox = ({ width, height, style, borderRadius = 8 }) => {
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
        <Animated.View
            style={[
                styles.skeletonBox,
                { width, height, opacity, borderRadius },
                style
            ]}
        />
    );
};

const SkeletonCard = () => (
    <View style={styles.card}>
        <View style={styles.cardLeft}>
            <SkeletonBox width={100} height={20} style={{ marginBottom: 8 }} />
            <SkeletonBox width={160} height={16} />
        </View>
        <SkeletonBox width={80} height={32} />
    </View>
);

const HomeSkeleton = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SkeletonBox width={220} height={32} style={{ marginBottom: 8 }} />
                <SkeletonBox width={140} height={20} />
            </View>

            <View style={styles.section}>
                <SkeletonBox width={120} height={24} style={{ marginBottom: 12 }} />
                <SkeletonCard />
            </View>

            <View style={styles.sectionHeaderRow}>
                <SkeletonBox width={140} height={24} />
                <SkeletonBox width={32} height={32} borderRadius={16} />
            </View>

            <View style={styles.section}>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </View>

            <View style={styles.section}>
                <SkeletonBox width={100} height={20} style={{ marginBottom: 12 }} />
                <SkeletonCard />
                <SkeletonCard />
            </View>

            <View style={styles.chartCard}>
                <SkeletonBox width={120} height={24} style={{ marginBottom: 20 }} />
                <SkeletonBox width="100%" height={200} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    skeletonBox: {
        backgroundColor: '#D1D5DB',
    },
    header: {
        marginBottom: 24,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    cardLeft: {
        flex: 1,
    },
    chartCard: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
});

export default HomeSkeleton;
