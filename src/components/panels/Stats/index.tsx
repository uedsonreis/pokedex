import React, { useState, useEffect } from 'react'
import { Label, Content, List, Item } from 'native-base'

import { Pokemon } from '../../../domain/entities/pokemon'

import pokeInfoStyles from './styles'
import api from '../../../services/api.service'
import InfoPokeItem from '../../template/InfoPokeItem'

type Props = { pokemon: Pokemon }

export default function Stats(props: Props) {

    const { pokemon } = props

    const [species, setSpecies] = useState<any>()
    const [locations, setLocations] = useState<any[]>()

    useEffect(() => {
        api.get(pokemon.species.url).then(results => setSpecies(results))
        api.get(pokemon.location_area_encounters).then(results => setLocations(results))
    }, [])

    if (!species) return <Label>Loading...</Label>

    const styles = pokeInfoStyles.genarateStyles(pokemon.types[0].type)

    const total = pokemon.stats.reduce((total: number, stat: any) => total + stat.base_stat, 0)

    return (
        <Content style={styles.container}>

            <Label style={styles.title}>Base Stats</Label>

            {pokemon.stats.map((stat: any, index: number) => (
                <InfoPokeItem
                    label={stat.stat.name}
                    value={`${stat.base_stat} (${stat.effort})`}
                />
            ))}

            <InfoPokeItem label={'Total'} value={total} />

            <Label style={styles.description}>Between parentheses it is the Effort value.</Label>

        </Content>
    )

}