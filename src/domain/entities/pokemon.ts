import { PokemonAbility } from "./pokemon.ability";
import { PokemonType } from "./pokemon.type";

export interface Pokemon {
    
    id: number
    url: string
    name: string
    base_experience: number
    height: number
    is_default: boolean
    order: number
    weight: number
    location_area_encounters: string
    
    abilities: PokemonAbility[] // list PokemonAbility
    forms: any[] // list NamedAPIResource (PokemonForm)
    game_indices: any[] // list VersionGameIndex
    held_items: any[] // list PokemonHeldItem
    moves: any[] // list PokemonMove
    sprites: any // PokemonSprites
    species: any // NamedAPIResource (PokemonSpecies)
    stats: any[] // list PokemonStat
    types: PokemonType[] // list PokemonType

}