/**
 * Created by michael on 17/10/2017.
 */

/* React */
import React, {Component} from 'react';

/* Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Material UI */
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

/* Mine */
import WeatherChart from '../components/WeatherChart';
import UnitSelect from '../components/UnitSelect';

/* Lodash */
import _ from 'lodash';

let convert = (data, conversion) => {
    return _.map(data, conversion)
}

class WeatherList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selected: [],
            temperature_unit: 'default',
            pressure_unit: 'default',
            humidity_unit: 'default'
        };

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
        }

        this.conversions = {
            default: (entry) => {return entry},
            celsius: (entry) => {return entry - 273},
            fahrenheit: (entry) => {return _.round(entry * 9/5 - 459.67)},
            pascal: (entry) => {return _.round(entry * 100)}
        }
    }

    temperature_conversion = (temperature) => {
        return convert(temperature, this.conversions[this.state.temperature_unit])
    }

    pressure_conversion = (temperature) => {
        return convert(temperature, this.conversions[this.state.pressure_unit])
    }

    humidity_conversion = (temperature) => {
        return convert(temperature, this.conversions[this.state.humidity_unit])
    }

    get_current_unit = (unit_type) => {
        let unit
        this.units[unit_type].map((entry) => {
            if (entry.value === this.state[`${unit_type}_unit`]) {
                unit = entry
            }
        });
        return unit
    }

    render_weather = (city) => {
        return (
            <TableRow key={city.name}>
                <TableRowColumn>{city.name}</TableRowColumn>
                <WeatherChart data={this.temperature_conversion(city.temperature)}
                              symbol={this.get_current_unit('temperature').symbol}
                              name="Temperature"
                              color="red"
                >
                </WeatherChart>
                <WeatherChart data={this.pressure_conversion(city.pressure)}
                              name="Pressure"
                              color="gray"
                >
                </WeatherChart>
                <WeatherChart data={this.humidity_conversion(city.humidity)}
                              symbol="%"
                              name="Humidity"
                              color="blue"
                >
                </WeatherChart>
            </TableRow>
        );
    };

    handle_unit_selection = (event, index, value, unit_type) => {
        let new_state = {}
        new_state[`${unit_type}_unit`] = value
        this.setState(new_state)
    }

    render () {
        return (
            <Table>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>City Name</TableHeaderColumn>
                        <TableHeaderColumn>
                            <UnitSelect handle_change={this.handle_unit_selection}
                                        temperature_unit={this.state.temperature_unit}
                                        units={this.units.temperature}
                                        unit_type="temperature"
                            />
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                            <UnitSelect handle_change={this.handle_unit_selection}
                                        temperature_unit={this.state.pressure_unit}
                                        units={this.units.pressure}
                                        unit_type="pressure"
                            />
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                            Humidity
                        </TableHeaderColumn>
                    </TableRow>
                </TableHeader>

                <TableBody displayRowCheckbox={false}>
                    { this.props.weather_data.map(this.render_weather) }
                </TableBody>
            </Table>
        );
    }
}

function mapStateToProps (state) {
    return {
        weather_data: state.weather_data
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(WeatherList);