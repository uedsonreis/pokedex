import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { Content, Item, Picker, Label, Form, Input, Button, Footer } from 'native-base'

import api from '../../../services/api.service'

import { Type } from '../../../domain/entities/others'
import { State, Filters } from '../../../domain/state'
import { actionFactory } from '../../../redux/actions'

import styles from './styles'

type Props = {
    filters: Filters,
    applyFilters: Function,
    resetFilters: Function,
    handleClose: Function
}

function FilterPanel(props: Props) {

    const { type, weaknesses, height, weight, range } = props.filters

    const heights = [ 'short', 'medium', 'tall' ]
    const weights = [ 'light', 'normal', 'heavy' ]

    const [types, setTypes] = useState<Type[]>([])
    const [selectedType, setSelectedType] = useState<Type | null>(type)
    const [selectedWeak, setSelectedWeak] = useState<Type | null>(weaknesses)
    const [selectedHeight, setSelectedHeight] = useState<string | null>(height)
    const [selectedWeight, setSelectedWeight] = useState<string | null>(weight)
    
    const [selectedBeginRange, setSelectedBeginRange] = useState<number>(range[0])
    const [selectedEndRange, setSelectedEndRange] = useState<number>(range[1])

    function findType(name: string): Type | null {
        const found = types.find(t => t.name === name)
        if (!found) return null
        return found
    }

    function findHeight(name: string): string | null {
        const found = heights.find(h => h === name)
        if (!found) return null
        return found
    }

    function findWeight(name: string): string | null {
        const found = weights.find(w => w === name)
        if (!found) return null
        return found
    }

    useEffect(() => {
        api.getTypes().then(response => {
            setTypes(response.results)
        })
    }, [])

    function apply() {
        props.applyFilters({
            type: selectedType,
            weaknesses: selectedWeak,
            height: selectedHeight,
            weight: selectedWeight,
            range: [selectedBeginRange, selectedEndRange]
        })
        props.handleClose()
    }

    function reset() {
        props.resetFilters()
        props.handleClose()
    }

    return (
        <Content style={styles.container}>
            <Text style={styles.title}>Filters</Text>
            <Text style={styles.description}>
                Use advanced search to explore Pokémon by type, weakness, height and more!
            </Text>

            <Form>
                <Item style={styles.item} inlineLabel picker>
                    <Label>Types</Label>
                    <Picker
                        mode="dropdown"
                        style={styles.picker}
                        placeholder="Select a Type"
                        selectedValue={selectedType ? selectedType.name : ''}
                        onValueChange={value => setSelectedType(findType(value))}
                    >
                        <Picker.Item label={''} value={''} />
                        {types.map(type => (
                            <Picker.Item key={type.name} label={type.name} value={type.name} />
                        ))}
                    </Picker>
                </Item>

                <Item style={styles.item} picker>
                    <Label>Weaknesses</Label>
                    <Picker
                        mode="dropdown"
                        style={styles.picker}
                        placeholder="Select a Weaknesses"
                        selectedValue={selectedWeak ? selectedWeak.name : ''}
                        onValueChange={value => setSelectedWeak(findType(value))}
                    >
                        <Picker.Item label={''} value={''} />
                        {types.map(type => (
                            <Picker.Item key={type.name} label={type.name} value={type.name} />
                        ))}
                    </Picker>
                </Item>

                <Item style={styles.item} inlineLabel picker>
                    <Label>Heights</Label>
                    <Picker
                        mode="dropdown"
                        style={styles.picker}
                        placeholder="Select a Height"
                        selectedValue={selectedHeight}
                        onValueChange={value => setSelectedHeight(findHeight(value))}
                    >
                        {heights.map(item => (
                            <Picker.Item key={item} label={item} value={item} />
                        ))}
                    </Picker>
                </Item>

                <Item style={styles.item} inlineLabel picker>
                    <Label>Weights</Label>
                    <Picker
                        mode="dropdown"
                        style={styles.picker}
                        placeholder="Select a Weight"
                        selectedValue={selectedWeight}
                        onValueChange={value => setSelectedWeight(findWeight(value))}
                    >
                        {weights.map(item => (
                            <Picker.Item key={item} label={item} value={item} />
                        ))}
                    </Picker>
                </Item>

                <Item style={styles.item} inlineLabel last>
                    <Label style={{ marginLeft:-10 }}>Range from</Label>
                    <Input
                        style={styles.input}
                        keyboardType="number-pad" value={String(selectedBeginRange)}
                        onChangeText={value => setSelectedBeginRange(Number(value))}
                    />
                    <Label>to</Label>
                    <Input
                        style={styles.input}
                        keyboardType="number-pad" value={String(selectedEndRange)}
                        onChangeText={value => setSelectedEndRange(Number(value))}
                    />
                </Item>
                
            </Form>
            
            <Footer style={styles.footer}>
                <Button style={styles.button} onPress={reset} large light>
                    <Text style={styles.textButton}>Reset</Text>
                </Button>
                <Button style={styles.button} onPress={apply} large danger>
                    <Text style={styles.textButton}>Apply</Text>
                </Button>
            </Footer>

        </Content>
    )
}

function mapStateToProps(state: State) {
    return { filters: state.filters }
}

const mapActions = {
    applyFilters: actionFactory.createApplyFilters,
    resetFilters: actionFactory.createResetFilters
}

export default connect(mapStateToProps, mapActions)(FilterPanel)