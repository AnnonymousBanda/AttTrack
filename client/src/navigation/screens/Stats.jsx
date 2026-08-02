import React, { useCallback, useEffect, useState, useRef } from 'react'
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Dimensions,
    Animated,
    Alert,
    Pressable,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { PieChart } from 'react-native-gifted-charts'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useAuth } from '../../context'

const SCREEN_WIDTH = Dimensions.get('window').width
const CARD_WIDTH = SCREEN_WIDTH - 40
const CARD_SPACING = 12

const SkeletonBox = ({ style }) => {
    const opacity = useRef(new Animated.Value(0.3)).current

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
        )
        animation.start()
        return () => animation.stop()
    }, [])

    return (
        <Animated.View
            style={[
                { backgroundColor: '#d1d5db', borderRadius: 8 },
                { opacity },
                style,
            ]}
        />
    )
}

const StatsSkeleton = () => (
    <View style={styles.skeletonContainer}>
        <SkeletonBox
            style={{
                width: 200,
                height: 32,
                alignSelf: 'center',
                marginBottom: 20,
            }}
        />

        <View style={styles.card}>
            <SkeletonBox
                style={{
                    width: 150,
                    height: 24,
                    alignSelf: 'center',
                    marginBottom: 20,
                }}
            />
            <SkeletonBox style={{ width: '100%', height: 200 }} />
        </View>

        <View style={styles.card}>
            <SkeletonBox
                style={{
                    width: 120,
                    height: 24,
                    alignSelf: 'center',
                    marginBottom: 20,
                }}
            />
            <SkeletonBox style={{ width: '100%', height: 250 }} />
        </View>
    </View>
)

const NoPie = () => (
    <View style={styles.noPieContainer}>
        <MaterialCommunityIcons
            name="chart-box-outline"
            size={60}
            color="#6b7280"
        />
        <Text style={styles.noPieText}>
            Start marking your attendance to see the stats
        </Text>
    </View>
)

