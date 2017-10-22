/**
 * Created by michael on 25/09/2017.
 */

import axios from 'axios';

import {WEATHER_DATA, AUTOCOMPLETE} from '../utils/types'
import {BACKEND_SERVER} from '../utils/constants'


export let weather_data_request = (search_city, search_country) => {
    let url = `${BACKEND_SERVER}/weather_data`

    const request = axios.post(url, {search_city, search_country});

    return {
        type: WEATHER_DATA,
        payload: request
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