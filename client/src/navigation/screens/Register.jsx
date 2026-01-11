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
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { BRANCHES } from '../../utils/branches'
import { KeyboardAvoidingView } from 'react-native'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const Register = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedBranch, setSelectedBranch] = useState('SELECT BRANCH')
    const [semester, setSemester] = useState(1)

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
                                        John Doe
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
                                        john_01@inst.ac.in
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.fieldGroup}>
                                <Text style={styles.h2}>Roll Number</Text>
                                <View
                                    style={[styles.input, styles.disabledInput]}
                                >
                                    <Text style={styles.inputText}>
                                        2401001
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
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
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

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.submitButton}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.buttonText}>
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            </View>
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
