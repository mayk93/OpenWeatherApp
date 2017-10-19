/**
 * Created by michael on 22/09/2017.
 */

/* React */
import React, {Component} from 'react';

/* Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Material UI */
import {Card, CardHeader} from 'material-ui/Card';

/* Mine */
import WeatherList from './WeatherList'
import SearchBar from './SearchBar'

/* Inline styles */
import {main_app_card_style} from '../style/js/MainApp'

class MainApp extends Component {
    constructor (props) {
        super(props)

        this.state = {};
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
                <SearchBar />
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
    return bindActionCreators({}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(MainApp);