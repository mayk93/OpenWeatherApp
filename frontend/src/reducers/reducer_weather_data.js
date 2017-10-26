/**
 * Created by michael on 25/09/2017.
 */


import {WEATHER_DATA, SET_WEATHER_DATA} from '../utils/types';

/* Functions */
import {filter_existing_cities} from '../utils/functions'

export default function (state = [], action) {
    switch (action.type) {
        case WEATHER_DATA:
            let received_data = action.payload.data.map((city) => {return filter_existing_cities(city, state)});
            received_data = received_data.filter((city) => {return city !== null});
            return [...state, ...received_data];
        case SET_WEATHER_DATA:
            return action.payload.data;
        default:
            return state;
    }
};