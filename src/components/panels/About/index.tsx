import React, { useState, useEffect } from 'react'
import { Label, Content, List, Item } from 'native-base'

import { Pokemon } from '../../../domain/entities/pokemon'

import pokeInfoStyles from './styles'
import api from '../../../services/api.service'
import InfoPokeItem from '../../template/InfoPokeItem'

type Props = { pokemon: Pokemon }

function convertToMeter(value: number): string {
    return (value / 10).toFixed(2) + 'm'
}

function convertToKg(value: number): string {
    return (value / 10).toFixed(2) + 'kg'
}

export default function About(props: Props) {

    const { pokemon } = props

    const [species, setSpecies] = useState<any>()
    const [locations, setLocations] = useState<any[]>()

    useEffect(() => {
        api.get(pokemon.species.url).then(results => setSpecies(results))
        api.get(pokemon.location_area_encounters).then(results => setLocations(results))
    }, [])

    if (!species) return <Label>Loading...</Label>

    const styles = pokeInfoStyles.genarateStyles(pokemon.types[0].type)

    return (
        <Content style={styles.container}>

            <Label style={styles.title}>Pokédex Data</Label>
            
            <InfoPokeItem label={'Species'} value={pokemon.species.name} />
            <InfoPokeItem label={'Height'} value={convertToMeter(pokemon.height)} />
            <InfoPokeItem label={'Weight'} value={convertToKg(pokemon.weight)} />

            {pokemon.abilities.map((ability: any, index: number) => (
                <InfoPokeItem
                    label={`Abilities ${(index+1)}`}
                    value={ability.ability.name + ((ability.is_hidden) ? ' (hidden)' : '')}
                />
            ))}

            <Label style={styles.title}>Training</Label>

            <InfoPokeItem label={'Catch rate'} value={species.capture_rate} />
            <InfoPokeItem label={'happiness'} value={species.base_happiness} />
            <InfoPokeItem label={'Base exp'} value={pokemon.base_experience.toFixed(0)} />
            <InfoPokeItem label={'Growth rate'} value={species.growth_rate.name} />

            <Label style={styles.title}>Breeding</Label>

            <InfoPokeItem label={'Egg groups'} value={species.egg_groups.map((egg: any) => egg.name).toLocaleString()} />

            {locations && locations.length > 0 && (
                <Label style={styles.title}>Location</Label>
            )}

            {locations && locations.map((area: any, index: number) => (
                <InfoPokeItem
                    label={`Area ${(index+1)}`}
                    value={area.location_area.name}
                />
            ))}

            <Label style={styles.title}>Flavor text</Label>
            <Label style={styles.description}>{species.flavor_text_entries[0].flavor_text}</Label>

        </Content>
    )

}