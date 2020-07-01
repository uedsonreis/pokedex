import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { Content, List, ListItem, Item, Icon, Input } from 'native-base'

import api from '../../services/api.service'
import { Pokemon } from '../../domain/entities/pokemon'

import styles from './styles'

export default function Home() {

    const [pokemons, setPokemons] = useState<Pokemon[]>([])

    useEffect(() => {
        api.getPokemons().then(response => {
            console.log('Pokemons are here: ', response)
            setPokemons(response.results)
        })
    }, [])

    return (
        <Content contentContainerStyle={styles.container}>
            <Text style={styles.title}>Pokédex</Text>
            <Text style={styles.description}>Search for Pokémon by name or using the National Pokédex number.</Text>

            <Item style={styles.searchItem} regular>
                <Icon active name='search' />
                <Input style={styles.searchInput} placeholder='What Pokémon are you looking for?' />
            </Item>

            <List
                leftOpenValue={75} rightOpenValue={-75}
                dataArray={pokemons}
                keyExtractor={data => data.name}
                horizontal={false}
                renderRow={data => <Text>{data.name}</Text>}
            />
        </Content>
    )
}