import { StyleSheet } from 'react-native'

import colorUtil from '../../../utils/color.util'
import { Type } from '../../../domain/entities/others'

class PokeItemStyle {

    public genarateStyles(type: Type) {

        const colorCard = colorUtil.getColorCard(type)

        return StyleSheet.create({
            card: {
                borderRadius: 10,
                width: '100%',
                height: 115,
                maxHeight: 115,
                marginBottom: 30,
                flex: 1,
                justifyContent: 'center',
                backgroundColor: colorCard,
            },

            cardItem: {
                flex: 1,
                borderRadius: 10,
                justifyContent: 'center',
                backgroundColor: colorCard,
            },

            code: {
                width: 40,
                height: 14,
                marginTop: 5,
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: 12,
                lineHeight: 14,
                color: '#16161b',
            },

            title: {
                height: 31,
                width: 170,
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: 26,
                lineHeight: 31,
                textTransform: 'capitalize',
            },

            image: {
                flex: 1,
                width: 130,
                height: 130,
                marginRight: -20,
            },

            buttons: {
                flexDirection: "row",
                marginTop: 5
            },
        })

    }
}

export default new PokeItemStyle()