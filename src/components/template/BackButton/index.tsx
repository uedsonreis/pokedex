import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function BackButtun() {

    const navigation = useNavigation()

    function handleGoBack() {
        navigation.goBack()
    }

    return (
        <TouchableOpacity onPress={handleGoBack}>
            <Icon name="arrow-left" size={26} color="white" />
        </TouchableOpacity>
    )
}