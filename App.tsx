import React from 'react'
import { StatusBar, View } from 'react-native'

import 'react-native-gesture-handler'

import Router from './src/Router'

export default function App() {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <Router />
        </>
    )
}