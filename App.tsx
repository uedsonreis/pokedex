import React from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import 'react-native-gesture-handler'

import { persistor, store } from './src/redux/store'
import Router from './src/components/Router'

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
                <Router />
            </PersistGate>
        </Provider>
    )
}