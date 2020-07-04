import { StyleSheet } from 'react-native'

import colorUtil from '../../../utils/color.util'
import { Type } from '../../../domain/entities/others'

class PokeButtonStyle {

    public genarateStyles(type: Type) {

        const colorButton = colorUtil.getColorButton(type)
        
        return StyleSheet.create({
            button: {
                backgroundColor: colorButton,
                marginRight: 5,
            },
        
            text: {
                fontSize: 10,
                color: 'white',
                textTransform: 'capitalize',
            },
        
        })
    }

}

export default new PokeButtonStyle()