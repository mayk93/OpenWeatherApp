/**
 * Created by michael on 18/10/2017.
 */

/* React */
import React, {Component} from 'react';

/* Material UI */
import {TableRowColumn} from 'material-ui/Table';
import {Card, CardHeader} from 'material-ui/Card';

/* Other */
import { Sparklines, SparklinesLine } from 'react-sparklines';

/* Lodash */
import _ from 'lodash';

let average = (data) => {
    return _.round(_.sum(data)/data.length);
};

class WeatherChart extends Component {
    constructor () {
        super()
        this.state = {}
    }

    render () {
        return (
            <TableRowColumn>
                <Sparklines data={this.props.data}>
                    <SparklinesLine color={this.props.color} />
                </Sparklines>
                <Card>
                    <CardHeader
                      title={this.props.name || `${average(this.props.data)} ${this.props.symbol || ''}`}
                      subtitle={this.props.name ? `${average(this.props.data)} ${this.props.symbol || ''}` : ''}
                    />
                </Card>
            </TableRowColumn>
        );
    }
}

export default WeatherChart