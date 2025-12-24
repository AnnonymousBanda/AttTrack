import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export function Lectures() {
    const [selectedDay, setSelectedDay] = useState(() => {
        const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
        const today = new Date()
        return {
            day: days[today.getDay()],
            date: today,
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

    const [lectures, setLectures] = useState([
        { id: '1', from: '09:00', to: '10:00', courseCode: 'CS101', courseName: 'Intro to CS', status: 'present' },
        { id: '2', from: '10:00', to: '11:00', courseCode: 'MA102', courseName: 'Linear Algebra', status: 'absent' },
        { id: '3', from: '11:00', to: '12:00', courseCode: 'PH103', courseName: 'Physics', status: 'medical' },
		{ id: '4', from: '13:00', to: '14:00', courseCode: 'HS104', courseName: 'History', status: 'present' },
		{ id: '5', from: '14:00', to: '15:00', courseCode: 'EC105', courseName: 'Economics', status: 'absent' },
		{ id: '6', from: '15:00', to: '16:00', courseCode: 'BI106', courseName: 'Biology', status: 'present' },
    ])

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
                                isSelected ? styles.dayItemActive : styles.dayItemInactive,
                                index === 0 && styles.firstItem,
                                index === 6 && styles.lastItem,
                            ]}
                            onPress={() => setSelectedDay({ day, date })}
                        >
                            <Text style={[styles.dayText, isSelected && styles.textWhite]}>
                                {day}
                            </Text>
                            <Text style={[styles.dateText, !isSelected && styles.textWhite]}>
                                {date.getDate()}
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
                <Text style={styles.timeTextFrom}>{item.from}</Text>
                <Text style={styles.timeTextTo}>{item.to}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.courseTitle}>
                    {item.courseCode}: {item.courseName}
                </Text>

                <View style={styles.actionRow}>
                    <TouchableOpacity style={[styles.actionBtn, styles.bgGreen, item.status === 'present' && styles.disabled]}>
                        <Ionicons name="hand-right-outline" size={24} color="black" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[styles.actionBtn, styles.bgRed, item.status === 'absent' && styles.disabled]}>
                        <Feather name="x-circle" size={24} color="black" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[styles.actionBtn, styles.bgYellow, item.status === 'medical' && styles.disabled]}>
                        <MaterialCommunityIcons name="emoticon-sick-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

    return (
        <View style={styles.container}>
            <DaySelector daysDate={daysDate} />
            
            <FlatList
                data={lectures}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <LectureItem item={item} />}
                contentContainerStyle={styles.listContent}
                style={styles.list}
            />
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
        // justifyContent: 'space-between',
		gap: 5,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    dayItem: {
        padding: 10,
        borderRadius: 10,
        height: 80,
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
        fontSize: 14,
        color: '#000',
    },
    dateText: {
        fontWeight: '600',
        fontSize: 14,
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
