import React from 'react'
import { Text } from 'react-native'
import { Button, Content } from 'native-base'
import { connect } from 'react-redux'

import styles from './styles'
import { State, Sort } from '../../../domain/state'
import { actionFactory } from '../../../redux/actions'

type Props = {
    sort: Sort,
    doSort: Function,
    handleClose: Function
}

function SortPanel(props: Props) {

    const { name, desc } = props.sort

    function numberUpward(): void {
        props.doSort({ name: false, desc: false })
        props.handleClose()
    }

    function numberDownward(): void {
        props.doSort({ name: false, desc: true })
        props.handleClose()
    }

    function nameUpward(): void {
        props.doSort({ name: true, desc: false })
        props.handleClose()
    }

    function nameDownward(): void {
        props.doSort({ name: true, desc: true })
        props.handleClose()
    }

    return (
        <Content style={styles.container}>

            <Text style={styles.title}>Sort</Text>
            <Text style={styles.description}>
                Sort Pokémons alphabetically or by National Pokédex number!
            </Text>

            <Button style={(!name && !desc) ? styles.selectedButton : styles.button} onPress={numberUpward} block>
                <Text style={styles.text}>Smallest number fist</Text>
            </Button>

            <Button style={(!name && desc) ? styles.selectedButton : styles.button} onPress={numberDownward} block>
                <Text style={styles.text}>Highest number fist</Text>
            </Button>

            <Button style={(name && !desc) ? styles.selectedButton : styles.button} onPress={nameUpward} block>
                <Text style={styles.text}>A-Z</Text>
            </Button>

            <Button style={(name && desc) ? styles.selectedButton : styles.button} onPress={nameDownward} block>
                <Text style={styles.text}>Z-A</Text>
            </Button>

        </Content>
    )
}

function mapStateToProps(state: State) {
    return { sort: state.sort }
}

const mapActions = {
    doSort: actionFactory.createSort
}

export default connect(mapStateToProps, mapActions)(SortPanel)