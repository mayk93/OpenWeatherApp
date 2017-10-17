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

    render () {
        return (
            <Table onRowSelection={this.handle_row_selection}>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>City Name</TableHeaderColumn>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        this.props.weather_data.map((city, city_index) => {
                            return (
                                <TableRow selected={this.is_selected(city_index)} key={city.name}>
                                    <TableRowColumn>{city.name}</TableRowColumn>
                                </TableRow>
                            );
                        })
                    }
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