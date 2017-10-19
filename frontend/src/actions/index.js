/**
 * Created by michael on 25/09/2017.
 */

import axios from 'axios';

import {WEATHER_DATA, RECOMMENDED_CITY, AUTOCOMPLETE} from '../utils/types'
import {OPEN_WEATHER_API_KEY, GOOGLE_PLACES_KEY} from '../utils/constants'


export let get_city_data = (search_city, save) => {
    let domain = 'api.openweathermap.org'
    let country = 'us'
    let url = `http://${domain}/data/2.5/forecast?appid=${OPEN_WEATHER_API_KEY}&q=${search_city},${country}`

    const request = axios.get(url);

    return {
        type: save ? WEATHER_DATA : RECOMMENDED_CITY,
        payload: request
    }
}

export let autocomplete_request = (city) => {
    let domain = 'maps.googleapis.com'
    let path = 'maps/api/place/autocomplete/json'
    let query = `input=${city}&types=(cities)`
    let url = `https://${domain}/${path}?${query}&key=${GOOGLE_PLACES_KEY}`

    const request = axios.get(url);

    return {
        type: AUTOCOMPLETE,
        payload: request
    }
}