import { Assets as NavigationAssets } from '@react-navigation/elements'
import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { Asset } from 'expo-asset'
import { createURL } from 'expo-linking'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Navigation } from './navigation'
import { AuthProvider, useAuth } from './context'
import { navigationRef } from './navigation/rootnavigation'
import { BrandLoader } from './components'

Asset.loadAsync([...NavigationAssets])

SplashScreen.preventAutoHideAsync()

const prefix = createURL('/')

export function App() {
    return (
        <AuthProvider>
            <Root />
        </AuthProvider>
    )
}

const Root = () => {
    const { loadUid } = useAuth()
    const [appReady, setAppReady] = useState(false)

    const theme = DefaultTheme

    useEffect(() => {
        const prepareApp = async () => {
            try {
                await loadUid()
            } finally {
                setTimeout(async () => {
                    setAppReady(true)
                    await SplashScreen.hideAsync()
                }, 1000)
            }
        }

        prepareApp()
    }, [])

    if (!appReady) {
        return <BrandLoader />
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <Navigation
                theme={theme}
                linking={{
                    enabled: 'auto',
                    prefixes: [prefix],
                }}
                ref={navigationRef}
            />
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
