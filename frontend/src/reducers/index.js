/**
 * Created by michael on 21/09/2017.
 */

import {combineReducers} from 'redux';
import ReducerWeatherData from './reducer_weather_data';

/* Reducers */
const rootReducer = combineReducers({
    weather_data: ReducerWeatherData
});

export default rootReducer;