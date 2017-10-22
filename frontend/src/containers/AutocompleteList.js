/**
 * Created by michael on 22/10/2017.
 */

/* React */
import React, {Component} from 'react';

/* Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Material UI */
import MenuItem from 'material-ui/MenuItem';

/* Actions */
import {weather_data_request, autocomplete_request, set_current_location, set_autocomplete_locations} from '../actions'

/* Functions */
import {format_location} from '../utils/functions'

class AutocompleteList extends Component {
    constructor (props) {
        super(props)

        this.state = {};
        this.handle_location_selection = this.handle_location_selection.bind(this);
        this.display_autocomplete_locations = this.display_autocomplete_locations.bind(this);
    }

    handle_location_selection (autocomplete_location) {
        this.props.set_current_location(autocomplete_location)
        this.props.set_autocomplete_locations([])
        this.props.weather_data_request(
            format_location(autocomplete_location).city,
            format_location(autocomplete_location).country
        )
    }

    display_autocomplete_locations (autocomplete_location) {
        return (
            <MenuItem value={autocomplete_location} primaryText={autocomplete_location.description}
                      key={autocomplete_location.hash}
                      onClick={() => {this.handle_location_selection(autocomplete_location)}}
            />
        )
    }

    render () {
        return (
            <div>
                {this.props.autocomplete.map(this.display_autocomplete_locations)}
            </div>
        );
    }
}


function mapStateToProps (state) {
    return {
        autocomplete: state.autocomplete
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({weather_data_request, autocomplete_request, set_current_location, set_autocomplete_locations}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(AutocompleteList);
