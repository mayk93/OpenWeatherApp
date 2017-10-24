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

import {NARROW_SCREEN_WIDTH} from '../utils/constants'

class WeatherList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        };

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
        let w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
            height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

        this.setState({width: width, height: height});
    }

    render () {
        if (this.state.width < NARROW_SCREEN_WIDTH) {
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
    return {};
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherList);