/**
 * Created by michael on 22/10/2017.
 */

import {CURRENT_LOCATION} from '../utils/types';

/* Functions */
import {format_location} from '../utils/functions'

export default function (state = {text: null, city: null, country: null}, action) {
    switch (action.type) {
        case CURRENT_LOCATION:
            return format_location(action.payload);
        default:
            return state;
    }
}