const SummaryBar = ({
    style,
    data = [],
    maxValue = 100,
    labelWidth = 62,
    valueFormatter = (value) => `${value}%`,
}) => {
    const resolvedMaxValue = Math.max(maxValue, 100)

    return (
        <View style={[styles.summaryBarList, style]}>
            {data.map((item, index) => {
                const percent = Math.max(
                    0,
                    Math.min(100, (item.value / resolvedMaxValue) * 100)
                )
                const fillWidth = `${percent}%`
                const isZero = percent === 0
                const textColor = percent >= 55 ? '#ffffff' : '#111827'

                return (
                    <View
                        key={`${item.label}-${index}`}
                        style={styles.summaryBarRow}
                    >
                        <View
                            style={[
                                styles.summaryBarLabelBox,
                                { width: labelWidth },
                            ]}
                        >
                            <Text
                                style={styles.summaryBarLabel}
                                numberOfLines={1}
                            >
                                {item.label}
                            </Text>
                        </View>

                        <View style={[styles.summaryBarTrack, { flex: 1 }]}>
                            {isZero ? (
                                <View style={styles.zeroCircle}>
                                    <Text style={styles.zeroCircleText}>
                                        0%
                                    </Text>
                                </View>
                            ) : (
                                <View
                                    style={[
                                        styles.summaryBarFill,
                                        {
                                            width: fillWidth,
                                            backgroundColor:
                                                item.color || '#4BC0C0',
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.summaryBarFillText,
                                            { color: textColor },
                                        ]}
                                    >
                                        {valueFormatter(item.value)}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

const AnalysisCard = ({ item, onPressIn }) => {
    const pieData = [
        { value: item.present, color: '#4BC0C0' },
        { value: item.medical, color: '#FFCE56' },
        { value: item.absent, color: '#FF6384' },
    ].filter((d) => d.value > 0)

    const hasData = item.present > 0 || item.absent > 0 || item.medical > 0

    let statusColor = '#FF6384'
    if (item.presentPercentage >= 90) statusColor = '#4BC0C0'
    else if (item.presentPercentage >= 75) statusColor = '#FFCE56'

    return (
        <Pressable
            style={[
                styles.analysisPressable,
                {
                    marginHorizontal: 0,
                },
            ]}
            onPressIn={onPressIn}
        >
            <View
                style={[
                    styles.card,
                    {
                        width: 300,
                        marginHorizontal: 0,
                        backgroundColor: '#f1f1f1',
                        rounded: 12,
                        minHeight: 380,
                        maxHeight: 380,
                    },
                ]}
            >
                <Text style={styles.courseTitle}>
                    Course Code: {item.courseCode}
                </Text>

                <View style={styles.pieContainer}>
                    {!hasData ? (
                        <NoPie />
                    ) : (
                        <>
                            <PieChart
                                data={pieData}
                                donut
                                radius={80}
                                innerRadius={0}
                                showText
                                textSize={12}
                                textColor="black"
                            />

                            <View style={styles.legendContainer}>
                                <View style={styles.legendRow}>
                                    <View
                                        style={[
                                            styles.dot,
                                            { backgroundColor: '#4BC0C0' },
                                        ]}
                                    />
                                    <Text>Present: {item.present}</Text>
                                </View>
                                <View style={styles.legendRow}>
                                    <View
                                        style={[
                                            styles.dot,
                                            { backgroundColor: '#FFCE56' },
                                        ]}
                                    />
                                    <Text>Medical: {item.medical}</Text>
                                </View>
                                <View style={styles.legendRow}>
                                    <View
                                        style={[
                                            styles.dot,
                                            { backgroundColor: '#FF6384' },
                                        ]}
                                    />
                                    <Text>Absent: {item.absent}</Text>
                                </View>
                            </View>

                            <Text style={styles.currentText}>
                                Current:
                                <Text
                                    style={[
                                        styles.percentageBadge,
                                        { backgroundColor: statusColor },
                                    ]}
                                >
                                    {` ${Math.floor(item.presentPercentage)}% `}
                                </Text>
                            </Text>
                        </>
                    )}
                </View>
            </View>
        </Pressable>
    )
}

export function Stats() {
    const [courseData, setCourseData] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeIndex, setActiveIndex] = useState(0)
    const flatListRef = useRef(null)
    const { user } = useAuth()

    const fetchAttendance = useCallback(async () => {
        setLoading(true)
        try {
            const API_URL = process.env.EXPO_PUBLIC_API_URL
            const res = await fetch(`${API_URL}/api/attendance/report`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': user?.id,
                },
            })
            const result = await res.json()
            if (res.ok) {
                const data = result?.data

                const coursesList = data?.map((course) => {
                    const totalPresent =
                        course.present_total + course.medical_total
                    const totalClassesHappened =
                        course.present_total +
                        course.absent_total +
                        course.medical_total

                    const presentPercentage =
                        totalClassesHappened === 0
                            ? 0
                            : (totalPresent / totalClassesHappened) * 100
                    // Calculate the minimum lectures to attend to maintain 75% attendance using the total number of classes , total present classes and total absent classes
                    const minimumLecturesToAttend =
                        presentPercentage >= 75
                            ? 0
                            : totalClassesHappened === 0
                              ? course.total_classes
                              : Math.ceil(
                                    (0.75 *
                                        (totalClassesHappened - totalPresent)) /
                                        0.25
                                )

                    const remainingClasses =
                        course.total_classes - totalClassesHappened
                    const maximumAchievableAttendance =
                        ((totalPresent + remainingClasses) /
                            course.total_classes) *
                        100

                    return {
                        courseCode: course.course_code,
                        courseName: course.courses.course_name,
                        present: course.present_total,
                        absent: course.absent_total,
                        medical: course.medical_total,
                        totalClasses: course.total_classes,
                        presentPercentage:
                            totalClassesHappened === 0
                                ? 0
                                : (totalPresent / totalClassesHappened) * 100,
                        minimumLecturesToAttend: minimumLecturesToAttend,
                        maximumAchievableAttendance:
                            maximumAchievableAttendance,
                    }
                })

                setCourseData(coursesList)
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch attendance data')
        } finally {
            setLoading(false)
        }
    }, [user])

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchAttendance()
        })

        return unsubscribe
    }, [navigation, fetchAttendance])

    useEffect(() => {
        if (!courseData.length) return

        const timer = setInterval(() => {
            setActiveIndex((prev) => {
                const nextIndex = prev + 1
                const targetIndex =
                    nextIndex >= courseData.length ? 0 : nextIndex

                flatListRef.current?.scrollToIndex({
                    index: targetIndex,
                    animated: true,
                })

                return targetIndex
            })
        }, 3000)

        return () => clearInterval(timer)
    }, [courseData.length])

    const getOrdinalSuffix = (n) => {
        const s = ['th', 'st', 'nd', 'rd']
        const v = n % 100
        return n + (s[(v - 20) % 10] || s[v] || s[0])
    }
    const date = new Date()
    const formattedDate = `${date.toLocaleString('default', {
        month: 'long',
    })} ${getOrdinalSuffix(date.getDate())}`

    const attendanceSummaryData = courseData?.map((item) => ({
        value: item.presentPercentage,
        label: item.courseCode,
        color: item.presentPercentage >= 75 ? '#4BC0C0' : '#FF6384',
    }))

    const minClassesSummaryData = courseData?.map((item) => ({
        value: item.minimumLecturesToAttend,
        label: item.courseCode,
        color: '#36A2EB',
    }))

    const maxAchievableSummaryData = courseData?.map((item) => ({
        value: item.maximumAchievableAttendance,
        label: item.courseCode,
        color: item.maximumAchievableAttendance >= 75 ? '#4BC0C0' : '#FF6384',
    }))

    if (loading) return <StatsSkeleton />

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 40 }}
            // nestedScrollEnabled={true}
        >
            <View style={styles.header}>
                <Text style={styles.dateText}>Today, {formattedDate}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Attendance by Course</Text>
                <SummaryBar
                    data={attendanceSummaryData}
                    maxValue={100}
                    valueFormatter={(value) => `${Math.round(value)}%`}
                />
            </View>

            <View
                style={[
                    styles.card,
                    {
                        padding: 0,
                        paddingVertical: 20,
                        overflow: 'hidden',
                    },
                ]}
            >
                <Text style={styles.sectionTitle}>Analysis</Text>
                <FlatList
                    ref={flatListRef}
                    data={courseData}
                    keyExtractor={(item, index) =>
                        `${item.courseCode}-${index}`
                    }
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment="center"
                    decelerationRate="fast"
                    contentContainerStyle={{
                        paddingHorizontal: 8,
                        paddingBottom: 8,
                    }}
                    onMomentumScrollEnd={(event) => {
                        const contentOffsetX = event.nativeEvent.contentOffset.x
                        const viewSize =
                            event.nativeEvent.layoutMeasurement.width
                        const index = Math.round(contentOffsetX / viewSize)
                        setActiveIndex(index)
                    }}
                    renderItem={({ item }) => (
                        <View style={styles.analysisItem}>
                            <AnalysisCard item={item} />
                        </View>
                    )}
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle, { marginBottom: 20, fontSize: 18, fontWeight: 'bold', color: '#1f2937' }}>Predictions</Text>

                <Text style={styles.subTitle}>
                    Minimum classes to maintain 75%
                </Text>
                <SummaryBar
                style={{ marginBottom: 20 }}
                    data={minClassesSummaryData}
                    maxValue={() => {
                        const maxValue = Math.max(
                            ...minClassesSummaryData.map((item) => item.value)
                        )
                        return maxValue > 0 ? maxValue : 1
                    }}
                    valueFormatter={(value) => `${value}`}
                />

                <Text style={styles.subTitle}>
                    Maximum achievable attendance
                </Text>
                <SummaryBar
                    data={maxAchievableSummaryData}
                    maxValue={100}
                    valueFormatter={(value) => `${Math.round(value)}%`}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        padding: 16,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6b7280',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignItems: 'center',
    },
    analysisItem: {
        width: CARD_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    analysisWrapper: {
        width: CARD_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
    },
    analysisPressable: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    analysisCardContent: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },
    summaryBarList: {
        width: '100%',
        gap: 10,
        marginVertical: 8,
    },
    summaryBarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: 8,
    },
    summaryBarLabelBox: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexShrink: 0,
    },
    summaryBarLabel: {
        color: '#111827',
        fontSize: 14,
        fontWeight: '600',
    },
    summaryBarTrack: {
        height: 28,
        backgroundColor: '#e5e7eb',
        borderRadius: 999,
        overflow: 'hidden',
        position: 'relative',
    },
    summaryBarFill: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10,
        borderRadius: 999,
    },
    summaryBarFillText: {
        fontSize: 11,
        fontWeight: '600',
        zIndex: 2,
    },
    zeroCircle: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d1d5db',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    zeroCircleText: {
        color: '#3a3a3a',
        fontSize: 10,
        fontWeight: '700',
    },
    summaryBarValue: {
        fontSize: 11,
        fontWeight: '600',
        zIndex: 2,
    },
    chartContainer: {
        // alignItems: 'center',
        // justifyContent: 'center',
        height: 350,
        width: '100%',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4b5563',
        marginBottom: 10,
        alignSelf: 'flex-start',
        width: '100%',
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    pieContainer: {
        alignItems: 'center',
        width: '100%',
    },
    noPieContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noPieText: {
        textAlign: 'center',
        color: '#6b7280',
        marginTop: 10,
        width: 200,
    },
    legendContainer: {
        flexDirection: 'row',
        gap: 15,
        marginTop: 20,
        marginBottom: 20,
    },
    legendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    currentText: {
        fontSize: 16,
        color: '#374151',
    },
    percentageBadge: {
        color: 'white',
        fontWeight: 'bold',
        borderRadius: 6,
        overflow: 'hidden',
    },
    chartLabel: {
        color: '#111827',
        fontSize: 10,
        marginBottom: 2,
    },
    axisLabel: {
        fontSize: 11.2,
        color: '#3a3a3a',
    },
    barValue: {
        color: '#3a3a3a',
        fontSize: 8,
        fontWeight: '600',
    },
    chartHint: {
        fontSize: 12,
        color: '#3a3a3a',
        marginTop: 10,
        textAlign: 'center',
    },
    skeletonContainer: {
        padding: 20,
    },
    emptyCard: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#e0e1e2',
        borderRadius: 16,
        padding: 20,
        margin: 10, // Added padding for better spacing
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        minHeight: 250,
        flex: 1, // Ensures it has enough presence on the screen
    },
    emptyTextTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#101828',
        marginBottom: 4,
        marginTop: 12, // Space between icon and text
    },
    emptyTextSubtitle: {
        fontSize: 14,
        color: '#667085',
        textAlign: 'center',
        lineHeight: 20,
    },
})

const ComingSoon = () => (
    <View style={styles.emptyCard}>
        <MaterialCommunityIcons
            name="chart-timeline-variant"
            size={50}
            color="#6F8DBD"
        />
        <Text style={styles.emptyTextTitle}>Analytics Coming Soon</Text>
        <Text style={styles.emptyTextSubtitle}>
            We're building powerful insights to help{'\n'}you stay on top of
            your attendance!
        </Text>
    </View>
)
