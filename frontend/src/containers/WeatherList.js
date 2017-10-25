/**
 * Created by michael on 24/10/2017.
 */

/* React */
import React, {Component} from 'react';

/* Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Mine */
import WeatherListWideScreen from '../containers/WeatherListWideScreen';
import WeatherListNarrowScreen from '../containers/WeatherListNarrowScreen';

/* Constants */
import {NARROW_SCREEN_WIDTH} from '../utils/constants';

/* Actions */
import { set_size, set_weather_data } from '../actions';

/* Functions */
import {get_current_size, convert} from '../utils/functions';

/* Lodash */
import _ from 'lodash';

class WeatherList extends Component {
    constructor (props) {
        super(props);
        this.state = {};

        this.units = {
            temperature: [
                {name: 'Kelvin', symbol: 'K', value: 'default'},
                {name: 'Celsius', symbol: '°C', value: 'celsius'},
                {name: 'Fahrenheit', symbol: '°F', value: 'fahrenheit'}
            ],
            pressure: [
                {name: 'Hectopascal', symbol: 'hPA', value: 'default'},
                {name: 'Pascal', symbol: 'PA', value: 'pascal'}
            ]
        };

        this.conversions = {
            default: (entry) => {return entry},
            celsius: (entry) => {return entry - 273},
            fahrenheit: (entry) => {return _.round(entry * 9/5 - 459.67)},
            pascal: (entry) => {return _.round(entry * 100)}
        };

        this.default_state = {
            selected: [],
            temperature_unit: 'default',
            pressure_unit: 'default',
            humidity_unit: 'default'
        };

        this.updateDimensions = this.updateDimensions.bind(this);
    }

    /* WeatherList only */
    componentWillMount () {
        this.updateDimensions();
    }

    componentDidMount () {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount () {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions () {
        this.props.set_size(get_current_size());

    }

    /* Shared Functions */
    conversion = (data, conversions, unit) => {
        return convert(data, conversions[unit])
    };

    get_current_unit = (unit_type, units, state) => {
        let unit = null;
        units[unit_type].map((entry) => {
            if (entry.value === state[`${unit_type}_unit`]) {
                unit = entry
            }
            return null
        });
        return unit;
    };

    handle_unit_selection = (event, index, value, unit_type) => {
        let new_state = {};
        new_state[`${unit_type}_unit`] = value;
        return new_state
    };

    remove = (city_hash) => {
        this.props.set_weather_data(this.props.weather_data.filter((city) => {return city.hash !== city_hash}))
    };

    /* Render */
    render () {
        if (this.props.current_size.width < NARROW_SCREEN_WIDTH) {
            return (
                <WeatherListNarrowScreen default_state={this.default_state}
                                         units={this.units}
                                         conversions={this.conversions}

                                         conversion={this.conversion}
                                         get_current_unit={this.get_current_unit}
                                         handle_unit_selection={this.handle_unit_selection}

                                         remove={this.remove}
                />
            )
        } else {
            return (
                <WeatherListWideScreen default_state={this.default_state}
                                       units={this.units}
                                       conversions={this.conversions}

                                       conversion={this.conversion}
                                       get_current_unit={this.get_current_unit}
                                       handle_unit_selection={this.handle_unit_selection}

                                       remove={this.remove}
                />
            );
        }
    }
}

function mapStateToProps (state) {
    return {
        weather_data: state.weather_data,
        current_size: state.current_size
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({set_size, set_weather_data}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherList);