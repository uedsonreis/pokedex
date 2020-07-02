import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { Content, Item, Picker, Icon, Label, Form, Input, Button, Left, Right, Body, Footer } from 'native-base'

import api from '../../services/api.service'

import { Type } from '../../domain/entities/type'
import styles from './styles'

function createNewType(): Type {
    return { name: '', url: '' }
}

type Props = { handleClose: Function }

export default function FilterPanel(props: Props) {

    const heights = [ 'short', 'medium', 'tall' ]
    const weights = [ 'light', 'normal', 'heavy' ]

    const [types, setTypes] = useState<Type[]>([])
    const [selectedType, setSelectedType] = useState<Type>(createNewType())
    const [selectedWeak, setSelectedWeak] = useState<Type>(createNewType())
    const [selectedHeight, setSelectedHeight] = useState<string>("")
    const [selectedWeight, setSelectedWeight] = useState<string>("")

    useEffect(() => {
        api.getTypes().then(response => {
            setTypes(response.results)
        })
    }, [])

    return (
        <Content style={styles.container}>
            <Text style={styles.title}>Filters</Text>
            <Text style={styles.description}>
                Use advanced search to explore Pokémon by type, weakness, height and more!
            </Text>

            <Form>
                <Item style={styles.item} picker>
                    <Label>Types</Label>
                    <Picker
                        mode="dropdown"
                        style={styles.picker}
                        placeholder="Select a Type"
                        selectedValue={selectedType}
                        onValueChange={value => setSelectedType(value)}
                    >
                        {types.map(type => (
                            <Picker.Item label={type.name} value={type} />
                        ))}
                    </Picker>
                </Item>

                <Item style={styles.item} picker>
                    <Label>Weaknesses</Label>
                    <Picker
                        mode="dropdown"
                        style={styles.picker}
                        placeholder="Select a Weaknesses"
                        selectedValue={selectedWeak}
                        onValueChange={value => setSelectedWeak(value)}
                    >
                        {types.map(type => (
                            <Picker.Item label={type.name} value={type} />
                        ))}
                    </Picker>
                </Item>

                <Item style={styles.item} picker>
                    <Label>Heights</Label>
                    <Picker
                        mode="dropdown"
                        style={styles.picker}
                        placeholder="Select a Height"
                        selectedValue={selectedHeight}
                        onValueChange={value => setSelectedHeight(value)}
                    >
                        {heights.map(item => (
                            <Picker.Item label={item} value={item} />
                        ))}
                    </Picker>
                </Item>

                <Item style={styles.item} picker>
                    <Label>Weights</Label>
                    <Picker
                        mode="dropdown"
                        style={styles.picker}
                        placeholder="Select a Weight"
                        selectedValue={selectedWeight}
                        onValueChange={value => setSelectedWeight(value)}
                    >
                        {weights.map(item => (
                            <Picker.Item label={item} value={item} />
                        ))}
                    </Picker>
                </Item>

                <Item style={styles.item} last>
                    <Label>Number Range</Label>
                    <Input  />
                </Item>
                
            </Form>
            
            <Footer style={styles.footer}>
                <Button style={styles.button} onPress={() => props.handleClose()} large light>
                    <Text style={styles.textButton}>Reset</Text>
                </Button>
                <Button style={styles.button} large danger>
                    <Text style={styles.textButton}>Apply</Text>
                </Button>
            </Footer>

        </Content>
    )

}