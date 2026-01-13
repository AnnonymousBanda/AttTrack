import { createContext, useState, useEffect, useContext } from 'react'
import { authorize, refresh } from 'react-native-app-auth'
import * as SecureStore from 'expo-secure-store'
import { config } from '../config/auth.config'
import { Alert } from 'react-native'
import { navigate } from '../navigation/rootnavigation'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [uid, setUid] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const uid = await SecureStore.getItemAsync('uid')

                if (uid) {
                    setUid(uid)
                    await getUser(uid)
                }
            } catch (e) {
                console.error('Initialization error:', e)
            } finally {
                setIsLoading(false)
            }
        }
        initializeAuth()
    }, [])

    const getUser = async (uid) => {
        if (!uid) return

        try {
            const API_URL = process.env.EXPO_PUBLIC_API_URL

            const res = await fetch(`${API_URL}/api/user/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': uid,
                },
            })
            const result = await res.json()

            if (result.status === 200) {
                setUser(result.data.user)
            }
        } catch (error) {
            console.error('Get User Error:', error)
        }
    }

    const signInWithMicrosoft = async () => {
        try {
            setIsLoading(true)
            const result = await authorize(config)
            const accessToken = result.accessToken
            const refreshToken = result.refreshToken

            return {
                accessToken: accessToken,
                refreshToken: refreshToken,
            }
        } catch (error) {
            Alert.alert(
                'Authentication Error',
                'Failed to sign in with Microsoft. Please try again.'
            )
            throw new Error('Microsoft Sign-in Error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        try {
            setIsLoading(true)

            await SecureStore.deleteItemAsync('uid')

            setUser(null)
            setUid(null)
        } catch (error) {
            console.error('Sign-out Error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const login = async ({ accessToken, refreshToken }) => {
        await SecureStore.setItemAsync('accessToken', accessToken)
        await SecureStore.setItemAsync('refreshToken', refreshToken)

        await fetchAndSetUser(accessToken)
    }

    const fetchAndSetUser = async (accessToken) => {
        try {
            setIsLoading(true)

            const API_URL = process.env.EXPO_PUBLIC_API_URL

            const res = await fetch(`${API_URL}/api/user/verify`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })

            const result = await res.json()

            if (result.status === 404) {
                navigate('Register', { ...result.data })

                return
            }

            const userData = result.data.user
            await SecureStore.setItemAsync('uid', userData.id)

            setUid(userData.id)
            setUser(userData)
            await SecureStore.deleteItemAsync('accessToken')
            await SecureStore.deleteItemAsync('refreshToken')
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const isAuthenticated = () => {
        return !!uid
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isAuthenticated,
                signInWithMicrosoft,
                logout,
                login,
                setUid,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}

export { useAuth, AuthProvider }
