/**
 * Created by michael on 25/09/2017.
 */

import axios from 'axios';

import {WEATHER_DATA, RECOMMENDED_CITY} from '../utils/types'
import {OPEN_WEATHER_API_KEY} from '../utils/constants'


export let get_city_data = (search_city, save) => {
    console.log('get_city_data called with arguments: ', search_city, ' and ', save)

    let domain = 'api.openweathermap.org'
    let country = 'us'
    let url = `http://${domain}/data/2.5/forecast?appid=${OPEN_WEATHER_API_KEY}&q=${search_city},${country}`

    const request = axios.get(url);

    return {
        type: save ? WEATHER_DATA : RECOMMENDED_CITY,
        payload: request
    }
}