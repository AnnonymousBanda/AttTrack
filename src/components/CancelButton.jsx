import { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
// import { modifyAttendance } from '@/firebase/api'
// import { useAuth } from '@/context'

export function CancelButton({ lecture, day, setLectures }) {
    const [isDialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    // const { user } = useAuth()

    const handleSubmit = async () => {
        setLoading(true)
        try {
            // const res = await modifyAttendance(
            //     user.userID,
            //     user.semester,
            //     lecture.to,
            //     lecture.from,
            //     day,
            //     lecture.courseCode,
            //     'cancelled'
            // )

            // if (!res) throw new Error('Failed to cancel class')
            // if (res.status !== 200) throw new Error(res.message)

            // setLectures(res.data)
            // setDialog(false)
            // Alert.alert('Success', 'Class cancelled successfully')
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <TouchableOpacity 
                style={styles.closeIconBtn} 
                onPress={() => setDialog(true)}
            >
                <MaterialIcons name="close" size={24} color="#6b7280" />
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={isDialog}
                onRequestClose={() => setDialog(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            Are you sure you want to cancel this class?
                        </Text>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity 
                                onPress={() => setDialog(false)}
                                style={[styles.modalBtn, styles.bgRed]}
                            >
                                <Text style={styles.btnText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={handleSubmit}
                                disabled={loading}
                                style={[styles.modalBtn, styles.bgGreen, loading && styles.disabled]}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#000" size="small" />
                                ) : (
                                    <Text style={styles.btnText}>Confirm</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    closeIconBtn: {
        position: 'absolute',
        top: 5,
        right: 5,
        padding: 5,
        zIndex: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        maxWidth: 400,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 30,
        gap: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#1f2937',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'center',
        width: '100%',
    },
    modalBtn: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#1f2937',
    },
    bgRed: {
        backgroundColor: '#ff6384',
    },
    bgGreen: {
        backgroundColor: '#4bc0c0',
    },
    disabled: {
        opacity: 0.5,
    },
})
