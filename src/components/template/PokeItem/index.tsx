import React from 'react'
import { Image, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Card, View, CardItem, Body, Right } from 'native-base'

import PokeButton from '../PokeButton'
import { Pokemon } from "../../../domain/entities/pokemon"

import pokeItemStyle from './styles'

type Props = { pokemon: Pokemon }

export default function PokeItem(props: Props) {

    const { pokemon } = props

    const navigation = useNavigation()

    const styles = pokeItemStyle.genarateStyles(pokemon.types[0].type)

    return (
        <Card style={styles.card}>
            <CardItem style={styles.cardItem}>
                <Body>
                    <Text style={styles.code}>{formatId(pokemon)}</Text>
                    <Text style={styles.title} onPress={() => navigation.navigate('info', pokemon)}>{pokemon.name}</Text>
                    <View style={styles.buttons}>
                        {pokemon.types.map(pokeType => <PokeButton key={pokeType.slot} pokeType={pokeType} />)}
                    </View>
                </Body>
                <Right>
                    <Image style={styles.image} source={{uri: pokemon.sprites.front_default }} />
                </Right>
            </CardItem>
        </Card>
    )

}

function formatId(pokemon: Pokemon | undefined): string {
    if (!pokemon) return "#000"

    let stringId = String(pokemon.id)

    if (stringId.length < 3) {
        let format = ''
        for (let i=stringId.length; i < 3; i++) {
            format += '0'
        }
        stringId = format + stringId
    }

    return '#'+stringId
}