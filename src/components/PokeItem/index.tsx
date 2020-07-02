import React, { useEffect, useState } from 'react'
import { Image, Text } from 'react-native'
import { Card, View, Thumbnail, CardItem, Body, Right, Button } from 'native-base'

import { Pokemon } from "../../domain/entities/pokemon"

import api from '../../services/api.service'
import PokeButton from '../PokeButton'

import pokeItemStyle from './styles'

type Props = { pokemon: Pokemon }

export default function PokeItem(props: Props) {

    const { pokemon } = props
    
    const [fullPokemon, setFullPokemon] = useState<Pokemon>()

    useEffect(() => {
        api.get(pokemon.url).then(fullPokemon => setFullPokemon(fullPokemon))
    }, [])

    if (!fullPokemon) return (<Text>Waiting...</Text>)

    const styles = pokeItemStyle.genarateStyles(fullPokemon.types[0].type)

    return (
        <Card style={styles.card}>
            <CardItem style={styles.cardItem}>
                <Body>
                    <Text style={styles.code}>{formatId(fullPokemon)}</Text>
                    <Text style={styles.title}>{pokemon.name}</Text>
                    <View style={styles.buttons}>
                        {fullPokemon.types.map(pokeType => <PokeButton key={pokeType.slot} pokeType={pokeType} />)}
                    </View>
                </Body>
                <Right>
                    {/* <Thumbnail style={styles.image} source={{uri: fullPokemon.sprites.front_default }} /> */}
                    <Image style={styles.image} source={{uri: fullPokemon.sprites.front_default }} />
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