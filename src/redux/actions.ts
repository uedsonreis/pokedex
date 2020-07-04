import { Filters, Sort } from '../domain/state'
import { Generation } from '../domain/entities/others'

export const APPLY_FILTER = 'APPLY_FILTER'
export const RESET_FILTER = 'RESET_FILTER'
export const SORT = 'SORT'
export const SET_GENERATION = 'SET_GENERATION'

export interface Action {
    type: string
    payload?: any
}

class ActionFactory {

    public createApplyFilters(filters: Filters): Action {
        return { type: APPLY_FILTER, payload: filters }
    }

    public createResetFilters(): Action {
        return { type: RESET_FILTER }
    }

    public createSort(sort: Sort) {
        return { type: SORT, payload: sort }
    }

    public createGeneration(generation: Generation) {
        return { type: SET_GENERATION, payload: generation }
    }

}

export const actionFactory = new ActionFactory()