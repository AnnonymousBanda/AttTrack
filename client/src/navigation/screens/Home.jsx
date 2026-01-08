import React, { useState, useEffect, useRef } from 'react'
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
    Dimensions,
} from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { AttendanceButton, CancelButton, AddButton } from '../../components'
import { HomeSkeleton } from '../../skeletons'

const getLectures = async (id, sem, day) => {
    try {
        const date = new Date().toISOString().split('T')[0]
        const API_URL = process.env.EXPO_PUBLIC_API_URL

        const response = await fetch(`${API_URL}/api/lectures?date=${date}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
                courseCode: lec.courseCode,
                courseName: lec.courseName,
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

const addExtraLecture = async (id, data, sem, day) => {
    return new Promise((resolve) =>
        setTimeout(() => resolve({ status: 200, data: [] }), 1000)
    )
}

export function Home() {
    const [greeting, setGreeting] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({ course: '', from: '', to: '' })

    const { width } = Dimensions.get('window')
    const isSmallDevice = width < 340

    const initialRender = useRef(true)
    const user = { userID: 'dummy_user', semester: '4' }

    useEffect(() => {
        const fetch = async () => {
            try {
                let res = await getLectures(
                    user.userID,
                    user.semester,
                    new Date()
                        .toLocaleDateString('en-US', { weekday: 'short' })
                        .toLowerCase()
                )

                if (res.status !== 200) throw new Error(res.message)

                setClasses(res.data)
                setLoading(false)
            } catch (error) {
                Alert.alert('Error', error.message)
            }
        }
        fetch()
    }, [])

    useEffect(() => {
        const hour = new Date().getHours()
        if (hour < 12) setGreeting('Good Morning')
        else if (hour < 18) setGreeting('Good Afternoon')
        else setGreeting('Good Evening')
    }, [])

    const formatDate = (date) => {
        const options = {
            weekday: 'long',
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        }
        return date.toLocaleDateString('en-US', options).replace(',', '')
    }

    const handleAddClass = async () => {
        if (!formData.course || !formData.from || !formData.to) {
            Alert.alert('Error', 'Please fill all fields')
            return
        }

        const data = {
            courseCode: formData.course.split(' - ')[0],
            courseName: formData.course.split(' - ')[1] || 'Custom',
            from: formData.from,
            to: formData.to,
            status: null,
        }

        try {
            const res = await addExtraLecture(
                user.userID,
                data,
                user.semester,
                new Date()
                    .toLocaleDateString('en-US', { weekday: 'short' })
                    .toLowerCase()
            )

            if (res.status !== 200) throw new Error(res.message)

            setClasses((prev) => [...prev, { ...data }])
            setFormData({ course: '', from: '', to: '' })
            setShowForm(false)
            Alert.alert('Success', 'Class added successfully')
        } catch (error) {
            Alert.alert('Error', error.message)
        }
    }

    const OngoingClasses = () => {
        const ongoingClasses = classes?.filter((cls) => {
            const [from_hours, from_minutes] = cls.from.split(':').map(Number)
            const from = new Date()
            from.setHours(from_hours, from_minutes, 0, 0)

            const [to_hours, to_minutes] = cls.to.split(':').map(Number)
            const to = new Date()
            to.setHours(to_hours, to_minutes, 0, 0)
            const now = new Date()

            return from <= now && to >= now
        })

        return (
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Ongoing Class</Text>
                {ongoingClasses?.length > 0 ? (
                    ongoingClasses.map((cls, i) => (
                        <ClassCard key={i} cls={cls} isOngoing={true} />
                    ))
                ) : (
                    <NoClasses message="There are no classes scheduled at this time" />
                )}
            </View>
        )
    }

    const UpcomingClasses = () => {
        const upcomingClasses = classes.filter((cls) => {
            const [from_hours, from_minutes] = cls.from.split(':').map(Number)
            const from = new Date()
            from.setHours(from_hours, from_minutes, 0, 0)
            return from > new Date()
        })

        return (
            <View style={styles.sectionContainer}>
                <Text style={styles.subTitle}>UPCOMING</Text>
                {upcomingClasses.length === 0 ? (
                    <NoClasses message="No upcoming classes" />
                ) : (
                    upcomingClasses.map((cls, i) => (
                        <ClassCard key={i} cls={cls} />
                    ))
                )}
            </View>
        )
    }

    const PastClasses = () => {
        const pastClasses = classes?.filter((cls) => {
            const [to_hours, to_minutes] = cls.to.split(':').map(Number)
            const to = new Date()
            to.setHours(to_hours, to_minutes, 0, 0)
            return to < new Date()
        })

        return (
            <View>
                <Text style={styles.subTitle}>PAST</Text>
                {pastClasses.length === 0 ? (
                    <NoClasses message="No past classes to display" />
                ) : (
                    pastClasses.map((cls, i) => <ClassCard key={i} cls={cls} />)
                )}
            </View>
        )
    }

    const ClassCard = ({ cls, isOngoing }) => (
        <View
            style={[
                styles.card,
                isOngoing && styles.ongoingCard,
                isSmallDevice && styles.cardResponsive,
            ]}
        >
            <View
                style={[
                    styles.cardContent,
                    isSmallDevice && styles.cardContentResponsive,
                ]}
            >
                <View>
                    <Text style={styles.cardCode}>{cls.courseCode}</Text>
                    <Text style={styles.cardName}>{cls.courseName}</Text>
                </View>
                <View style={styles.timeBadge}>
                    <Text style={styles.timeText}>
                        {cls.from} - {cls.to}
                    </Text>
                </View>
            </View>

            <View
                style={[
                    styles.cardActions,
                    isSmallDevice && styles.cardActionsResponsive,
                    { alignSelf: 'flex-end' },
                ]}
            >
                <AttendanceButton
                    lecture={cls}
                    day={new Date()
                        .toLocaleDateString('en-US', { weekday: 'short' })
                        .toLowerCase()}
                    setLectures={setClasses}
                />
            </View>

            <CancelButton
                lecture={cls}
                day={new Date()
                    .toLocaleDateString('en-US', { weekday: 'short' })
                    .toLowerCase()}
                setLectures={setClasses}
            />
        </View>
    )

    const NoClasses = ({ message }) => (
        <View style={styles.noClassesContainer}>
            <Feather name="clock" size={30} color="#9CA3AF" />
            <Text style={styles.noClassesText}>{message}</Text>
        </View>
    )

    if (loading) {
        return <HomeSkeleton />
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
                <Text style={styles.greetingText}>{greeting}</Text>
                <Text style={styles.dateText}>{formatDate(new Date())}</Text>
            </View>

            <OngoingClasses />

            <View>
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>Today's Classes</Text>
                    <TouchableOpacity
                        onPress={() => setShowForm((prev) => !prev)}
                    >
                        <MaterialIcons
                            name="add"
                            size={30}
                            color="#3B82F6"
                            style={{
                                transform: [
                                    { rotate: showForm ? '45deg' : '0deg' },
                                ],
                            }}
                        />
                    </TouchableOpacity>
                </View>

                {showForm && (
                    <View style={styles.formContainer}>
                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Select Course:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. CS101 - Intro"
                                value={formData.course}
                                onChangeText={(t) =>
                                    setFormData({ ...formData, course: t })
                                }
                            />
                        </View>

                        <View style={styles.row}>
                            <View
                                style={[
                                    styles.formGroup,
                                    { flex: 1, marginRight: 10 },
                                ]}
                            >
                                <Text style={styles.formLabel}>From:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="09:00"
                                    value={formData.from}
                                    onChangeText={(t) =>
                                        setFormData({ ...formData, from: t })
                                    }
                                />
                            </View>
                            <View style={[styles.formGroup, { flex: 1 }]}>
                                <Text style={styles.formLabel}>To:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="10:00"
                                    value={formData.to}
                                    onChangeText={(t) =>
                                        setFormData({ ...formData, to: t })
                                    }
                                />
                            </View>
                        </View>

                        <AddButton onPress={handleAddClass} />
                    </View>
                )}

                <UpcomingClasses />
                <PastClasses />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        minHeight: '100%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fafafaff',
    },
    header: {
        marginBottom: 24,
        marginTop: 10,
    },
    greetingText: {
        fontSize: 28,
        fontWeight: '600',
        color: '#0E2C75',
    },
    dateText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#6B7280',
        marginTop: 4,
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 12,
    },
    subTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#9CA3AF',
        marginBottom: 12,
        textTransform: 'uppercase',
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    cardResponsive: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    ongoingCard: {
        borderColor: '#93C5FD',
        borderWidth: 1,
        backgroundColor: '#F0F9FF',
    },
    cardContent: {
        flex: 1,
        marginRight: 10,
    },
    cardContentResponsive: {
        width: '100%',
        marginRight: 0,
        marginBottom: 12,
    },
    cardCode: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0E2C75',
    },
    cardName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginTop: 2,
    },
    timeBadge: {
        backgroundColor: '#E5E7EB',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    timeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4B5563',
    },
    cardActions: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    cardActionsResponsive: {
        width: '100%',
        justifyContent: 'flex-end',
    },
    noClassesContainer: {
        backgroundColor: '#FFF',
        padding: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    noClassesText: {
        color: '#9CA3AF',
        marginTop: 8,
        fontSize: 14,
        fontWeight: '500',
    },
    formContainer: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        elevation: 2,
    },
    formGroup: {
        marginBottom: 16,
    },
    formLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#374151',
    },
    input: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#374151',
    },
    row: {
        flexDirection: 'row',
    },
})
