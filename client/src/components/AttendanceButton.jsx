import { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
// import { modifyAttendance } from '@/firebase/api'
// import { useAuth } from '@/context'

export function AttendanceButton({ lecture, day, setLectures }) {
    const [status, setStatus] = useState(lecture.status)
    const { user } = {
        
    }//useAuth()

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
            // Handle error appropriately
            
        }
    }

    return (
        <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.actionBtn, styles.bgGreen, status === 'present' && styles.disabled]}
                onPress={() => handleClick('present')}
                disabled={status === 'present'}
            >
                <Ionicons name="hand-right-outline" size={20} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionBtn, styles.bgRed, status === 'absent' && styles.disabled]}
                onPress={() => handleClick('absent')}
                disabled={status === 'absent'}
            >
                <Feather name="x-circle" size={20} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionBtn, styles.bgYellow, status === 'medical' && styles.disabled]}
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
