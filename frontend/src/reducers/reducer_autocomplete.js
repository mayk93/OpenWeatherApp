/**
 * Created by michael on 19/10/2017.
 */

import {AUTOCOMPLETE} from '../utils/types';


export default function (state = [], action) {
    switch (action.type) {
        case AUTOCOMPLETE:
            console.log('This is the action payload for AUTOCOMPLETE: ', action.payload)
            return [];
        default:
            return state;
    }
}