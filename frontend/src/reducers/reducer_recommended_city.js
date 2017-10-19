/**
 * Created by michael on 26/09/2017.
 */


import {RECOMMENDED_CITY} from '../utils/types';

export default function (state = 'a city', action) {
    switch (action.type) {
        case RECOMMENDED_CITY:
            return action.payload;
        default:
            return state;
    }
}