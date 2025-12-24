import { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
// import { modifyAttendance } from '@/firebase/api'
// import { useAuth } from '@/context'

function AttendanceButton({ lecture, day, setLectures }) {
    const [status, setStatus] = useState(lecture.status)
    // const { user } = useAuth()

    useEffect(() => {
        setStatus(lecture.status)
    }, [lecture])

    const handleClick = async (newStatus) => {
        try {
            // const res = await modifyAttendance(
            //     user.userID,
            //     user.semester,
            //     lecture.to,
            //     lecture.from,
            //     day,
            //     lecture.courseCode,
            //     newStatus
            // )

            // if (!res) throw new Error('Failed to cancel class')
            // if (res.status !== 200) throw new Error(res.message)

            // setStatus(newStatus)
            // setLectures(res.data)

        } catch (error) {
            Alert.alert('Error', error.message)
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => handleClick('present')}
                disabled={status === 'present'}
                style={[
                    styles.button,
                    styles.bgGreen,
                    status === 'present' && styles.disabled
                ]}
            >
                <MaterialCommunityIcons 
                    name="hand-back-right" 
                    size={32} 
                    color="black" 
                />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => handleClick('absent')}
                disabled={status === 'absent'}
                style={[
                    styles.button,
                    styles.bgRed,
                    status === 'absent' && styles.disabled
                ]}
            >
                <MaterialIcons 
                    name="cancel" 
                    size={32} 
                    color="black" 
                />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => handleClick('medical')}
                disabled={status === 'medical'}
                style={[
                    styles.button,
                    styles.bgYellow,
                    status === 'medical' && styles.disabled
                ]}
            >
                <MaterialCommunityIcons 
                    name="emoticon-sick-outline" 
                    size={32} 
                    color="black" 
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 24,
    },
    button: {
        padding: 8,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabled: {
        opacity: 0.4,
    },
    bgGreen: {
        backgroundColor: '#4ade80',
    },
    bgRed: {
        backgroundColor: '#f87171',
    },
    bgYellow: {
        backgroundColor: '#facc15',
    },
})

export default AttendanceButton
