import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { Content, List, Item, Icon, Input, Container, Header, Left, Body, Right, Button } from 'native-base'
import RBSheet from "react-native-raw-bottom-sheet"
import { connect } from 'react-redux'

import FilterPanel from '../../template/FilterPanel'
import PokeItem from '../../template/PokeItem'
import GenerationPanel from '../../template/GenerationPanel'

import { State } from '../../../domain/state'
import { Pokemon } from '../../../domain/entities/pokemon'
import SortPanel from '../../template/SortPanel'

import { Controller } from './controller'
import styles from './styles'

type Props = { state: State }

function Home(props: Props) {

    const controller = new Controller(props.state)

    const [pokemons, setPokemons] = useState<Pokemon[]>([])

    let bsSortRef: any
    let bsFilterRef: any
    let bsGenerationRef: any

    useEffect(() => {
        controller.getFullPokemons().then(results => setPokemons(results))
    }, [props])

    return (
        <Container>

            <Header transparent>
                <Left />
                <Body />
                <Right>
                    <Button transparent light onPress={() => {
                        bsSortRef.close()
                        bsFilterRef.close()
                        bsGenerationRef.open()
                    }}>
                        <Icon name='ios-grid' />
                    </Button>
                    <Button transparent light onPress={() => {
                        bsFilterRef.close()
                        bsGenerationRef.close()
                        bsSortRef.open()
                    }}>
                        <Icon name='list' />
                    </Button>
                    <Button transparent light onPress={() => {
                        bsSortRef.close()
                        bsGenerationRef.close()
                        bsFilterRef.open()
                    }}>
                        <Icon name='md-funnel' />
                    </Button>
                </Right>
            </Header>

            <Content scrollEnabled={false} contentContainerStyle={styles.container}>
                <Text style={styles.title}>Pokédex</Text>
                <Text style={styles.description}>Search for Pokémon by name or using the National Pokédex number.</Text>

                <Item style={styles.searchItem} regular>
                    <Icon name='search' />
                    <Input style={styles.searchInput} placeholder='What Pokémon are you looking for?' />
                </Item>

                <List
                    style={styles.list} leftOpenValue={75} rightOpenValue={-75} horizontal={false}
                    dataArray={pokemons} keyExtractor={data => data.name}
                    renderRow={data => <PokeItem pokemon={data} />}
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
                height={400} closeOnPressBack closeOnPressMask
            >
                <SortPanel
                    handleClose={() => bsSortRef.close()}
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

function mapStateToProps(state: State) {
    return { state }
}

export default connect(mapStateToProps)(Home)