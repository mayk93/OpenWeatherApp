/**
 * Created by michael on 24/10/2017.
 */

/* React */
import React from 'react';

/* Mine */
import WeatherList_WideScreen from '../containers/WeatherListWideScreen'

import {NARROW_SCREEN_WIDTH} from '../utils/constants'

export default (props) => {
    if (props.screen_width < NARROW_SCREEN_WIDTH) {
        return (
            <div>Mobiles rendering coming soon :)</div>
        )
    } else {
        return (
            <WeatherList_WideScreen/>
        );
    }
}