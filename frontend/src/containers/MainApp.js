/**
 * Created by michael on 22/09/2017.
 */

/* React */
import React, {Component} from 'react';

/* Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Lodash */
import _ from 'lodash'

/* Material UI */
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

/* Inline styles */
import {main_app_card_style, main_app_search_style} from '../style/js/MainApp'

/* Actions */
import {get_city_data} from '../actions'

class MainApp extends Component {
    constructor (props) {
        super(props)

        this.state = {
            search_city: ''
        }

        this._debounced_get_city_data = _.debounce(this.props.get_city_data, 500, {leading: true}).bind(this);
        this.debounced_get_city_data = this.debounced_get_city_data.bind(this)
        this.handle_search_city_input = this.handle_search_city_input.bind(this)
    }

    debounced_get_city_data () {
        this._debounced_get_city_data(this.state.search_city)
    }

    handle_search_city_input (event) {
        let new_value = event.target.value
        this.setState({
            search_city: new_value
        }, this.debounced_get_city_data)
    }

    render () {
        // ToDo: Detect enter and trigger search on enter
        return (
            <Card style={main_app_card_style}>
                <CardHeader
                  title="Search"
                  subtitle="Add weather info about a city!"
                />
                { this.props.weather_data.map((city) => {
                    return <li>{city.name}</li>
                }) }
                <CardActions>
                    <TextField
                        value={this.state.search_city}
                        hintText="Search for a city"
                        onChange={this.handle_search_city_input}
                        onKeyPress={(event) => {console.log('Key press event: ', event)}}

                        style={main_app_search_style}
                    />
                </CardActions>
            </Card>
        )
    }
}

function mapStateToProps (state) {
    return {
        weather_data: state.weather_data
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({get_city_data}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
