import { useState } from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native'
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useAuth } from '../context/auth.context'

export function AttendanceButton({ lecture, lectures, setLectures }) {
    const [status, setStatus] = useState(lecture.status)
    const id = lecture.id
    const [loading, setLoading] = useState(null)
    const { user } = useAuth()

    const formatToTimeString = (timeStr) => {
        if (!timeStr) return '00:00:00'
        let [hours, minutes] = timeStr.split(':')

        const hh = hours.padStart(2, '0')
        const mm = minutes.padStart(2, '0')
        const ss = '00'

        return `${hh}:${mm}:${ss}.000Z`
    }

    const handleClick = async (newStatus) => {
        setLoading(newStatus)

        if (id === null) {
            try {
                const formattedLecture = {
                    course_code: lecture.courseCode,
                    lecture_date: new Date(
                        lecture.lecture_date.split('T')[0]
                    ).toISOString(),
                    start_time: `${
                        lecture.lecture_date.split('T')[0]
                    } ${formatToTimeString(lecture.from)}`,
                    end_time: `${
                        lecture.lecture_date.split('T')[0]
                    } ${formatToTimeString(lecture.to)}`,
                    status: newStatus,
                }

                const API_URL = process.env.EXPO_PUBLIC_API_URL
                const response = await fetch(`${API_URL}/api/attendance/log`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-user-id': user.id,
                    },
                    body: JSON.stringify({ ...formattedLecture }),
                })

                const result = await response.json()
                if (result.status !== 201) {
                    throw new Error(
                        result.message || 'Failed to update attendance status'
                    )
                }

                const data = result.data

                const updatedLectures = data.map((lec) => {
                    return {
                        id: lec.id,
                        courseCode: lec.course_code,
                        courseName: lec.courses.course_name,
                        lecture_date: lec.lecture_date,
                        from: lec.start_time.split('T')[1].slice(0, 5),
                        to: lec.end_time.split('T')[1].slice(0, 5),
                        status: lec.status,
                    }
                })

                const updatedLecture = updatedLectures.find(
                    (lec) =>
                        lec.courseCode === formattedLecture.course_code &&
                        lec.lecture_date === formattedLecture.lecture_date &&
                        lec.from ===
                            formattedLecture.start_time
                                .split(' ')[1]
                                .slice(0, 5)
                )

                const latestLectures = lectures.map((lec) =>
                    lec.courseCode === formattedLecture.course_code &&
                    lec.lecture_date.split('T')[0] ===
                        formattedLecture.lecture_date.split('T')[0] &&
                    lec.from ===
                        formattedLecture.start_time.split(' ')[1].slice(0, 5)
                        ? updatedLecture
                        : lec
                )

                console.log('Latest Lectures:', latestLectures)

                setLectures(latestLectures)
                setStatus(newStatus)
            } catch (error) {
                Alert.alert('Error', error.message)
            } finally {
                setLoading(null)
            }
        } else {
            try {
                console.log('Existing log ID:', lecture)
                const API_URL = process.env.EXPO_PUBLIC_API_URL
                const response = await fetch(
                    `${API_URL}/api/attendance/log/status`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-user-id': user.id,
                        },
                        body: JSON.stringify({
                            log_id: id,
                            status: newStatus,
                        }),
                    }
                )

                const result = await response.json()
                if (result.status !== 200) {
                    throw new Error(
                        result.message || 'Failed to update attendance status'
                    )
                }

                const latestLectures = lectures.map((lec) =>
                    lec.id === id ? { ...lec, status: newStatus } : lec
                )

                setLectures(latestLectures)
                setStatus(newStatus)
            } catch (error) {
                Alert.alert('Error', error.message)
            } finally {
                setLoading(null)
            }
        }
    }

    return (
        <View style={styles.actionRow}>
            <TouchableOpacity
                style={[
                    styles.actionBtn,
                    styles.bgGreen,
                    (status === 'present' || loading === 'present') &&
                        styles.disabled,
                ]}
                onPress={() => handleClick('present')}
            >
                {loading === 'present' ? (
                    <ActivityIndicator size="small" color="#3a3a3a" />
                ) : (
                    <Ionicons
                        name="hand-right-outline"
                        size={20}
                        color="black"
                    />
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.actionBtn,
                    styles.bgRed,
                    (status === 'absent' || loading === 'absent') &&
                        styles.disabled,
                ]}
                onPress={() => handleClick('absent')}
            >
                {loading === 'absent' ? (
                    <ActivityIndicator size="small" color="#3a3a3a" />
                ) : (
                    <Feather name="x-circle" size={20} color="black" />
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.actionBtn,
                    styles.bgYellow,
                    (status === 'medical' || loading === 'medical') &&
                        styles.disabled,
                ]}
                onPress={() => handleClick('medical')}
            >
                {loading === 'medical' ? (
                    <ActivityIndicator size="small" color="#3a3a3a" />
                ) : (
                    <MaterialCommunityIcons
                        name="emoticon-sick-outline"
                        size={20}
                        color="black"
                    />
                )}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
