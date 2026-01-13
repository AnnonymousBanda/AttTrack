import { Assets as NavigationAssets } from '@react-navigation/elements'
import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { Asset } from 'expo-asset'
import { createURL } from 'expo-linking'
import * as SplashScreen from 'expo-splash-screen'
import * as React from 'react'
import { ActivityIndicator, useColorScheme } from 'react-native'
import { Navigation } from './navigation'
import { AuthProvider, useAuth } from './context'
import { navigationRef } from './navigation/rootnavigation'

Asset.loadAsync([...NavigationAssets])

SplashScreen.preventAutoHideAsync()

const prefix = createURL('/')

const Root = () => {
    const colorScheme = useColorScheme()

    const theme = colorScheme !== 'dark' ? DarkTheme : DefaultTheme

    return (
        <Navigation
            theme={theme}
            linking={{
                enabled: 'auto',
                prefixes: [prefix],
            }}
            onReady={() => {
                SplashScreen.hideAsync()
            }}
            ref={navigationRef}
        />
    )
}

export function App() {
    return (
        <AuthProvider>
            <Root />
        </AuthProvider>
    )
}
