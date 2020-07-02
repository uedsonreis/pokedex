import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { Content, List, Item, Icon, Input, Container, Header, Left, Body, Right, Button } from 'native-base'
import RBSheet from "react-native-raw-bottom-sheet"

import api from '../../services/api.service'
import FilterPanel from '../../components/FilterPanel'
import PokeItem from '../../components/PokeItem'
import { Pokemon } from '../../domain/entities/pokemon'

import styles from './styles'
import GenerationPanel from '../../components/GenerationPanel'
import SortPanel from '../../components/SortPanel'

export default function Home() {

    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [nextPage, setNextPage] = useState<string | null>(null)

    let bsSortRef: any
    let bsFilterRef: any
    let bsGenerationRef: any

    function filtrate(filter?: any) {
        api.getPokemons().then(response => {
            setPokemons(response.results)
            setNextPage(response.next)
        })
    }

    useEffect(() => {
        filtrate()
    }, [])

    return (
        <Container>

            <Header transparent>
                <Left />
                <Body />
                <Right>
                    <Button onPress={() => bsGenerationRef.open()} transparent light>
                        <Icon name='ios-grid' />
                    </Button>
                    <Button onPress={() => bsSortRef.open()} transparent light>
                        <Icon name='list' />
                    </Button>
                    <Button onPress={() => bsFilterRef.open()} transparent light>
                        <Icon name='md-funnel' />
                    </Button>
                </Right>
            </Header>

            <Content contentContainerStyle={styles.container}>
                <Text style={styles.title}>Pokédex</Text>
                <Text style={styles.description}>Search for Pokémon by name or using the National Pokédex number.</Text>

                <Item style={styles.searchItem} regular>
                    <Icon name='search' />
                    <Input style={styles.searchInput} placeholder='What Pokémon are you looking for?' />
                </Item>

                <List
                    leftOpenValue={75} rightOpenValue={-75}
                    dataArray={pokemons} style={styles.list}
                    keyExtractor={data => data.name}
                    horizontal={false}
                    renderRow={data => <PokeItem pokemon={data} />}
                    onEndReached={() => {
                        if (nextPage === null) return;
                        api.get(nextPage).then(response => {
                            setPokemons([...pokemons, ...response.results])
                            setNextPage(response.next)
                        })
                    }}
                />
            </Content>

            <RBSheet ref={ref => { bsGenerationRef = ref }}
                customStyles={{ container: styles.bottomSheet }}
                height={600} closeOnPressBack closeOnPressMask
            >
                <GenerationPanel
                    // handleClose={() => bsGenerationRef.close()}
                />
            </RBSheet>
            <RBSheet ref={ref => { bsSortRef = ref }}
                customStyles={{ container: styles.bottomSheet }}
                height={600} closeOnPressBack closeOnPressMask
            >
                <SortPanel
                    // handleClose={() => bsSortRef.close()}
                />
            </RBSheet>
            <RBSheet ref={ref => { bsFilterRef = ref }}
                customStyles={{ container: styles.bottomSheet }}
                height={600} closeOnPressBack closeOnPressMask
            >
                <FilterPanel handleClose={() => bsFilterRef.close()} />
            </RBSheet>
        </Container>
    )
}