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

/* Inline styles */
import {main_app_card_style, main_app_search_style} from '../style/js/MainApp'

class MainApp extends Component {
    constructor (props) {
        super(props)

        this.state = {
            search_city: ''
        }

        this.handle_search_city_input = this.handle_search_city_input.bind(this)
    }

    handle_search_city_input (event) {
        let new_value = event.target.value
        this.setState({
            search_city: new_value
        })
    }

    render () {
        console.log(main_app_card_style)
        return (
            <Card style={main_app_card_style}>
                <CardHeader
                  title="Search"
                  subtitle="Add weather info about a city!"
                />
                <CardActions>
                    <TextField
                        value={this.state.search_city}
                        hintText="Search for a city"
                        onChange={this.handle_search_city_input}

                        style={main_app_search_style}
                    />
                </CardActions>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
        api_keys: state.api_keys
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
