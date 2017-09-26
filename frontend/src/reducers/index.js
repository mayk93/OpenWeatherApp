/**
 * Created by michael on 21/09/2017.
 */

import {combineReducers} from 'redux';
import ReducerWeatherData from './reducer_weather_data';
import ReducerRecommendedCity from './reducer_recommended_city'

/* Reducers */
const rootReducer = combineReducers({
    recommended_city: ReducerRecommendedCity,
    weather_data: ReducerWeatherData
});

export default rootReducer;