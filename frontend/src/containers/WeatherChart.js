/**
 * Created by michael on 18/10/2017.
 */

/* React */
import React, {Component} from 'react';

/* Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Material UI */
import {TableRowColumn} from 'material-ui/Table';
import {Card, CardHeader} from 'material-ui/Card';

/* Other */
import { Sparklines, SparklinesLine } from 'react-sparklines';

/* Inline styles */
import {weather_chart_subtitle_style} from '../style/js/WeatherChart'

/* Functions */
import {average, weather_list_compute_name_style} from '../utils/functions'

class WeatherChart extends Component {
    constructor () {
        super();
        this.state = {}
    }

    render () {
        return (
            <TableRowColumn style={this.props.style ? this.props.style : {}}>
                <Sparklines data={this.props.data}>
                    <SparklinesLine color={this.props.color} />
                </Sparklines>
                <Card>
                    <CardHeader
                      title={this.props.name || `${average(this.props.data)} ${this.props.symbol || ''}`}
                      subtitle={this.props.name ? `${average(this.props.data)} ${this.props.symbol || ''}` : ''}
                      titleStyle={weather_list_compute_name_style(this.props.current_size)}
                      subtitleStyle={weather_chart_subtitle_style}
                    />
                </Card>
            </TableRowColumn>
        );
    }
}

function mapStateToProps (state) {
    return {
        current_size: state.current_size
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherChart);