/**
 * Created by michael on 18/10/2017.
 */

/* React */
import React, {Component} from 'react';

/* Material UI */
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/* Inline styles */
import {unit_select_style} from '../style/js/UnitSelect'

export default (props) => {
    return (
        <SelectField
                  floatingLabelText="Temperature"
                  value={props.temperature_unit}
                  onChange={(event, index, value) => {props.handle_change(event, index, value, props.unit_type)}}
                  style={unit_select_style}
        >
            {
                props.units.map((unit) => {
                    return <MenuItem key={unit.value}
                                     value={unit.value}
                                     primaryText={unit.name} />
                })
            }
        </SelectField>
    );
}