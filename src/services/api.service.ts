import axios from 'axios'

import { ResultList } from '../domain/result.list'

class ApiService {

    private readonly api = axios.create()

    public async getPokemons(): Promise<ResultList> {
        const response = await this.api.get('https://pokeapi.co/api/v2/pokemon')
        return response.data
    }

    public async getTypes(): Promise<ResultList> {
        const response = await this.api.get('https://pokeapi.co/api/v2/type')
        return response.data
    }

    public async get(url : string) {
        const response = await this.api.get(url)
        return response.data
    }

}

export default new ApiService()