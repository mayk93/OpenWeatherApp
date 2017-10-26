/**
 * Created by michael on 22/10/2017.
 */

/* Lodash */
import _ from 'lodash';

/* Constants */
import {NARROW_SCREEN_WIDTH, BREAKPOINTS, CITIES_EXAMPLE} from '../utils/constants'

export let format_location = (location) => {
    try {
        return {
            text: location.description,
            city: location.terms[0].value,
            country: location.terms.length > 1 ? location.terms[location.terms.length - 1].value : 'uk'
        }
    } catch (e) {
        return {
            text: location && location.text ? location.text : '',
            city: null,
            country: null
        }
    }
};

export let first_recommended_city = (predictions) => {
    if (predictions.length === 0) {
        return 'a city'
    } else {
        return predictions[0].description
    }
};

export let filter_existing_cities = (city, existing_state) => {
    let filtered_city = city;
    existing_state.map((existing_city) => {
        if (existing_city.hash === city.hash) {
            filtered_city = null
        }
        return null
    });
    return filtered_city
};

export let convert = (data, conversion) => {
    return _.map(data, conversion)
};

export let average = (data) => {
    return _.round(_.sum(data)/data.length);
};

export let weather_list_compute_name_style = (size) => {
    if (size.width < NARROW_SCREEN_WIDTH) {
        let style = {width: "100px"};
        BREAKPOINTS.map((bp) => {
            if (size.width >= bp.lower && size.width < bp.upper) {
                style = bp.style
            }
            return null;
        });
        return style
    }
    return {}
};

export let get_current_size = () => {
    let w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
        height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

    return {width, height}
};

export let get_location = (locations, name) => {
    let location = null;

    locations.map((loc) => {
        if (loc.description === name) {
            location = loc;
        }
        return null;
    });

    return location;
};

export let random_city = () => {
    let random_index = Math.floor(Math.random()* CITIES_EXAMPLE.length);

    return `${CITIES_EXAMPLE[random_index]}?`;
};