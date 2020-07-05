import React from 'react'
import { useRoute } from '@react-navigation/native'
import { Text } from 'react-native'
import { Container, Content, Label, Header, Left, Body, Right, Title, Tabs, Tab, TabHeading } from 'native-base'

import { Pokemon } from '../../../domain/entities/pokemon'
import BackButtun from '../../template/BackButton'

import pokeInfoStyles from './styles'
import About from '../../panels/About'
import Stats from '../../panels/Stats'
import Evolution from '../../panels/Evolution'

function PokePage() {

    const route = useRoute()

    const pokemon = route.params as Pokemon

    const styles = pokeInfoStyles.genarateStyles(pokemon.types[0].type)

    return (
        <Container style={styles.container}>

            <Header transparent>
                <Left><BackButtun /></Left>

                <Body>
                    <Title style={styles.title}>{pokemon.name}</Title>
                </Body>

                <Right />
            </Header>

            <Content style={styles.content}>

                <Tabs>
                    <Tab heading={
                        <TabHeading style={styles.tab}><Text style={styles.textTab}>About</Text></TabHeading>
                    }>
                        <About pokemon={pokemon} />
                    </Tab>

                    <Tab heading={
                        <TabHeading style={styles.tab}><Text style={styles.textTab}>Stats</Text></TabHeading>
                    }>
                        <Stats pokemon={pokemon} />
                    </Tab>
                    
                    <Tab heading={
                        <TabHeading style={styles.tab}><Text style={styles.textTab}>Evolution</Text></TabHeading>
                    }>
                        <Evolution pokemon={pokemon} />
                    </Tab>
                </Tabs>

            </Content>
        </Container>
    )
}

export default PokePage