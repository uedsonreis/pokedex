import { StyleSheet } from 'react-native'

import colorUtil from '../../../utils/color.util'
import { Type } from '../../../domain/entities/others'

class PokeInfoStyle {

    public genarateStyles(type: Type) {

        const colorCard = colorUtil.getColorCard(type)

        return StyleSheet.create({

            container: {
                backgroundColor: colorCard,
            },

            title: {
                textTransform: "capitalize",
                fontStyle: "normal",
                fontWeight: "bold",
                color: 'white',
                fontSize: 26,
            },

            content: {
                backgroundColor: 'white',
            },

            tab: {
                backgroundColor: colorCard,
            },

            textTab: {
                fontWeight: "normal",
                color: 'white',
                fontSize: 16,
            },

        })

    }
}

export default new PokeInfoStyle()