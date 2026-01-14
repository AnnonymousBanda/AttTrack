import { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import {
    Feather,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
} from '@expo/vector-icons'
import { useAuth } from '../context/auth.context'
// import { modifyAttendance } from '@/firebase/api'
// import { useAuth } from '@/context'

export function AttendanceButton({ lecture, day, setLectures }) {
    const [status, setStatus] = useState(lecture.status)
    const { user } = useAuth()

    const formatToTimeString = (timeStr) => {
        if (!timeStr) return '00:00:00'
        let [hours, minutes] = timeStr.split(':')

        // Pad hours and minutes to 2 digits
        const hh = hours.padStart(2, '0')
        const mm = minutes.padStart(2, '0')
        const ss = '00' // Seconds are usually required by databases

        return `${hh}:${mm}:${ss}` // Results in "09:00:00"
    }

    useEffect(() => {
        setStatus(lecture.status)
    }, [lecture])

    const handleClick = async (newStatus) => {
        try {
            Alert.alert(String(lecture.from))
            const API_URL = process.env.EXPO_PUBLIC_API_URL
            const response = await fetch(`${API_URL}/api/attendance/log`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': user.id,
                },
                body: JSON.stringify({
                    course_code: lecture.courseCode,
                    lecture_date: lecture.lecture_date,
                    start_time: formatToTimeString(lecture.from),
                    end_time: formatToTimeString(lecture.to),
                    status: newStatus,
                }),
            })
            if (!response.ok) {
                throw new Error('Failed to update attendance status')
            }

            Alert.alert(response.status)
        } catch (error) {
            // Handle error appropriately
        }
    }

    return (
        <View style={styles.actionRow}>
            <TouchableOpacity
                style={[
                    styles.actionBtn,
                    styles.bgGreen,
                    status === 'present' && styles.disabled,
                ]}
                onPress={() => handleClick('present')}
                disabled={status === 'present'}
            >
                <Ionicons name="hand-right-outline" size={20} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.actionBtn,
                    styles.bgRed,
                    status === 'absent' && styles.disabled,
                ]}
                onPress={() => handleClick('absent')}
                disabled={status === 'absent'}
            >
                <Feather name="x-circle" size={20} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.actionBtn,
                    styles.bgYellow,
                    status === 'medical' && styles.disabled,
                ]}
                onPress={() => handleClick('medical')}
                disabled={status === 'medical'}
            >
                <MaterialCommunityIcons
                    name="emoticon-sick-outline"
                    size={20}
                    color="black"
                />
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
