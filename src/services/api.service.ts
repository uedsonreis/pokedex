import axios from 'axios'

import { ResultList } from '../domain/result.list'

class ApiService {

    private readonly api = axios.create({
        baseURL: 'https://pokeapi.co/api/v2/'
    })

    public async getPokemons(): Promise<ResultList> {
        const response = await this.api.get('pokemon')
        return response.data
    }

}

export default new ApiService()