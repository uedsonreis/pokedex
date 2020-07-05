import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomePage from '../pages/Home'
import PokePage from '../pages/PokePage'

export default function Router() {

    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="home" component={HomePage} />
                <Stack.Screen name="info" component={PokePage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}