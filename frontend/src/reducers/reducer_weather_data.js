/**
 * Created by michael on 25/09/2017.
 */


import {WEATHER_DATA} from '../utils/types';

let set_city_data = (data) => {
    let temperature = [];
    let pressure = [];
    let humidity = [];
    data.list.map((entry) => {
        temperature = [...temperature, entry.main.temp]
        pressure = [...temperature, entry.main.pressure]
        humidity = [...temperature, entry.main.humidity]
        return null;
    })
    return Object.assign(data.city, {temperature, pressure, humidity})
};

export default function (state = [], action) {
    switch (action.type) {
        case WEATHER_DATA:
            return [...state, set_city_data(action.payload.data)];
        default:
            return state;
    }
}