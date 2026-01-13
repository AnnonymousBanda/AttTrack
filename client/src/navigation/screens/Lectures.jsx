import { useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import { AttendanceButton, CancelButton } from '../../components'
import { LecturesSkeleton } from '../../skeletons'
import { useAuth } from '../../context/auth.context'

export function Lectures() {
    const { user } = useAuth()

    const [selectedDay, setSelectedDay] = useState(() => {
        const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
        const today = new Date()
        return {
            day: days[today.getDay()],
            date: today,
            dateString: today.toISOString(),
        }
    })

    const [daysDate] = useState(() => {
        const today = new Date()
        const dayOfWeek = today.getDay()
        const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1

        const monday = new Date(today)
        monday.setDate(today.getDate() - daysToMonday)

        const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
        return days.map((day, index) => {
            const dateObj = new Date(monday)
            dateObj.setDate(monday.getDate() + index)
            return { day, date: dateObj }
        })
    })

    const [lectures, setLectures] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getLectures = async () => {
            if (user) {
                try {
                    setLoading(true)

                    const date = selectedDay.dateString
                    const API_URL = process.env.EXPO_PUBLIC_API_URL

                    const response = await fetch(
                        `${API_URL}/api/lectures?date=${date.split('T')[0]}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'x-user-id': user.id,
                            },
                        }
                    )

                    if (!response.ok) {
                        throw new Error(
                            `Error fetching lectures for ${date.split('T')[0]}`
                        )
                    }

                    const result = await response.json()

                    setLectures(result.data || [])
                } catch (error) {
                    throw new Error('Failed to fetch lectures')
                } finally {
                    setLoading(false)
                }
            }
        }

        getLectures()
    }, [selectedDay])

    const DaySelector = ({ daysDate }) => {
        return (
            <View style={styles.selectorContainer}>
                {daysDate.map(({ day, date }, index) => {
                    const isSelected = selectedDay.day === day
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dayItem,
                                isSelected
                                    ? styles.dayItemActive
                                    : styles.dayItemInactive,
                                index === 0 && styles.firstItem,
                                index === 6 && styles.lastItem,
                            ]}
                            onPress={() =>
                                setSelectedDay({
                                    day,
                                    date,
                                    dateString: date.toISOString(),
                                })
                            }
                        >
                            <Text
                                style={[
                                    styles.dayText,
                                    isSelected && styles.textWhite,
                                ]}
                                numberOfLines={1}
                            >
                                {day}
                            </Text>
                            <Text
                                style={[
                                    styles.dateText,
                                    !isSelected && styles.textWhite,
                                ]}
                            >
                                {date.getDate().toString().padStart(2, '0')}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    const LectureItem = ({ item }) => (
        <View style={styles.lectureContainer}>
            <View style={styles.timeColumn}>
                <Text style={styles.timeTextFrom}>
                    {item.from.padStart(5, '0')}
                </Text>
                <Text style={styles.timeTextTo}>
                    {item.to.padStart(5, '0')}
                </Text>
            </View>

            <View style={styles.card}>
                <CancelButton
                    lecture={item}
                    day={selectedDay.day}
                    setLectures={setLectures}
                />
                <Text style={styles.courseTitle}>
                    {item.courseCode}: {item.courseName}
                </Text>

                <AttendanceButton
                    lecture={item}
                    day={selectedDay.day}
                    setLectures={setLectures}
                />
            </View>
        </View>
    )

    return (
        <View style={styles.container}>
            <DaySelector daysDate={daysDate} />

            {loading ? (
                <LecturesSkeleton />
            ) : (
                <FlatList
                    data={lectures}
                    keyExtractor={(item) =>
                        new String(item.courseCode + item.from + item.to)
                    }
                    renderItem={({ item }) => <LectureItem item={item} />}
                    contentContainerStyle={styles.listContent}
                    style={styles.list}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    selectorContainer: {
        flexDirection: 'row',
        gap: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    dayItem: {
        padding: 8,
        borderRadius: 10,
        height: 75,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    dayItemActive: {
        backgroundColor: '#6F8DBD',
    },
    dayItemInactive: {
        backgroundColor: '#A0B8D9',
    },
    firstItem: {
        borderBottomRightRadius: 0,
    },
    lastItem: {
        borderBottomLeftRadius: 0,
    },
    dayText: {
        fontWeight: '600',
        textTransform: 'capitalize',
        fontSize: 13,
        color: '#000',
    },
    dateText: {
        fontWeight: '600',
        fontSize: 13,
        color: '#000',
    },
    textWhite: {
        color: '#FFFFFF',
    },
    list: {
        flex: 1,
        width: '100%',
    },
    listContent: {
        paddingHorizontal: 20,
        gap: 15,
        paddingBottom: 20,
    },
    lectureContainer: {
        flexDirection: 'row',
        gap: 15,
    },
    timeColumn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        gap: 5,
    },
    timeTextFrom: {
        fontWeight: '400',
        fontSize: 16,
        color: '#101828',
    },
    timeTextTo: {
        fontWeight: '400',
        fontSize: 16,
        color: '#4a5565',
    },
    card: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#e5e7eb',
        borderLeftColor: '#000',
        borderLeftWidth: 2,
        borderRadius: 12,
        padding: 15,
        gap: 30,
        backgroundColor: '#fff',
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    actionRow: {
        flexDirection: 'row',
        gap: 20,
    },
    actionBtn: {
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bgGreen: { backgroundColor: '#4bc0c0' },
    bgRed: { backgroundColor: '#ff6384' },
    bgYellow: { backgroundColor: '#ffce56' },
    disabled: { opacity: 0.3 },
})
