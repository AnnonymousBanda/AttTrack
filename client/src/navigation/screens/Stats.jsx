import React, { useEffect, useState, useRef } from 'react'
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Dimensions,
    FlatList,
    Animated,
    Alert,
} from 'react-native'
import { BarChart, PieChart } from 'react-native-gifted-charts'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const getMockAttendanceData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: [
                    {
                        courseCode: 'CS101',
                        courseName: 'Intro to Programming',
                        presentPercentage: 85,
                        present: 17,
                        absent: 2,
                        medical: 1,
                        minimumLecturesToAttend: 0,
                        maximumAchievableAttendance: 92,
                    },
                    {
                        courseCode: 'MA201',
                        courseName: 'Mathematics II',
                        presentPercentage: 65,
                        present: 13,
                        absent: 7,
                        medical: 0,
                        minimumLecturesToAttend: 5,
                        maximumAchievableAttendance: 88,
                    },
                    {
                        courseCode: 'PH102',
                        courseName: 'Physics',
                        presentPercentage: 95,
                        present: 19,
                        absent: 1,
                        medical: 0,
                        minimumLecturesToAttend: 0,
                        maximumAchievableAttendance: 98,
                    },
                    {
                        courseCode: 'ME101',
                        courseName: 'Mechanics',
                        presentPercentage: 72,
                        present: 12,
                        absent: 5,
                        medical: 1,
                        minimumLecturesToAttend: 2,
                        maximumAchievableAttendance: 85,
                    },
                ],
            })
        }, 1500)
    })
}

const SCREEN_WIDTH = Dimensions.get('window').width

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

const AnalysisCard = ({ item }) => {
    const pieData = [
        { value: item.present, color: '#4BC0C0', text: 'Present' },
        { value: item.medical, color: '#FFCE56', text: 'Medical' },
        { value: item.absent, color: '#FF6384', text: 'Absent' },
    ].filter((d) => d.value > 0)

    const hasData = item.present > 0 || item.absent > 0 || item.medical > 0

    let statusColor = '#FF6384'
    if (item.presentPercentage >= 90) statusColor = '#4BC0C0'
    else if (item.presentPercentage >= 75) statusColor = '#FFCE56'

    return (
        <View
            style={[
                styles.card,
                { width: SCREEN_WIDTH - 40, marginHorizontal: 0 },
            ]}
        >
            <Text style={styles.courseTitle}>
                {item.courseCode} - {item.courseName}
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
                            innerRadius={50}
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
    )
}

export function Stats() {
    const [courseData, setCourseData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getMockAttendanceData()
                setCourseData(res.data)
                setLoading(false)
            } catch (error) {
                Alert.alert('Error', error.message)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const getOrdinalSuffix = (n) => {
        const s = ['th', 'st', 'nd', 'rd']
        const v = n % 100
        return n + (s[(v - 20) % 10] || s[v] || s[0])
    }
    const date = new Date()
    const formattedDate = `${date.toLocaleString('default', {
        month: 'long',
    })} ${getOrdinalSuffix(date.getDate())}`

    const mainBarData = courseData.map((item) => ({
        value: item.presentPercentage,
        label: item.courseCode,
        frontColor: item.presentPercentage >= 75 ? '#4BC0C0' : '#FF6384',
        topLabelComponent: () => (
            <Text style={{ color: 'black', fontSize: 10, marginBottom: 2 }}>
                {item.presentPercentage}%
            </Text>
        ),
    }))

    const minClassesData = courseData.map((item) => ({
        value: item.minimumLecturesToAttend,
        label: item.courseCode,
        frontColor: '#36A2EB',
        topLabelComponent: () => (
            <Text style={{ color: 'black', fontSize: 10, marginBottom: 2 }}>
                {item.minimumLecturesToAttend}
            </Text>
        ),
    }))

    const maxAchievableData = courseData.map((item) => ({
        value: item.maximumAchievableAttendance,
        label: item.courseCode,
        frontColor:
            item.maximumAchievableAttendance >= 75 ? '#4BC0C0' : '#FF6384',
        topLabelComponent: () => (
            <Text style={{ color: 'black', fontSize: 10, marginBottom: 2 }}>
                {item.maximumAchievableAttendance}%
            </Text>
        ),
    }))

    if (loading) return <StatsSkeleton />

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 40 }}
        >
            <View style={styles.header}>
                <Text style={styles.dateText}>Today, {formattedDate}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Attendance Report</Text>
                <View style={{ marginTop: 20 }}>
                    <BarChart
                        data={mainBarData}
                        horizontal
                        barWidth={22}
                        spacing={24}
                        barBorderRadius={4}
                        showValuesAsTopLabel={false}
                        yAxisThickness={0}
                        xAxisThickness={1}
                        xAxisType="dashed"
                        noOfSections={4}
                        maxValue={100}
                        width={SCREEN_WIDTH - 90}
                        yAxisLabelWidth={50}
                        initialSpacing={10}
                        showReferenceLine1
                        referenceLine1Position={75}
                        referenceLine1Config={{
                            color: 'red',
                            dashWidth: 2,
                            dashGap: 3,
                        }}
                    />
                </View>
                <Text
                    style={{
                        textAlign: 'center',
                        color: 'red',
                        fontSize: 10,
                        marginTop: 5,
                    }}
                >
                    --- 75% Threshold ---
                </Text>
            </View>

            <View
                style={[
                    styles.card,
                    { padding: 0, paddingVertical: 20, overflow: 'hidden' },
                ]}
            >
                <Text style={styles.sectionTitle}>Analysis</Text>
                <FlatList
                    data={courseData}
                    keyExtractor={(item) => item.courseCode}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <AnalysisCard item={item} />}
                    contentContainerStyle={{ alignItems: 'center' }}
                />
                <Text style={styles.swipeHint}>Swipe for other courses</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Predictions</Text>

                <Text style={styles.subTitle}>
                    Minimum classes to maintain 75%
                </Text>
                <View style={{ marginBottom: 30 }}>
                    <BarChart
                        data={minClassesData}
                        horizontal
                        barWidth={22}
                        spacing={24}
                        barBorderRadius={4}
                        frontColor="#36A2EB"
                        width={SCREEN_WIDTH - 90}
                        yAxisLabelWidth={50}
                        maxValue={20}
                        noOfSections={4}
                        yAxisThickness={0}
                        xAxisThickness={1}
                    />
                </View>

                <Text style={styles.subTitle}>
                    Maximum achievable attendance
                </Text>
                <View>
                    <BarChart
                        data={maxAchievableData}
                        horizontal
                        barWidth={22}
                        spacing={24}
                        barBorderRadius={4}
                        width={SCREEN_WIDTH - 90}
                        yAxisLabelWidth={50}
                        maxValue={100}
                        noOfSections={4}
                        showReferenceLine1
                        referenceLine1Position={75}
                        referenceLine1Config={{ color: 'red', dashWidth: 2 }}
                        yAxisThickness={0}
                        xAxisThickness={1}
                    />
                </View>
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
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignItems: 'center',
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
    swipeHint: {
        fontSize: 12,
        color: '#9ca3af',
        marginTop: 10,
        fontStyle: 'italic',
    },
    skeletonContainer: {
        padding: 20,
    },
})
