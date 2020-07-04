import { Type, Generation } from "./entities/others";

export interface Sort {
    name: boolean
    desc: boolean
}

export interface Filters {
    type: Type | null
    weaknesses: Type | null
    height: 'short' | 'medium' | 'tall' | null
    weight: 'light' | 'normal' | 'heavy' | null
    range: [number, number]
}

export interface State {
    filters: Filters
    sort: Sort
    generation: Generation | null
}