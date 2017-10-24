/**
 * Created by michael on 24/10/2017.
 */

/* React */
import React, {Component} from 'react';

/* Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Material UI */

/* Mine */

/* Inline styles */

/* Lodash */

/* Actions */

class WeatherListNarrowScreen extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>Mobile display coming soon!</div>
        );
    }
}

function mapStateToProps (state) {
    return {};
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(WeatherListNarrowScreen);