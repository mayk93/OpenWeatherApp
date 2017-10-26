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
import AutoComplete from 'material-ui/AutoComplete';

/* Actions */
import { weather_data_request, autocomplete_request } from '../actions';

/* Functions */
import { get_location, format_location } from '../utils/functions';

class SearchBar extends Component {
    constructor (props) {
        super(props);

        this.state = {};

        this.handle_search_city_input = this.handle_search_city_input.bind(this);
        this.weather_data_request = this.weather_data_request.bind(this);
    }

    handle_search_city_input (city_name) {
        this.props.autocomplete_request(city_name);
    }

    weather_data_request (city_name) {
        let location = get_location(this.props.autocomplete, city_name);
        let formatted_location = format_location(location);
        this.props.weather_data_request(formatted_location.city, formatted_location.country)
    }

    render () {
        return (
            <CardActions>
                <AutoComplete
                  hintText="Choose a city"
                  dataSource={this.props.autocomplete.map((ac) => {return ac.description})}
                  onUpdateInput={this.handle_search_city_input}
                  onNewRequest={this.weather_data_request}
                  floatingLabelText="Search for a city"
                  fullWidth={true}
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


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);