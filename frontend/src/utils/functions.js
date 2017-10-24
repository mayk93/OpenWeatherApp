/**
 * Created by michael on 22/10/2017.
 */

/* Lodash */
import _ from 'lodash';

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
}

export let first_recommended_city = (predictions) => {
    if (predictions.length === 0) {
        return 'a city'
    } else {
        return predictions[0].description
    }
}

export let convert = (data, conversion) => {
    return _.map(data, conversion)
}