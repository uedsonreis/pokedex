import React from 'react'
import { Label } from 'native-base'

import { Pokemon } from '../../../domain/entities/pokemon'

import styles from './styles'

type Props = { pokemon: Pokemon }

export default function Evolution(props: Props) {

    const { pokemon } = props

    return (
        <Label>Evolution: {pokemon.name}</Label>
    )

}