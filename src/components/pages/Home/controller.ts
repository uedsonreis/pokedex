import api from '../../../services/api.service'
import { ResultList } from '../../../domain/result.list'
import { Pokemon } from '../../../domain/entities/pokemon'
import { State } from '../../../domain/state'

const SHORT = 7
const MEDIUM = 10

const LIGHT = 1000
const NORMAL = 2000

let urlNextPage: string | null = null

export class Controller {

    constructor(private state: State) {}

    public async getFullPokemons(): Promise<Pokemon[]> {
        const { range } = this.state.filters

        const offset = this.state.filters.range[0] - 1
        const end = this.state.filters.range[1]
        const limit = end - offset

        const response = await api.getPokemons(offset, limit)
        urlNextPage = response.next
        return await this.fulfillPokemon(response.results)
    }

    private async fulfillPokemon(pokemons: Pokemon[]): Promise<Pokemon[]> {
        const fullPokemonList: Pokemon[] = []

        for (let pokemon of pokemons) {
            const fullPokemon = await api.get(pokemon.url)
            if (this.filtrate(fullPokemon)) fullPokemonList.push(fullPokemon)
        }

        return this.sort(fullPokemonList)
    }

    private sort(pokemons: Pokemon[]): Pokemon[] {
        let returnNumber = 1
        if (this.state.sort.desc) {
            returnNumber = -1
        }

        if (this.state.sort.name) {
            return pokemons.sort((a, b) => (a.name > b.name) ? returnNumber : -returnNumber)
        } else {
            return pokemons.sort((a, b) => (a.id > b.id) ? returnNumber : -returnNumber)
        }
    }

    private filtrate(pokemon: Pokemon): boolean {
        const { type, weaknesses, height, weight } = this.state.filters
    
        if (type && !pokemon.types.find(pt => pt.type.name === type.name)) {
            return false
        }
        if (weaknesses && pokemon.types.find(pt => pt.type.name === weaknesses.name)) {
            return false
        }
        if (height) {
            switch(height) {
                case 'short': 
                    if (pokemon.height > SHORT) return false
                    break
                case 'medium': 
                    if (pokemon.height <= SHORT || pokemon.height > MEDIUM) return false
                    break
                case 'tall': 
                    if (pokemon.height <= MEDIUM) return false
                    break
            }
        }
        if (weight) {
            switch(weight) {
                case 'light': 
                    if (pokemon.weight > LIGHT) return false
                    break
                case 'normal': 
                    if (pokemon.weight <= LIGHT || pokemon.weight > NORMAL) return false
                    break
                case 'heavy': 
                    if (pokemon.weight <= NORMAL) return false
                    break
            }
        }

        return true
    }
}