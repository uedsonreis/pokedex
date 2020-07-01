import React from 'react'
import { StatusBar } from 'expo-status-bar'

import 'react-native-gesture-handler'

import Router from './src/Router'

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <Router />
        </>
    )
}