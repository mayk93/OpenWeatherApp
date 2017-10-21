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
import {get_city_data, autocomplete_request} from '../actions'

/* Lodash */
import _ from 'lodash'

class MainApp extends Component {
    constructor (props) {
        super(props)

        this.state = {
            search_city: ''
        };

        this._debounced_get_city_data = _.debounce(this.props.get_city_data, 500, {leading: true}).bind(this);
        this.debounced_get_city_data = this.debounced_get_city_data.bind(this);
        this.handle_search_city_input = this.handle_search_city_input.bind(this);
        this.trigger_on_enter = this.trigger_on_enter.bind(this);
    }

    debounced_get_city_data () {
        this._debounced_get_city_data(this.state.search_city)
    }

    handle_search_city_input (event) {
        this.props.autocomplete_request(event.target.value)

        let new_value = event.target.value
        this.setState({
            search_city: new_value
        })
    }

    trigger_on_enter (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.debounced_get_city_data()
        }
    }

    render () {
        return (
            <CardActions>
                <TextField
                    value={this.state.search_city}
                    hintText="Search for a city"
                    onChange={this.handle_search_city_input}
                    onKeyPress={this.trigger_on_enter}
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
    return bindActionCreators({get_city_data, autocomplete_request}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(MainApp);