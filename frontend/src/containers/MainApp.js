/**
 * Created by michael on 22/09/2017.
 */

/* React */
import React, {Component} from 'react';

/* Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Material UI */
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

/* Mine */
import WeatherList from './WeatherList'

/* Inline styles */
import {main_app_card_style, main_app_search_style} from '../style/js/MainApp'

/* Actions */
import {get_city_data} from '../actions'

/* Lodash */
import _ from 'lodash'

class MainApp extends Component {
    constructor (props) {
        super(props)

        this.state = {
            search_city: '',
            save: false,

            temperature_unit: 'default',
            pressure_unit: 'default',
            humidity: 'default'
        };

        this._debounced_get_city_data = _.debounce(this.props.get_city_data, 500, {leading: true}).bind(this);
        this.debounced_get_city_data = this.debounced_get_city_data.bind(this);
        this.handle_search_city_input = this.handle_search_city_input.bind(this);
        this.trigger_on_enter = this.trigger_on_enter.bind(this);
    }

    debounced_get_city_data () {
        this._debounced_get_city_data(this.state.search_city, this.state.save)
        this.setState({save: false})
    }

    handle_search_city_input (event) {
        let new_value = event.target.value
        this.setState({
            search_city: new_value
        }, this.debounced_get_city_data)
    }

    trigger_on_enter (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.setState({
                save: true
            }, this.debounced_get_city_data)
        }
    }

    render () {
        return (
            <Card style={main_app_card_style}>
                <CardHeader
                  title="Search"
                  subtitle="Add weather info about a city!"
                />
                <CardHeader
                  title={`Looking for  ${this.props.recommended_city}?`}
                />
                <CardActions>
                    <TextField
                        value={this.state.search_city}
                        hintText="Search for a city"
                        onChange={this.handle_search_city_input}
                        onKeyPress={this.trigger_on_enter}
                        style={main_app_search_style}
                    />
                </CardActions>
                <WeatherList>
                </WeatherList>
            </Card>
        )
    }
}

function mapStateToProps (state) {
    return {
        recommended_city: state.recommended_city
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({get_city_data}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(MainApp);