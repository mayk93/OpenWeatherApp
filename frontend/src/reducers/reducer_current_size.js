/**
 * Created by michael on 25/10/2017.
 */

import {SIZE} from '../utils/types';

/* Functions */
import {get_current_size} from '../utils/functions'

export default function (state = get_current_size(), action) {
    switch (action.type) {
        case SIZE:
            return action.payload;
        default:
            return state;
    }
}