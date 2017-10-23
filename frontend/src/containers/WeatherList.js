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
import IconButton from 'material-ui/IconButton';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle';

/* Mine */
import WeatherChart from '../components/WeatherChart';
import UnitSelect from '../components/UnitSelect';

/* Inline styles */
import {
    weather_list_city_name_container_style,
    weather_list_remove_icon_div_style,
    weather_list_city_name_style
} from '../style/js/WeatherList'

/* Lodash */
import _ from 'lodash';

/* Actions */
import {set_weather_data} from '../actions'

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
            return null
        });
        return unit
    }

    remove = (city_hash) => {
        this.props.set_weather_data(this.props.weather_data.filter((city) => {return city.hash !== city_hash}))
    }

    render_weather = (city) => {
        return (
            <TableRow key={city.hash}>
                <TableRowColumn>
                    <div style={weather_list_city_name_container_style}>
                        <div style={weather_list_remove_icon_div_style}>
                            <IconButton tooltip="Remove" tooltipPosition="top-right"
                                        onClick={() => {this.remove(city.hash)}}
                            >
                                <RemoveIcon />
                            </IconButton>
                        </div>
                        <div style={weather_list_city_name_style}><p>{city.name}</p></div>
                    </div>
                </TableRowColumn>
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
                </WeatherChart >
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
    return bindActionCreators({set_weather_data}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(WeatherList);