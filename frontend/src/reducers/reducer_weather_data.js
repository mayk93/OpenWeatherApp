/**
 * Created by michael on 25/09/2017.
 */


import {WEATHER_DATA} from '../utils/types';

export default function (state = [], action) {
    switch (action.type) {
        case WEATHER_DATA:
            console.log('Reducer weather action: ', action);
            console.log('Reducer weather data payload: ', action.payload.data.city);
            return [...state, action.payload.data.city];
        default:
            return state;
    }
}