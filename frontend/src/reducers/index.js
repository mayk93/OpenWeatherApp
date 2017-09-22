/**
 * Created by michael on 21/09/2017.
 */

import {combineReducers} from 'redux';
import ReducerAPIKeys from './reducer_api_keys'

/* Reducers */
const rootReducer = combineReducers({
    api_keys: ReducerAPIKeys
});

export default rootReducer;