/**
 * Created by michael on 21/09/2017.
 */

import {combineReducers} from 'redux';
import ReducerWeatherData from './reducer_weather_data';
import ReducerRecommendedCity from './reducer_recommended_city'
import ReducerAutocomplete from './reducer_autocomplete'

/* Reducers */
const rootReducer = combineReducers({
    recommended_city: ReducerRecommendedCity,
    weather_data: ReducerWeatherData,
    autocomplete: ReducerAutocomplete
});

export default rootReducer;