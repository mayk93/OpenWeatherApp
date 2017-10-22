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