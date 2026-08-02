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

const getLectures = async (id, date) => {
    try {
        const API_URL = process.env.EXPO_PUBLIC_API_URL

        const response = await fetch(`${API_URL}/api/lectures?date=${date}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': id,
            },
        })

        const result = await response.json()

        if (response.status !== 200) {
            return {
                status: response.status,
                message: result.message || 'Failed to fetch',
            }
        }

        const lectures = result.data.map((lec) => {
            return {
                id: lec.id,
                courseCode: lec.courseCode,
                courseName: lec.courseName,
                lecture_date: date,
                from: lec.from,
                to: lec.to,
                status: lec.status,
            }
        })

        return {
            status: 200,
            message: 'Lectures fetched successfully',
            data: lectures,
        }
    } catch (error) {
        return { status: 500, message: 'Internal Server Error' }
    }
}

export function AttendanceButton({ lecture, lectures, setLectures }) {
    const [status, setStatus] = useState(lecture.status)
    const id = lecture.id
    const [loading, setLoading] = useState(null)
    const { user } = useAuth()

    const normalizeTime = (value) => {
        if (!value) return ''
        const match = String(value).match(/^(\d{1,2}):(\d{2})(?::\d{2})?/)
        if (!match) return String(value).trim()
        return `${match[1].padStart(2, '0')}:${match[2]}`
    }

    const getDateKey = (value) => {
        if (!value) return ''
        if (value instanceof Date) return value.toISOString().split('T')[0]
        return String(value).split('T')[0].split(' ')[0]
    }

    const handleClick = async (newStatus) => {
        setLoading(newStatus)

        if (!id) {
            try {
                const lectureDate = getDateKey(lecture.lecture_date)
                const normalizedStart = normalizeTime(lecture.from)
                const normalizedEnd = normalizeTime(lecture.to)

                const formattedLecture = {
                    course_code: lecture.courseCode,
                    lecture_date: lectureDate,
                    start_time: normalizedStart,
                    end_time: normalizedEnd,
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

                const latestLectures = await getLectures(user?.id, lectureDate)

                setLectures(latestLectures?.data)
                setStatus(newStatus)
            } catch (error) {
                Alert.alert('Error', error.message)
                console.error('Error details:', error)
            } finally {
                setLoading(null)
            }
        } else {
            try {
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

                // console.log(lectures)
                setLectures(latestLectures)
                // console.log("affter:" ,lectures)
                setStatus(newStatus)
            } catch (error) {
                Alert.alert('Error', error.message)
                console.error('Error details:', error)
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
