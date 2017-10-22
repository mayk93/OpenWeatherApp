/**
 * Created by michael on 19/10/2017.
 */

/* React */
import React, {Component} from 'react';

/* Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Material UI */
import {CardActions} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

/* Inline styles */
import {main_app_search_style} from '../style/js/MainApp'

/* Actions */
import {weather_data_request, autocomplete_request} from '../actions'

class MainApp extends Component {
    constructor (props) {
        super(props)

        this.state = {
            search_city: ''
        };

        this.handle_search_city_input = this.handle_search_city_input.bind(this);
        this.weather_data_request = this.weather_data_request.bind(this);
    }

    handle_search_city_input (event) {
        this.props.autocomplete_request(event.target.value)

        let new_value = event.target.value
        this.setState({
            search_city: new_value
        })
    }

    handle_location_selection (event) {
        console.log('handle_location_selection event: ', event)
    }

    display_autocomplete_locations (autocomplete_location) {
        return (
            <MenuItem value={autocomplete_location} primaryText={autocomplete_location.description}
                      key={autocomplete_location.hash}
            />
        )
    }

    weather_data_request (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.props.weather_data_request(this.state.search_city, 'us')
        }
    }

    render () {
        return (
            <CardActions>
                <TextField
                    value={this.state.search_city}
                    hintText="Search for a city"
                    onChange={this.handle_search_city_input}
                    onKeyPress={this.weather_data_request}
                    style={main_app_search_style}
                />
                {
                    this.props.autocomplete.length > 0 ?
                        <DropDownMenu value={this.props.autocomplete[0]} onChange={this.handle_location_selection}
                                      openImmediately={true}>
                            {this.props.autocomplete.map(this.display_autocomplete_locations)}
                        </DropDownMenu>
                        :
                        <div></div>
                }
            </CardActions>
        )
    }
}

function mapStateToProps (state) {
    return {
        autocomplete: state.autocomplete
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({weather_data_request, autocomplete_request}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(MainApp);