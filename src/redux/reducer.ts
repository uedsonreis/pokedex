import { combineReducers } from 'redux'
import { Action, APPLY_FILTER, RESET_FILTER, SORT, SET_GENERATION } from './actions'
import { State } from '../domain/state'

const initialState: State = {
    filters: {
        type: null, weaknesses: null, height: 'tall', weight: 'normal', range: [1, 100]
    },
    sort: {
        name: false, desc: false
    },
    generation: null
}

function filtersReducer(prevFilters = initialState.filters, action: Action) {
    switch(action.type) {
        case APPLY_FILTER:
            return { ...action.payload }

        case RESET_FILTER:
            return { ...initialState.filters }
    
        default: return prevFilters
    }
}

function sortReducer(prevSort = initialState.sort, action: Action) {
    switch(action.type) {
        case SORT:
            return { ...action.payload }
    
        default: return prevSort
    }
}

function generationReducer(prevGeneration = initialState.generation, action: Action) {
    switch(action.type) {
        case SET_GENERATION:
            return { ...action.payload }
    
        default: return prevGeneration
    }
}

export default combineReducers({
    filters: filtersReducer,
    sort: sortReducer,
    generation: generationReducer,
})