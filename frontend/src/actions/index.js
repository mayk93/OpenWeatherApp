/**
 * Created by michael on 25/09/2017.
 */

import axios from 'axios';

import {WEATHER_DATA, SET_WEATHER_DATA, AUTOCOMPLETE, CURRENT_LOCATION} from '../utils/types'
import {BACKEND_SERVER} from '../utils/constants'


/* Requests */
export let weather_data_request = (search_city, search_country) => {
    if (search_city && search_country) {
        let url = `${BACKEND_SERVER}/weather_data`

        const request = axios.post(url, {search_city, search_country});

        return {
            type: WEATHER_DATA,
            payload: request
        }
    }
    return {
        type: WEATHER_DATA,
        payload: {data: []}
    }
}

export let autocomplete_request = (current_input) => {
    let url = `${BACKEND_SERVER}/autocomplete`

    const request = axios.post(url, {current_input});

    return {
        type: AUTOCOMPLETE,
        payload: request
    }
}


/* Setters */
export let set_current_location = (location) => {
    return {
        type: CURRENT_LOCATION,
        payload: location
    }
}

export let set_autocomplete_locations = (locations) => {
    return {
        type: AUTOCOMPLETE,
        payload: {data: locations}
    }
}

export let set_weather_data = (weather_data) => {
    return {
        type: SET_WEATHER_DATA,
        payload: {data: weather_data}
    }
}