import { StyleSheet } from 'react-native'

import colorUtil from '../../../utils/color.util'
import { Type } from '../../../domain/entities/others'

class PokeInfoStyle {

    public genarateStyles(type: Type) {

        const colorCard = colorUtil.getColorCard(type)

        return StyleSheet.create({

            

        })

    }
}

export default new PokeInfoStyle()