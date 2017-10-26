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
import WeatherChart from './WeatherChart';
import UnitSelect from '../components/UnitSelect';
import { GoogleMapComponent, GoogleMapComponentPropsWide } from '../components/GoogleMapComponent';

/* Inline styles */
import {
    weather_list_city_name_container_style,
    weather_list_remove_icon_div_style,
    weather_list_city_name_style
} from '../style/js/WeatherList'

class WeatherListWideScreen extends Component {
    constructor (props) {
        super(props);

        this.state = props.default_state;

        this.units = props.units;
        this.conversions = props.conversions;

        this.conversion = props.conversion.bind(this);
        this.get_current_unit = props.get_current_unit.bind(this);
        this.handle_unit_selection = props.handle_unit_selection.bind(this);
    }

    render_weather = (city) => {
        return (
            <TableRow key={city.hash}>
                <TableRowColumn>
                    <div style={weather_list_city_name_container_style}>
                        <div style={weather_list_remove_icon_div_style}>
                            <IconButton tooltip="Remove" tooltipPosition="top-right"
                                        onClick={() => {this.props.remove(city.hash)}}
                            >
                                <RemoveIcon />
                            </IconButton>
                        </div>
                        <div style={weather_list_city_name_style}><p>{city.name}</p></div>
                    </div>
                </TableRowColumn>
                <TableRowColumn>
                    <GoogleMapComponent location={city.location}
                                        googleMapURL={GoogleMapComponentPropsWide.googleMapURL}
                                        loadingElement={GoogleMapComponentPropsWide.loadingElement}
                                        containerElement={GoogleMapComponentPropsWide.containerElement}
                                        mapElement={GoogleMapComponentPropsWide.mapElement}
                    />
                </TableRowColumn>
                <WeatherChart data={this.conversion(
                    city.temperature, this.conversions, this.state.temperature_unit
                )}
                              symbol={
                                  this.get_current_unit('temperature', this.units, this.state).symbol
                              }
                              name="Temperature"
                              color="red"
                >
                </WeatherChart>
                <WeatherChart data={this.conversion(
                    city.pressure, this.conversions, this.state.pressure_unit
                )}
                              symbol={
                                  this.get_current_unit('pressure', this.units, this.state).symbol
                              }
                              name="Pressure"
                              color="gray"
                >
                </WeatherChart>
                <WeatherChart data={this.conversion(
                    city.humidity, this.conversions, this.state.humidity_unit
                )}
                              symbol="%"
                              name="Humidity"
                              color="blue"
                >
                </WeatherChart >
            </TableRow>
        );
    };

    render () {
        return (
            <Table>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>City Name</TableHeaderColumn>
                        <TableHeaderColumn>City Location</TableHeaderColumn>
                        <TableHeaderColumn>
                            <UnitSelect handle_change={
                                (event, index, value, unit_type) => {this.setState(this.handle_unit_selection(
                                    event, index, value, unit_type
                                ))}
                            }
                                        unit={this.state.temperature_unit}
                                        units={this.units.temperature}
                                        unit_type="temperature"
                                        name="Temperature"
                            />
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                            <UnitSelect handle_change={
                                (event, index, value, unit_type) => {this.setState(this.handle_unit_selection(
                                    event, index, value, unit_type
                                ))}
                            }
                                        unit={this.state.pressure_unit}
                                        units={this.units.pressure}
                                        unit_type="pressure"
                                        name="Pressure"
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


export default connect(mapStateToProps, mapDispatchToProps)(WeatherListWideScreen);