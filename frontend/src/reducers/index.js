/**
 * Created by michael on 21/09/2017.
 */

import {combineReducers} from 'redux';
import ReducerWeatherData from './reducer_weather_data';
import ReducerAutocomplete from './reducer_autocomplete';
import ReducerCurrentLocation from './reducer_current_location';

/* Reducers */
const rootReducer = combineReducers({
    weather_data: ReducerWeatherData,
    autocomplete: ReducerAutocomplete,
    current_location: ReducerCurrentLocation
});

export default rootReducer;