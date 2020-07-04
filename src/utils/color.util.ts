import { Type } from "../domain/entities/others"

type ColorSchema = { colorButton: string | undefined, colorCard: string | undefined }

class ColorUtil {

    private getColor(name: string): ColorSchema {
        switch (name) {
        
            case 'bug': return {
                colorButton: '#8CB330', colorCard: '#8BD674'
            }
            case 'electric': return {
                colorButton: '#EED535', colorCard: '#F2CB55'
            }
            case 'fairy': return {
                colorButton: '#ED6EC7', colorCard: '#EBA8C3'
            }
            case 'fighting': return {
                colorButton: '#D04164', colorCard: '#EB4971'
            }
            case 'fire': return {
                colorButton: '#FD7D24', colorCard: '#FFA756'
            }
            case 'flying': return {
                colorButton: '#748FC9', colorCard: '#A7BFFC'
            }
            case 'grass': return {
                colorButton: '#62B957', colorCard: '#8BBE8A'
            }
            case 'ground': return {
                colorButton: '#DD7748', colorCard: '#F78551'
            }
            case 'normal': return {
                colorButton: '#9DA0AA', colorCard: '#B5B9C4'
            }
            case 'poison': return {
                colorButton: '#A552CC', colorCard: '#9F6E97'
            }
            case 'water': return {
                colorButton: '#4A90DA', colorCard: '#58ABF6'
            }
            
            default: return { colorButton: undefined, colorCard: '#E8ECF7' }
        }
    }

    public getColorButton(type: Type): string | undefined {
        return this.getColor(type.name).colorButton
    }

    public getColorCard(type: Type): string | undefined {
        return this.getColor(type.name).colorCard
    }

}

export default new ColorUtil()