import { StyleSheet } from 'react-native'

import colorUtil from '../../../utils/color.util'
import { Type } from '../../../domain/entities/others'

class PokeAboutStyle {

    public genarateStyles(type: Type) {

        const colorCard = colorUtil.getColorCard(type)

        return StyleSheet.create({

            container: {
                margin: 40,
            },

            title: {
                marginTop: 2.5,
                marginBottom: 20,
                fontWeight: "bold",
                color: colorCard,
                fontSize: 16,
            },

            description: {
                textAlign: "justify",
                marginBottom: 25,
                fontSize: 16,
            },

        })

    }
}

export default new PokeAboutStyle()