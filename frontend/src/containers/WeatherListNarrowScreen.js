/**
 * Created by michael on 24/10/2017.
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
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle';
import {Card} from 'material-ui/Card';

/* Mine */
import WeatherChart from './WeatherChart';
import UnitSelect from '../components/UnitSelect';

/* Inline styles */
import {
    weather_list_city_name_container_style,
    weather_list_card_style,
    weather_list_city_name_style,
    weather_data_narrow_weather_chart_style
} from '../style/js/WeatherList'

/* Lodash */
import _ from 'lodash';

/* Actions */
import {set_weather_data} from '../actions'

/* Functions */
import {convert} from '../utils/functions'


class WeatherListNarrowScreen extends Component {
    constructor (props) {
        super(props);

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
    };

    pressure_conversion = (temperature) => {
        return convert(temperature, this.conversions[this.state.pressure_unit])
    };

    humidity_conversion = (temperature) => {
        return convert(temperature, this.conversions[this.state.humidity_unit])
    };

    get_current_unit = (unit_type) => {
        let unit
        this.units[unit_type].map((entry) => {
            if (entry.value === this.state[`${unit_type}_unit`]) {
                unit = entry
            }
            return null
        });
        return unit
    };

    remove = (city_hash) => {
        this.props.set_weather_data(this.props.weather_data.filter((city) => {return city.hash !== city_hash}))
    };

    render_weather = (city) => {
        return (
            <Card key={city.hash} style={weather_list_card_style}>
                <Table>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>
                                <IconButton tooltip="Remove" tooltipPosition="top-right"
                                            onClick={() => {this.remove(city.hash)}}
                                >
                                    <RemoveIcon />
                                </IconButton>
                            </TableHeaderColumn>
                            <TableHeaderColumn>City Name</TableHeaderColumn>
                            <TableRowColumn>
                                <div style={weather_list_city_name_container_style}>
                                    <div style={weather_list_city_name_style}><p>{city.name}</p></div>
                                </div>
                            </TableRowColumn>
                        </TableRow>

                        <TableRow>
                            <TableHeaderColumn>
                                <UnitSelect handle_change={this.handle_unit_selection}
                                            temperature_unit={this.state.temperature_unit}
                                            units={this.units.temperature}
                                            unit_type="temperature"
                                            name="Temperature"
                                />
                                <WeatherChart data={this.temperature_conversion(city.temperature)}
                                              symbol={this.get_current_unit('temperature').symbol}
                                              name="Temperature"
                                              color="red"
                                              style={weather_data_narrow_weather_chart_style}
                                >
                                </WeatherChart>
                            </TableHeaderColumn>
                        </TableRow>

                        <TableRow>
                            <TableHeaderColumn>
                                <UnitSelect handle_change={this.handle_unit_selection}
                                            temperature_unit={this.state.pressure_unit}
                                            units={this.units.pressure}
                                            unit_type="pressure"
                                            name="Pressure"

                                />
                                <WeatherChart data={this.pressure_conversion(city.pressure)}
                                              name="Pressure"
                                              color="gray"
                                              style={weather_data_narrow_weather_chart_style}
                                >
                                </WeatherChart>
                            </TableHeaderColumn>
                        </TableRow>

                        <TableRow>
                            <TableHeaderColumn>
                                <p>Humidity</p>
                                <WeatherChart data={this.humidity_conversion(city.humidity)}
                                              symbol="%"
                                              name="Humidity"
                                              color="blue"
                                              style={weather_data_narrow_weather_chart_style}
                                >
                                </WeatherChart >
                            </TableHeaderColumn>
                        </TableRow>
                    </TableBody>
                </Table>
                <Divider/>
            </Card>
        );
    };

    handle_unit_selection = (event, index, value, unit_type) => {
        let new_state = {}
        new_state[`${unit_type}_unit`] = value
        this.setState(new_state)
    };

    render () {
        return (
            <div>
                { this.props.weather_data.map(this.render_weather) }
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        weather_data: state.weather_data
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({set_weather_data}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherListNarrowScreen);