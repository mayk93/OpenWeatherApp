/**
 * Created by michael on 24/10/2017.
 */

/* React */
import React, {Component} from 'react';

/* Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Mine */
import WeatherListWideScreen from '../containers/WeatherListWideScreen'
import WeatherListNarrowScreen from '../containers/WeatherListNarrowScreen'

/* Constants */
import {NARROW_SCREEN_WIDTH} from '../utils/constants'

/* Actions */
import { set_size } from '../actions'

/* Functions */
import {get_current_size} from '../utils/functions'

class WeatherList extends Component {
    constructor (props) {
        super(props);
        this.state = {};

        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentWillMount () {
        this.updateDimensions();
    }

    componentDidMount () {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount () {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions () {
        this.props.set_size(get_current_size());

    }

    render () {
        if (this.props.current_size.width < NARROW_SCREEN_WIDTH) {
            return (
                <WeatherListNarrowScreen/>
            )
        } else {
            return (
                <WeatherListWideScreen/>
            );
        }
    }
}

function mapStateToProps (state) {
    return {
        current_size: state.current_size
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({set_size}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherList);