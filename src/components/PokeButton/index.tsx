import React from 'react'

import { PokemonType } from "../../domain/entities/pokemon.type"
import { Button, Icon, Text } from 'native-base'

import pokeButtonStyle from './styles'

type Props = { pokeType: PokemonType }

export default function PokeButton(props: Props) {

    const { type } = props.pokeType

    const styles = pokeButtonStyle.genarateStyles(type)

    return (
        <Button  style={styles.button} iconLeft small>
            <Text style={styles.text}>{type.name}</Text>
        </Button>
    )

}