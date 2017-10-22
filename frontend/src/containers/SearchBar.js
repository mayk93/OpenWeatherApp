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

/* Mine */
import AutocompleteList from '../containers/AutocompleteList';

/* Inline styles */
import {search_bar_search_style} from '../style/js/SearchBar'

/* Actions */
import {weather_data_request, autocomplete_request, set_current_location} from '../actions'

class SearchBar extends Component {
    constructor (props) {
        super(props)

        this.state = {
            search_city: ''
        };

        this.handle_search_city_input = this.handle_search_city_input.bind(this);
        this.weather_data_request = this.weather_data_request.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.current_location && nextProps.current_location.text && nextProps.current_location.city) {
            if (this.state.search_city !== nextProps.current_location.text) {
                this.setState({search_city: nextProps.current_location.text})
            }
        }
    }

    handle_search_city_input (event) {
        this.props.autocomplete_request(event.target.value)
        if (this.props.current_location.city !== null) {
            this.props.set_current_location({text: event.target.value, city: null, country: null})
        }

        let new_value = event.target.value
        this.setState({
            search_city: new_value
        })
    }

    weather_data_request (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.props.weather_data_request(this.props.current_location.city, this.props.current_location.country)
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
                    style={search_bar_search_style}
                />
                <AutocompleteList />
            </CardActions>
        )
    }
}

function mapStateToProps (state) {
    return {
        autocomplete: state.autocomplete,
        current_location: state.current_location
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({weather_data_request, autocomplete_request, set_current_location}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);