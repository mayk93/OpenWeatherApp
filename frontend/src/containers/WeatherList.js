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

/* Other */
import { Sparklines, SparklinesLine } from 'react-sparklines';

class WeatherList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selected: [],
        };
    }

    is_selected = (index) => {
        return this.state.selected.indexOf(index) !== -1;
    };

    handle_row_selection = (selectedRows) => {
        this.setState({
            selected: selectedRows,
        });
    };

    render_weather = (city, city_index) => {
        return (
            <TableRow selected={this.is_selected(city_index)} key={city.name}>
                <TableRowColumn>{city.name}</TableRowColumn>

                <TableRowColumn>
                    <Sparklines data={city.temperature}>
                        <SparklinesLine color="red" />
                    </Sparklines>
                </TableRowColumn>
                <TableRowColumn>
                    <Sparklines data={city.pressure}>
                        <SparklinesLine color="gray" />
                    </Sparklines>
                </TableRowColumn>
                <TableRowColumn>
                    <Sparklines data={city.humidity}>
                        <SparklinesLine color="blue" />
                    </Sparklines>
                </TableRowColumn>
            </TableRow>
        );
    };

    render () {
        return (
            <Table onRowSelection={this.handle_row_selection}>
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