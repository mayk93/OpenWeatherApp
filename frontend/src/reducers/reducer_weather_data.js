/**
 * Created by michael on 25/09/2017.
 */


import {WEATHER_DATA} from '../utils/types';

export default function (state = [], action) {
    switch (action.type) {
        case WEATHER_DATA:
            return [...state, ...action.payload.data];
        default:
            return state;
    }
}