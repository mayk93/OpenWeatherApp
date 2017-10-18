/**
 * Created by michael on 18/10/2017.
 */

/* React */
import React from 'react';

/* Material UI */
import {
    TableRowColumn,
} from 'material-ui/Table';
import Chip from 'material-ui/Chip';
import {red100, grey100, blue100} from 'material-ui/styles/colors';

/* Other */
import { Sparklines, SparklinesLine } from 'react-sparklines';

/* Inline styles */
import {weather_chart_chip_style} from '../style/js/WeatherChart';

/* Lodash */
import _ from 'lodash'

let to_material_color = {red100, grey100, blue100};

let average = (data) => {
    return _.round(_.sum(data)/data.length);
};

export default (props) => {
    return (
        <TableRowColumn>
            <Sparklines data={props.data}>
                <SparklinesLine color={props.color} />
            </Sparklines>
            <Chip style={weather_chart_chip_style} backgroundColor={to_material_color[`${props.color}100`]}>
              Average: {average(props.data)}
            </Chip>
        </TableRowColumn>
    );
}