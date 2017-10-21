/**
 * Created by michael on 19/10/2017.
 */

import {AUTOCOMPLETE} from '../utils/types';


export default function (state = [], action) {
    switch (action.type) {
        case AUTOCOMPLETE:
            return action.payload.data;
        default:
            return state;
    }
}