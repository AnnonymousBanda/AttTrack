import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    StatusBar,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { logo, ms_logo } from '../../assets/index'

const LoginScreen = () => {
    const [loading, setLoading] = useState(false)
    const [buttonClicked, setButtonClicked] = useState(false)

    const handleLogin = async () => {
        setLoading(true)
        setButtonClicked(true)
        setTimeout(() => {
            setButtonClicked(false)
            setLoading(false)
        }, 2000)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            <View style={styles.content}>
                <View style={styles.brandSection}>
                    <View style={styles.logoWrapper}>
                        <Image
                            source={logo}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.h1}>AttTrack</Text>
                    <Text style={styles.subtitle}>
                        Manage your attendance seamlessly
                    </Text>
                </View>

                <View style={styles.actionSection}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleLogin}
                        disabled={loading}
                        style={[
                            styles.msButton,
                            (buttonClicked || loading) && styles.opacity50,
                        ]}
                    >
                        {loading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <View style={styles.buttonContent}>
                                <Image
                                    source={ms_logo}
                                    style={styles.msLogo}
                                    resizeMode="contain"
                                />
                                <Text style={styles.h3}>
                                    Sign in with Microsoft
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <Text style={styles.footerText}>
                        By signing in, you agree to our Terms & Privacy Policy.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 60,
    },
    brandSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoWrapper: {
        marginBottom: 24,
    },
    logo: {
        width: 110,
        height: 110,
    },
    h1: {
        fontSize: 36,
        fontWeight: '800',
        color: '#1A1A1A',
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 16,
        color: '#666666',
        marginTop: 10,
        textAlign: 'center',
        lineHeight: 22,
    },
    actionSection: {
        width: '100%',
        alignItems: 'center',
    },
    msButton: {
        backgroundColor: '#1A1A1A',
        height: 64,
        borderRadius: 16,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msLogo: {
        width: 22,
        height: 22,
        marginRight: 12,
    },
    h3: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
    opacity50: {
        opacity: 0.6,
    },
    footerText: {
        marginTop: 20,
        fontSize: 13,
        color: '#999999',
        textAlign: 'center',
    },
    fullScreenLoader: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
})

export const Login = LoginScreen
