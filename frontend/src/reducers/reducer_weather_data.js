/**
 * Created by michael on 25/09/2017.
 */


import {WEATHER_DATA, SET_WEATHER_DATA} from '../utils/types';

let filter_existing_cities = (city, existing_state) => {
    let filtered_city = city
    existing_state.map((existing_city) => {
        if (existing_city.hash === city.hash) {
            filtered_city = null
        }
        return null
    });
    return filtered_city
}

export default function (state = [], action) {
    switch (action.type) {
        case WEATHER_DATA:
            let received_data = action.payload.data.map((city) => {return filter_existing_cities(city, state)});
            received_data = received_data.filter((city) => {return city !== null});

            return [...state, ...received_data];
        case SET_WEATHER_DATA:
            return action.payload.data
        default:
            return state;
    }
}