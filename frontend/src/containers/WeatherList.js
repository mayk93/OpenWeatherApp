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

/* Lodash */
import _ from 'lodash';

let convert = (data, conversion) => {
    return _.map(data, conversion)
}

class WeatherList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selected: []
        };

        this.units = {
            temperature: [
                {name: 'Kelvin', symbol: 'K', value: 'default'},
                {name: 'Celsius', symbol: '°C', value: 'celsius'},
                {name: 'Fahrenheit', symbol: '°F', value: 'fahrenheit'}
            ],
        }

        this.conversions = {
            default: (entry) => {return entry},
            celsius: (entry) => {return entry - 273},
            fahrenheit: (entry) => {return _.round(entry * 9/5 - 459.67)}
        }
    }

    temperature_conversion = (temperature) => {
        return convert(temperature, this.conversions[this.props.temperature_unit])
    }

    pressure_conversion = (temperature) => {
        return convert(temperature, this.conversions[this.props.pressure_unit])
    }

    humidity_conversion = (temperature) => {
        return convert(temperature, this.conversions[this.props.humidity_unit])
    }

    get_symbol = (symbol_type) => {
        let symbol
        this.units[symbol_type].map((entry) => {
            if (entry.value === this.state[`${symbol_type}_unit`]) {
                symbol = entry.symbol
            }
        });
        return symbol
    }

    render_weather = (city) => {
        return (
            <TableRow key={city.name}>
                <TableRowColumn>{city.name}</TableRowColumn>
                <WeatherChart data={this.temperature_conversion(city.temperature)}
                              symbol={this.get_symbol('temperature')}
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
                              name="Humidity"
                              color="blue"
                >
                </WeatherChart>
            </TableRow>
        );
    };

    render () {
        return (
            <Table>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>City Name</TableHeaderColumn>
                        <TableHeaderColumn>Temperature</TableHeaderColumn>
                        <TableHeaderColumn>Pressure</TableHeaderColumn>
                        <TableHeaderColumn>Humidity</TableHeaderColumn>
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