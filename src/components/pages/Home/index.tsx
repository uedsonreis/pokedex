import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { Content, List, Label, Icon, Container, Header, Left, Body, Right, Button, Spinner } from 'native-base'
import RBSheet from "react-native-raw-bottom-sheet"
import { connect } from 'react-redux'

import FilterPanel from '../../template/FilterPanel'
import PokeItem from '../../template/PokeItem'

import { State } from '../../../domain/state'
import { Pokemon } from '../../../domain/entities/pokemon'
import SortPanel from '../../template/SortPanel'

import controller from './controller'
import styles from './styles'

type Props = { state: State }

function ListPanel(props: Props) {

    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        controller.getFullPokemons(props.state).then(results => {
            setPokemons(results)
            setLoading(false)
        })
    }, [props.state])
    
    if (!pokemons || pokemons.length < 1) return (
        <Content>
            <Spinner color="black" />
            <Label>Loading, please wait...</Label>
        </Content>
    )

    if (loading) return (
        <Content>
            <Spinner color="black" />
            <Label>Filtering, please wait...</Label>
        </Content>
    )

    return (
        <List
            listBorderColor={'black'}
            style={styles.list} horizontal={false}
            leftOpenValue={75} rightOpenValue={-75}
            dataArray={pokemons} keyExtractor={data => data.name}
            renderRow={pokemon => <PokeItem pokemon={pokemon} />}
        />
    )
}

function Home(props: Props) {
    
    let bsSortRef: any
    let bsFilterRef: any

    return (
        <Container>

            <Header transparent>
                <Left />
                <Body />
                <Right>
                    <Button transparent light onPress={() => {
                        bsFilterRef.close()
                        bsSortRef.open()
                    }}>
                        <Icon name='list' />
                    </Button>
                    <Button transparent light onPress={() => {
                        bsSortRef.close()
                        bsFilterRef.open()
                    }}>
                        <Icon name='md-funnel' />
                    </Button>
                </Right>
            </Header>

            <Content scrollEnabled={false} contentContainerStyle={styles.container}>
                <Text style={styles.title}>Pokédex</Text>
                <Text style={styles.description}>Search for Pokémon by name or using the National Pokédex number.</Text>
                <ListPanel state={props.state} />
            </Content>

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