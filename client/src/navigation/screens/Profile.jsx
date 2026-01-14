import React, { useState, useEffect, useRef } from 'react'
import { BlurView } from 'expo-blur'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { LinearGradient } from 'expo-linear-gradient'
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator,
    Linking,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Animated,
    Dimensions,
    Easing,
    Keyboard,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import {
    MaterialIcons,
    Ionicons,
    FontAwesome5,
    Feather,
} from '@expo/vector-icons'
import { useAuth } from '../../context/auth.context'
import { profilepic2 as ProfilePic } from '../../assets/index'
import { navigate } from '../rootnavigation'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const { width: SCREEN_WIDTH } = Dimensions.get('window')

export function Profile() {
    const { user, setUser, logout } = useAuth()
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [courses, setCourses] = useState([])

    const [tempSemester, setTempSemester] = useState(user?.semester)

    // Modal & Animation States
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalType, setModalType] = useState(null)
    const [selectedCourse, setSelectedCourse] = useState(null)
    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current

    const pickerScrollRef = useRef(null)

    useEffect(() => {
        if (isModalVisible && modalType === 'semester') {
            setTimeout(() => {
                const itemWidth = 60
                const index = Number(tempSemester) - 1
                const offset = index * itemWidth

                pickerScrollRef.current?.scrollTo({
                    x: offset,
                    animated: true,
                })
            }, 100)
        }
    }, [isModalVisible, modalType])

    const handleLogout = () => {
        logout()
    }

    const openModal = (type, data = null) => {
        setModalType(type)
        if (type === 'attendance') {
            setSelectedCourse({ ...data })
        } else {
            setTempSemester(user?.semester)
        }

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
        }).start(() => {
            setIsModalVisible(false)
            setModalType(null)
            setSelectedCourse(null)
        })
    }

    const backdropOpacity = slideAnim.interpolate({
        inputRange: [0, SCREEN_HEIGHT],
        outputRange: [1, 0],
    })

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true)
            try {
                const API_URL = process.env.EXPO_PUBLIC_API_URL
                const res = await fetch(`${API_URL}/api/attendance/report`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-user-id': user?.id,
                    },
                })
                const result = await res.json()
                if (res.ok) {
                    const data = result.data || []
                    const filteredCourses = data.filter(
                        (item) =>
                            Number(item.courses.semester) ===
                            Number(user?.semester)
                    )
                    const coursesList = filteredCourses.map((course) => ({
                        courseCode: course.courses.course_code,
                        courseName: course.courses.course_name,
                        present: course.present_total,
                        absent: course.absent_total,
                        medical: course.medical_total,
                    }))
                    setCourses(coursesList)
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch courses')
            } finally {
                setLoading(false)
            }
        }
        fetchCourses()
    }, [user?.semester])

    const handleUpdateSemester = async () => {
        setLoading(true)
        try {
            const API_URL = process.env.EXPO_PUBLIC_API_URL
            const res = await fetch(`${API_URL}/api/user/semester`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': user?.id,
                },
                body: JSON.stringify({ new_semester: tempSemester }),
            })

            console.log('Update Semester Response Status:', res.ok)
            if (res.ok) {
                setUser((prev) => ({ ...prev, semester: tempSemester }))
                closeModal()
                Alert.alert('Success', 'Semester updated')
            }
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSaveAttendance = async () => {
        if (!selectedCourse) return
        setLoading(true)
        try {
            const API_URL = process.env.EXPO_PUBLIC_API_URL
            const res = await fetch(`${API_URL}/api/attendance/adjust`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': user?.id,
                },
                body: JSON.stringify({
                    course_code: selectedCourse.courseCode,
                    present_total: selectedCourse.present,
                    absent_total: selectedCourse.absent,
                    medical_total: selectedCourse.medical,
                }),
            })

            if (res.ok) {
                setCourses((prev) =>
                    prev.map((c) =>
                        c.courseCode === selectedCourse.courseCode
                            ? selectedCourse
                            : c
                    )
                )
                closeModal()
                Alert.alert('Success', 'Attendance updated')
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to update attendance.')
        } finally {
            setLoading(false)
        }
    }

    const unenrollCourse = (courseCode) => {
        Alert.alert('CAUTION', `Unenroll from ${courseCode}?`, [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Unenroll',
                style: 'destructive',
                onPress: async () => {
                    setLoading(true)
                    try {
                        const API_URL = process.env.EXPO_PUBLIC_API_URL
                        const res = await fetch(
                            `${API_URL}/api/user/course/unenroll`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'x-user-id': user?.id,
                                },
                                body: JSON.stringify({
                                    course_code: courseCode,
                                }),
                            }
                        )
                        if (res.ok) {
                            setCourses((prev) =>
                                prev.filter((c) => c.courseCode !== courseCode)
                            )
                        }
                    } catch (error) {
                        Alert.alert('Error', 'Failed to unenroll')
                    } finally {
                        setLoading(false)
                    }
                },
            },
        ])
    }

    const renderLeftActions = (course) => (
        <TouchableOpacity
            style={styles.editAction}
            onPress={() => openModal('attendance', course)}
        >
            <MaterialIcons name="edit" size={28} color="#fff" />
            <Text style={styles.editActionText}>Edit</Text>
        </TouchableOpacity>
    )

    const renderRightActions = (courseCode) => (
        <TouchableOpacity
            style={styles.deleteAction}
            onPress={() => unenrollCourse(courseCode)}
        >
            <MaterialIcons name="delete-outline" size={28} color="#fff" />
            <Text style={styles.deleteActionText}>Unenroll</Text>
        </TouchableOpacity>
    )

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.header}>
                    <View style={styles.headerTitleContainer}>
                        <FontAwesome5
                            name="user-circle"
                            size={22}
                            color="#333"
                        />
                        <Text style={styles.headerTitle}>Profile</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.closeButton}
                    >
                        <Ionicons name="close" size={28} color="#333" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.profileSection}>
                        <Image
                            source={{
                                uri:
                                    user?.image_url === ''
                                        ? ProfilePic
                                        : user?.image_url,
                            }}
                            style={styles.avatar}
                        />
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>
                                {user?.first_name} {user?.last_name}
                            </Text>
                            <Text style={styles.userDetail}>
                                {user?.roll_number}
                            </Text>
                            <Text style={styles.userDetail}>{user?.email}</Text>
                        </View>
                    </View>

                    <View style={styles.detailsContainer}>
                        <View style={styles.infoCard}>
                            <MaterialIcons
                                name="class"
                                size={32}
                                color="#555"
                            />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>Branch</Text>
                                <Text style={styles.infoValue}>
                                    {user?.branch}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.infoCard}>
                            <Ionicons name="school" size={32} color="#555" />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>Batch</Text>
                                <Text style={styles.infoValue}>
                                    {user?.batch}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.infoCard}>
                            <Ionicons name="calendar" size={32} color="#555" />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>Semester</Text>
                                <Text style={styles.infoValue}>
                                    {user?.semester}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => openModal('semester')}
                                style={styles.editBtn}
                            >
                                <MaterialIcons
                                    name="edit"
                                    size={22}
                                    color="#333"
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.coursesContainer}>
                            <View style={styles.courseHeader}>
                                <Feather
                                    name="book-open"
                                    size={24}
                                    color="#333"
                                />
                                <Text style={styles.courseHeaderTitle}>
                                    Courses
                                </Text>
                            </View>
                            {loading ? (
                                <CoursesSkeleton />
                            ) : (
                                <View style={styles.courseList}>
                                    {courses.map((item) => (
                                        <Swipeable
                                            key={item.courseCode}
                                            renderLeftActions={() =>
                                                renderLeftActions(item)
                                            }
                                            renderRightActions={() =>
                                                renderRightActions(
                                                    item.courseCode
                                                )
                                            }
                                            friction={2}
                                        >
                                            <View style={styles.courseCard}>
                                                <Text style={styles.courseCode}>
                                                    {item.courseCode}
                                                </Text>
                                                <Text style={styles.courseName}>
                                                    {item.courseName}
                                                </Text>
                                                <View style={styles.statsRow}>
                                                    <View
                                                        style={styles.statCol}
                                                    >
                                                        <Text
                                                            style={
                                                                styles.statLabel
                                                            }
                                                        >
                                                            P
                                                        </Text>
                                                        <Text
                                                            style={
                                                                styles.statValue
                                                            }
                                                        >
                                                            {item.present}
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={styles.statCol}
                                                    >
                                                        <Text
                                                            style={
                                                                styles.statLabel
                                                            }
                                                        >
                                                            A
                                                        </Text>
                                                        <Text
                                                            style={
                                                                styles.statValue
                                                            }
                                                        >
                                                            {item.absent}
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={styles.statCol}
                                                    >
                                                        <Text
                                                            style={
                                                                styles.statLabel
                                                            }
                                                        >
                                                            M
                                                        </Text>
                                                        <Text
                                                            style={
                                                                styles.statValue
                                                            }
                                                        >
                                                            {item.medical}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </Swipeable>
                                    ))}
                                </View>
                            )}
                        </View>

                        <View style={styles.footer}>
                            <TouchableOpacity
                                style={styles.bugReportBtn}
                                onPress={() =>
                                    Linking.openURL(
                                        'https://forms.gle/DjoRKfTt6NNjepzU9'
                                    )
                                }
                            >
                                <MaterialIcons
                                    name="bug-report"
                                    size={24}
                                    color="#3a90dcff"
                                />
                                <Text style={styles.footerBtnText}>
                                    Report a bug
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.logoutBtn}
                                onPress={handleLogout}
                                disabled={loading}
                            >
                                <MaterialIcons
                                    name="logout"
                                    size={24}
                                    color="#7f1d1d"
                                />
                                <Text
                                    style={[
                                        styles.footerBtnText,
                                        { color: '#7f1d1d' },
                                    ]}
                                >
                                    Logout
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                {isModalVisible && (
                    <View style={StyleSheet.absoluteFill}>
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
                            behavior={
                                Platform.OS === 'ios' ? 'padding' : 'height'
                            }
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
                                    <View style={styles.modalHandle} />
                                    <View style={styles.modalHeaderRow}>
                                        <Text style={styles.modalTitle}>
                                            {modalType === 'semester'
                                                ? 'Update Semester'
                                                : 'Update Attendance'}
                                        </Text>
                                        <TouchableOpacity onPress={closeModal}>
                                            <Ionicons
                                                name="close-circle"
                                                size={28}
                                                color="#999"
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    {modalType === 'attendance' ? (
                                        <>
                                            <Text
                                                style={styles.modalCourseName}
                                            >
                                                {selectedCourse?.courseName} (
                                                {selectedCourse?.courseCode})
                                            </Text>
                                            <View style={styles.modalInputRow}>
                                                {[
                                                    'present',
                                                    'absent',
                                                    'medical',
                                                ].map((field) => (
                                                    <View
                                                        key={field}
                                                        style={
                                                            styles.modalInputGroup
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.modalInputLabel
                                                            }
                                                        >
                                                            {field
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                field.slice(1)}
                                                        </Text>
                                                        <TextInput
                                                            style={
                                                                styles.modalTextInput
                                                            }
                                                            placeholder="0"
                                                            value={
                                                                selectedCourse
                                                                    ? String(
                                                                          selectedCourse[
                                                                              field
                                                                          ] ??
                                                                              ''
                                                                      )
                                                                    : ''
                                                            }
                                                            onChangeText={(v) =>
                                                                setSelectedCourse(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        [field]:
                                                                            v.replace(
                                                                                /[^0-9]/g,
                                                                                ''
                                                                            ),
                                                                    })
                                                                )
                                                            }
                                                            keyboardType="numeric"
                                                        />
                                                    </View>
                                                ))}
                                            </View>
                                            <TouchableOpacity
                                                style={[
                                                    styles.modalSaveButton,
                                                    {
                                                        opacity: loading
                                                            ? 0.6
                                                            : 1,
                                                    },
                                                ]}
                                                onPress={handleSaveAttendance}
                                                disabled={loading}
                                            >
                                                <Text
                                                    style={
                                                        styles.modalSaveButtonText
                                                    }
                                                >
                                                    {loading
                                                        ? 'Saving...'
                                                        : 'Save Changes'}
                                                </Text>
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <>
                                            <Text
                                                style={styles.modalCourseName}
                                            >
                                                Change your current academic
                                                semester
                                            </Text>
                                            <View style={styles.modalInputRow}>
                                                <View
                                                    style={[
                                                        styles.modalInputGroup,
                                                        { width: '100%' },
                                                    ]}
                                                >
                                                    <View
                                                        style={
                                                            styles.scrollPickerContainer
                                                        }
                                                    >
                                                        <ScrollView
                                                            ref={
                                                                pickerScrollRef
                                                            }
                                                            horizontal
                                                            showsHorizontalScrollIndicator={
                                                                false
                                                            }
                                                            snapToInterval={60}
                                                            decelerationRate="fast"
                                                            contentContainerStyle={
                                                                styles.pickerScrollContent
                                                            }
                                                            scrollEventThrottle={
                                                                16
                                                            }
                                                        >
                                                            {[
                                                                1, 2, 3, 4, 5,
                                                                6, 7, 8, 9,
                                                            ].map((num) => {
                                                                const isSelected =
                                                                    Number(
                                                                        tempSemester
                                                                    ) === num
                                                                return (
                                                                    <TouchableOpacity
                                                                        key={
                                                                            num
                                                                        }
                                                                        onPress={() =>
                                                                            setTempSemester(
                                                                                num
                                                                            )
                                                                        }
                                                                        style={[
                                                                            styles.pickerItem,
                                                                            isSelected &&
                                                                                styles.pickerItemSelected,
                                                                        ]}
                                                                    >
                                                                        <Text
                                                                            style={[
                                                                                styles.pickerItemText,
                                                                                isSelected &&
                                                                                    styles.pickerItemTextSelected,
                                                                            ]}
                                                                        >
                                                                            {
                                                                                num
                                                                            }
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                )
                                                            })}
                                                        </ScrollView>
                                                    </View>
                                                    <Text
                                                        style={
                                                            styles.helperText
                                                        }
                                                    >
                                                        Swipe to select semester
                                                    </Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity
                                                style={[
                                                    styles.modalSaveButton,
                                                    {
                                                        width: '85%',
                                                        alignSelf: 'center',
                                                        opacity: loading
                                                            ? 0.6
                                                            : 1,
                                                    },
                                                ]}
                                                onPress={handleUpdateSemester}
                                                disabled={loading}
                                            >
                                                <Text
                                                    style={[
                                                        styles.modalSaveButtonText,
                                                    ]}
                                                >
                                                    {loading
                                                        ? 'Updating...'
                                                        : 'Update Semester'}
                                                </Text>
                                            </TouchableOpacity>
                                        </>
                                    )}
                                </Pressable>
                            </Animated.View>
                        </KeyboardAvoidingView>
                    </View>
                )}
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const CourseSkeleton = () => {
    const SCREEN_WIDTH = Dimensions.get('window').width
    const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current

    useEffect(() => {
        Animated.loop(
            Animated.timing(translateX, {
                toValue: SCREEN_WIDTH,
                duration: 1500,
                easing: Easing.bezier(0.4, 0, 0.6, 1),
                useNativeDriver: true,
            })
        ).start()
    }, [])

    const Shimmer = () => (
        <Animated.View
            style={[StyleSheet.absoluteFill, { transform: [{ translateX }] }]}
        >
            <LinearGradient
                colors={[
                    'rgba(255, 255, 255, 0)',
                    'rgba(255, 255, 255, 1)',
                    'rgba(255, 255, 255, 1)',
                    'rgba(255, 255, 255, 1)',
                    'rgba(255, 255, 255, 0)',
                ]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={StyleSheet.absoluteFill}
            />
        </Animated.View>
    )

    return (
        <View
            style={[
                styles.courseCard,
                {
                    overflow: 'hidden',
                    backgroundColor: '#F3F4F6',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                },
            ]}
        >
            <Shimmer />

            <View
                style={[
                    styles.skeletonLine,
                    {
                        width: '35%',
                        height: 20,
                        marginBottom: 12,
                        backgroundColor: '#E5E7EB',
                    },
                ]}
            />
            <View
                style={[
                    styles.skeletonLine,
                    {
                        width: '65%',
                        height: 14,
                        marginBottom: 24,
                        backgroundColor: '#E5E7EB',
                    },
                ]}
            />

            <View style={styles.statsRow}>
                {[1, 2, 3].map((i) => (
                    <View key={i} style={styles.statCol}>
                        {/* Small Label Placeholder */}
                        <View
                            style={[
                                styles.skeletonLine,
                                {
                                    width: 40,
                                    height: 18,
                                    marginBottom: 6,
                                    backgroundColor: '#E5E7EB',
                                },
                            ]}
                        />
                        {/* Large Value Placeholder */}
                        <View
                            style={[
                                styles.skeletonLine,
                                {
                                    width: 40,
                                    height: 18,
                                    backgroundColor: '#E5E7EB',
                                },
                            ]}
                        />
                    </View>
                ))}
            </View>
        </View>
    )
}
const CoursesSkeleton = () => {
    return (
        <View style={styles.CoursesSkeletoncontainer}>
            {[1, 2, 3, 4, 5].map((i) => (
                <CourseSkeleton key={i} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    pickerScrollContent: {
        // This padding allows the numbers at the ends (1 and 9) to be centered
        paddingHorizontal: SCREEN_WIDTH / 2 - 30, // 30 is half of the 60 total item width
        alignItems: 'center',
    },
    pickerItem: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5, // Total margin is 10 (5 left + 5 right)
        backgroundColor: '#f3f4f6',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    scrollPickerContainer: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    pickerScrollContent: {
        paddingHorizontal: Dimensions.get('window').width / 2 - 50, // Centers the initial items
        alignItems: 'center',
    },
    pickerItem: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        backgroundColor: '#f3f4f6', // Light gray for unselected
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    pickerItemSelected: {
        backgroundColor: '#4bc0c0', // Your theme color
        borderColor: '#4bc0c0',
        transform: [{ scale: 1.1 }],
        elevation: 5,
        shadowColor: '#4bc0c0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    pickerItemText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6b7280',
    },
    pickerItemTextSelected: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    helperText: {
        fontSize: 12,
        color: '#9ca3af',
        marginBottom: 20,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    CoursesSkeletoncontainer: {
        gap: 12,
    },
    skeletonLine: {
        backgroundColor: '#E1E9EE',
        borderRadius: 4,
    },
    noCoursesText: {
        textAlign: 'center',
        color: '#6b7280',
        paddingVertical: 20,
        fontSize: 14,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    headerTitle: { fontSize: 18, fontWeight: '600' },
    closeButton: { padding: 5 },
    scrollContent: { paddingBottom: 40, alignItems: 'center' },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 20,
        gap: 20,
        justifyContent: 'center',
    },
    avatar: { width: 90, height: 90, borderRadius: 45 },
    userInfo: { justifyContent: 'center' },
    userName: { fontSize: 20, fontWeight: '600', color: '#1f2937' },
    userDetail: { fontSize: 14, color: '#4b5563', marginTop: 2 },
    detailsContainer: { width: '90%', gap: 15 },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#d7e4ee',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        gap: 15,
    },
    infoTextContainer: { flex: 1 },
    infoLabel: { fontWeight: '600', fontSize: 15, color: '#1f2937' },
    infoValue: { fontSize: 16, color: '#374151' },
    editBtn: { backgroundColor: '#f3f4f6', padding: 8, borderRadius: 8 },
    coursesContainer: {
        backgroundColor: '#d7e4ee',
        padding: 16,
        borderRadius: 12,
    },
    courseHeader: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    courseHeaderTitle: { fontSize: 16, fontWeight: '600' },
    courseList: { gap: 12 },
    courseCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 14,
        gap: 10,
    },
    courseCode: { fontWeight: '600', fontSize: 16, color: '#1f2937' },
    courseName: { fontSize: 14, color: '#6b7280' },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
    },
    statCol: { alignItems: 'center', gap: 4 },
    statLabel: { fontWeight: '600', fontSize: 14, color: '#374151' },
    statValue: { fontSize: 16, fontWeight: '600', color: '#111' },
    footer: {
        backgroundColor: '#d7e4ee',
        padding: 16,
        borderRadius: 12,
        gap: 12,
        marginTop: 20,
    },
    bugReportBtn: {
        backgroundColor: '#1f2937',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 8,
        gap: 12,
        justifyContent: 'center',
    },
    logoutBtn: {
        backgroundColor: '#ff6384',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 8,
        gap: 12,
        justifyContent: 'center',
    },
    footerBtnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
    deleteAction: {
        backgroundColor: '#ef4444',
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        borderRadius: 12,
        marginLeft: 10,
    },
    deleteActionText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
        marginTop: 4,
    },
    editAction: {
        backgroundColor: '#3b82f6',
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        borderRadius: 12,
        marginRight: 10,
    },
    editActionText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
        marginTop: 4,
    },
    cancelBtnSmall: {
        backgroundColor: '#ff6384',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    saveBtnSmall: {
        backgroundColor: '#4bc0c0',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    btnTextSmall: { color: 'white', fontSize: 13, fontWeight: '600' },

    // Reusable Glass Modal Styles
    modalContainerPosition: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
    },
    glassModalContent: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        padding: 24,
        paddingBottom: Platform.OS === 'ios' ? 45 : 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 20,
    },
    modalHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#e5e7eb',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 15,
    },
    modalHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#1f2937' },
    modalCourseName: { fontSize: 15, color: '#6b7280', marginBottom: 25 },
    modalInputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    modalInputGroup: { width: '30%', alignItems: 'center' },
    modalInputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    modalTextInput: {
        width: '100%',
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
        padding: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    modalSaveButton: {
        backgroundColor: '#4bc0c0',
        padding: 18,
        borderRadius: 15,
        alignItems: 'center',
        width: '100%',
    },
    modalSaveButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
})
