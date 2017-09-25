/**
 * Created by michael on 25/09/2017.
 */

import axios from 'axios';

import {WEATHER_DATA} from '../utils/types'
import {OPEN_WEATHER_API_KEY} from '../utils/constants'


export let get_city_data = (search_city) => {
    let domain = 'api.openweathermap.org'
    let country = 'us'
    let url = `http://${domain}/data/2.5/forecast?appid=${OPEN_WEATHER_API_KEY}&q=${search_city},${country}`

    // const request = fetch(url)
    const request = axios.get(url);

    return {
        type: WEATHER_DATA,
        payload: request
    }
}