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
import { GoogleMapComponent, GoogleMapComponentPropsNarrow } from '../components/GoogleMapComponent';

/* Inline styles */
import {
    weather_list_city_name_container_style,
    weather_list_card_style,
    weather_list_city_name_style,
    weather_list_data_narrow_weather_chart_style,
    weather_list_container_style_black,
    weather_list_container_style_white
} from '../style/js/WeatherList'


class WeatherListNarrowScreen extends Component {
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
            <Card key={city.hash} style={weather_list_card_style}>
                <Table>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>
                                <IconButton tooltip="Remove" tooltipPosition="top-right"
                                            onClick={() => {this.props.remove(city.hash)}}
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
                            <GoogleMapComponent location={city.location}
                                                googleMapURL={GoogleMapComponentPropsNarrow.googleMapURL}
                                                loadingElement={GoogleMapComponentPropsNarrow.loadingElement}
                                                containerElement={GoogleMapComponentPropsNarrow.containerElement}
                                                mapElement={GoogleMapComponentPropsNarrow.mapElement}
                            />
                        </TableRow>

                        <TableRow>
                            <TableHeaderColumn>
                                <UnitSelect handle_change={
                                    (event, index, value, unit_type) => {this.setState(this.handle_unit_selection(
                                        event, index, value, unit_type
                                    ))}
                                }
                                            temperature_unit={this.state.temperature_unit}
                                            units={this.units.temperature}
                                            unit_type="temperature"
                                            name="Temperature"
                                            auto_width={true}
                                            mobile={true}
                                />
                                <WeatherChart data={this.conversion(
                                    city.temperature, this.conversions, this.state.temperature_unit
                                )}
                                              symbol={
                                                  this.get_current_unit('temperature', this.units, this.state).symbol
                                              }
                                              name="Temperature"
                                              color="red"
                                              style={weather_list_data_narrow_weather_chart_style}
                                >
                                </WeatherChart>
                            </TableHeaderColumn>
                        </TableRow>

                        <TableRow>
                            <TableHeaderColumn>
                                <UnitSelect handle_change={
                                    (event, index, value, unit_type) => {this.setState(this.handle_unit_selection(
                                        event, index, value, unit_type
                                    ))}
                                }
                                            temperature_unit={this.state.pressure_unit}
                                            units={this.units.pressure}
                                            unit_type="pressure"
                                            name="Pressure"
                                            auto_width={true}
                                            mobile={true}

                                />
                                <WeatherChart data={this.conversion(
                                    city.pressure, this.conversions, this.state.pressure_unit
                                )}
                                              symbol={
                                                  this.get_current_unit('pressure', this.units, this.state).symbol
                                              }
                                              name="Pressure"
                                              color="gray"
                                              style={weather_list_data_narrow_weather_chart_style}
                                >
                                </WeatherChart>
                            </TableHeaderColumn>
                        </TableRow>

                        <TableRow>
                            <TableHeaderColumn>
                                <p>Humidity</p>
                                <WeatherChart data={this.conversion(
                                    city.humidity, this.conversions, this.state.humidity_unit
                                )}
                                              symbol="%"
                                              name="Humidity"
                                              color="blue"
                                              style={weather_list_data_narrow_weather_chart_style}
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

    render () {
        return (
            <div style={
                this.props.weather_data.length > 0 ?
                    weather_list_container_style_black
                    :
                    weather_list_container_style_white
                }
            >
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
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherListNarrowScreen);