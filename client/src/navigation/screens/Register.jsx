import React, { useState, useRef } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Platform,
    Animated,
    Dimensions,
    Easing,
    Pressable,
    Keyboard,
    ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { BRANCHES } from '../../utils/branches'
import { KeyboardAvoidingView } from 'react-native'
import { useAuth } from '../../context'
import * as SecureStore from 'expo-secure-store'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const Register = ({ route }) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedBranch, setSelectedBranch] = useState('SELECT BRANCH')
    const [semester, setSemester] = useState(1)
    const [loading, setLoading] = useState(false)

    const { setUser } = useAuth()

    const { oid, displayName, mail, jobTitle } = route.params
    const rollNumber = mail.split('_')[1]?.split('@')[0]

    const batchYear = parseInt(rollNumber.substring(0, 2)) + 2000

    const yearSemMap = {
        1: '1st',
        2: '1st',
        3: '2nd',
        4: '2nd',
        5: '3rd',
        6: '3rd',
        7: '4th',
        8: '4th',
        9: '5th',
        10: '5th',
    }

    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current

    const openBranchModal = () => {
        setIsModalVisible(true)
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 400,
            easing: Easing.out(Easing.back(1)),
            useNativeDriver: true,
        }).start()
    }

    const closeModal = () => {
        Keyboard.dismiss()

        Animated.timing(slideAnim, {
            toValue: SCREEN_HEIGHT,
            duration: 300,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
        }).start(() => setIsModalVisible(false))
    }

    const backdropOpacity = slideAnim.interpolate({
        inputRange: [0, SCREEN_HEIGHT],
        outputRange: [1, 0],
    })

    const handleRegister = async () => {
        try {
            setLoading(true)
            const API_URL = process.env.EXPO_PUBLIC_API_URL

            const response = await fetch(`${API_URL}/api/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oid: oid,
                    email: mail,
                    first_name: displayName.split(' ')[0],
                    last_name:
                        displayName.split(' ')?.slice(1)?.join(' ') || '',
                    branch: selectedBranch,
                    batch: String(batchYear),
                    image_url: '',
                    roll_number: rollNumber,
                    semester: parseInt(semester),
                }),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Registration failed')
            }

            const user = result.data.user
            await SecureStore.setItemAsync('uid', String(user.id))

            setUser(user)
            console.log('Success:', result)
        } catch (error) {
            console.error('Registration Error:', error.message)
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            <Pressable style={{ flex: 1, width: '100%' }} onPress={closeModal}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <Pressable onPress={(e) => e.stopPropagation()}>
                        <Text style={styles.h1}>Create Account</Text>

                        <View style={styles.form}>
                            <View style={styles.fieldGroup}>
                                <Text style={styles.h2}>Name</Text>
                                <View
                                    style={[styles.input, styles.disabledInput]}
                                >
                                    <Text style={styles.inputText}>
                                        {displayName}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.fieldGroup}>
                                <Text style={styles.h2}>Email</Text>
                                <View
                                    style={[styles.input, styles.disabledInput]}
                                >
                                    <Text
                                        style={styles.inputText}
                                        numberOfLines={1}
                                    >
                                        {mail}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.fieldGroup}>
                                <Text
                                    style={[
                                        styles.h2,
                                        {
                                            textTransform: 'uppercase',
                                        },
                                    ]}
                                >
                                    Roll Number
                                </Text>
                                <View
                                    style={[styles.input, styles.disabledInput]}
                                >
                                    <Text
                                        style={[
                                            styles.inputText,
                                            {
                                                textTransform: 'uppercase',
                                            },
                                        ]}
                                    >
                                        {rollNumber}
                                    </Text>
                                </View>
                            </View>

                            {/* show batch and year */}
                            <View style={styles.fieldGroup}>
                                <Text style={styles.h2}>Batch</Text>
                                <View
                                    style={[styles.input, styles.disabledInput]}
                                >
                                    <Text style={styles.inputText}>
                                        {`${batchYear} - ${batchYear + 4}`}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.fieldGroup}>
                                <Text style={styles.h2}>Year</Text>
                                <View
                                    style={[styles.input, styles.disabledInput]}
                                >
                                    <Text style={styles.inputText}>
                                        {yearSemMap[semester]}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.fieldGroup}>
                                <Text style={styles.h2}>Branch</Text>
                                <TouchableOpacity
                                    style={styles.input}
                                    onPress={openBranchModal}
                                >
                                    <Text
                                        style={[
                                            styles.inputText,
                                            selectedBranch ===
                                                'SELECT BRANCH' && {
                                                color: '#9ca3af',
                                            },
                                        ]}
                                    >
                                        {selectedBranch}
                                    </Text>
                                    <MaterialIcons
                                        name="arrow-drop-down"
                                        size={24}
                                        color="#29303d"
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.fieldGroup}>
                                <Text style={styles.h2}>Select Semester</Text>
                                <View style={styles.scrollPickerContainer}>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        snapToInterval={60}
                                        decelerationRate="fast"
                                        contentContainerStyle={
                                            styles.pickerScrollContent
                                        }
                                    >
                                        {Object.keys(yearSemMap).map((num) => (
                                            <TouchableOpacity
                                                key={num}
                                                onPress={() => setSemester(num)}
                                                style={[
                                                    styles.pickerItem,
                                                    semester === num &&
                                                        styles.pickerItemSelected,
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.pickerItemText,
                                                        semester === num &&
                                                            styles.pickerItemTextSelected,
                                                    ]}
                                                >
                                                    {num}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            </View>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={handleRegister}
                                disabled={loading}
                                style={[
                                    styles.submitButton,
                                    loading && { opacity: 0.5 },
                                ]}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#ffffff" />
                                ) : (
                                    <View style={styles.buttonContent}>
                                        <Text style={styles.buttonText}>
                                            Sign Up
                                        </Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </ScrollView>
            </Pressable>

            {isModalVisible && (
                <View style={StyleSheet.absoluteFill}>
                    {/* BACKDROP - This is the "Blank Space" listener */}
                    <Animated.View
                        style={[
                            StyleSheet.absoluteFill,
                            {
                                opacity: backdropOpacity,
                                backgroundColor: 'rgba(0,0,0,0.3)',
                            },
                        ]}
                    >
                        <BlurView
                            intensity={40}
                            tint="light"
                            style={StyleSheet.absoluteFill}
                        />

                        <Pressable
                            style={StyleSheet.absoluteFill}
                            onPress={closeModal}
                        />
                    </Animated.View>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}
                        pointerEvents="box-none"
                    >
                        <Animated.View
                            style={[
                                styles.modalContainerPosition,
                                { transform: [{ translateY: slideAnim }] },
                            ]}
                            pointerEvents="box-none"
                        >
                            <Pressable
                                style={styles.glassModalContent}
                                onPress={(e) => e.stopPropagation()}
                            >
                                <Text style={styles.modalTitle}>
                                    Select Branch
                                </Text>

                                <ScrollView
                                    style={{ maxHeight: 300 }}
                                    keyboardShouldPersistTaps="handled"
                                    showsVerticalScrollIndicator={false}
                                >
                                    {BRANCHES.map((b) => (
                                        <TouchableOpacity
                                            key={b}
                                            style={styles.branchOption}
                                            onPress={() => {
                                                setSelectedBranch(b)
                                                closeModal()
                                            }}
                                        >
                                            <Text
                                                style={styles.branchOptionText}
                                            >
                                                {b}
                                            </Text>
                                            {selectedBranch === b && (
                                                <Ionicons
                                                    name="checkmark-circle"
                                                    size={20}
                                                    color="#4bc0c0"
                                                />
                                            )}
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </Pressable>
                        </Animated.View>
                    </KeyboardAvoidingView>
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: '#29303d',
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        minHeight: 60,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    opacity50: {
        opacity: 0.5,
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexGrow: 1,
    },
    h1: {
        fontSize: 28,
        fontWeight: '800',
        color: '#29303d',
        textAlign: 'left',
        marginBottom: 25,
    },
    form: { width: '100%' },
    fieldGroup: { marginBottom: 20 },
    h2: {
        fontSize: 14,
        fontWeight: '700',
        color: '#29303d',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    disabledInput: { backgroundColor: '#f3f4f6', opacity: 0.7 },
    inputText: { fontSize: 16, color: '#29303d', fontWeight: '500' },

    scrollPickerContainer: { height: 70, marginVertical: 5 },
    pickerScrollContent: { paddingRight: 20, alignItems: 'center' },
    pickerItem: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        backgroundColor: '#f3f4f6',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    pickerItemSelected: { backgroundColor: '#3da0a0', borderColor: '#3da0a0' },
    pickerItemText: { fontSize: 18, fontWeight: '600', color: '#6b7280' },
    pickerItemTextSelected: { color: '#fff' },

    submitButton: {
        backgroundColor: '#29303d',
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },

    modalContainerPosition: { justifyContent: 'flex-end', flex: 1 },
    glassModalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        paddingBottom: 40,
    },
    modalHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#e5e7eb',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#29303d',
    },
    branchOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0ff',
    },
    branchOptionText: { fontSize: 16, color: '#374151', fontWeight: '500' },
})

export { Register }
