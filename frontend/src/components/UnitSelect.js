/**
 * Created by michael on 18/10/2017.
 */

/* React */
import React from 'react';

/* Material UI */
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/* Inline styles */
import {unit_select_style, unit_select_menu_item_style} from '../style/js/UnitSelect';

export default (props) => {
    return (
        <SelectField floatingLabelText={props.name}
                     value={props.unit}
                     onChange={(event, index, value) => {props.handle_change(event, index, value, props.unit_type)}}
                     style={unit_select_style}
                     autoWidth={props.auto_width}
        >
            {
                props.units.map((unit) => {
                    return (
                        <MenuItem key={unit.value}
                                  value={unit.value}
                                  primaryText={unit.name}
                                  style={unit_select_menu_item_style}
                        />
                    );
                })
            }
        </SelectField>
    );
}