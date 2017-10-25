/**
 * Created by michael on 22/10/2017.
 */

/* Lodash */
import _ from 'lodash';

/* Constants */
import {NARROW_SCREEN_WIDTH, BREAKPOINTS} from '../utils/constants'

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

export let convert = (data, conversion) => {
    return _.map(data, conversion)
};

export let average = (data) => {
    return _.round(_.sum(data)/data.length);
};

export let weather_list_compute_name_style = (size) => {
    if (size.width < NARROW_SCREEN_WIDTH) {
        let style = {width: "100px"}
        BREAKPOINTS.map((bp) => {
            if (size.width >= bp.lower && size.width < bp.upper) {
                style = bp.style
            }
        })
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