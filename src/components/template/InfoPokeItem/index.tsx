import React from 'react'

import styles from './styles'
import { Item, Label } from 'native-base'

type Props = { label: string, value: string }

export default function InfoPokeItem(props: Props) {

    const { label, value } = props

    return (
        <Item style={styles.item} inlineLabel>
            <Label style={styles.itemLabel}>{label}</Label>
            <Label style={styles.itemValue}>{value}</Label>
        </Item>
    )

}