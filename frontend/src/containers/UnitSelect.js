/**
 * Created by michael on 18/10/2017.
 */

/* React */
import React, {Component} from 'react';

/* Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Material UI */
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/* Inline styles */
import {unit_select_style, unit_select_menu_item_style} from '../style/js/UnitSelect';
/* CSS */
import '../style/css/UnitSelect.css';

/* Functions */
import {compute_width_style} from '../utils/functions'

class UnitStyle extends Component {
    render () {
        if (this.props.mobile) {
                return (
                    <select className="unit_select_mobile" style={
                        compute_width_style(this.props.current_size, 100)
                    }>
                        {
                            this.props.units.map((unit) => {
                                return (
                                    <option key={unit.value}
                                            value={unit.value}
                                    >
                                        {unit.name}
                                    </option>
                                );
                            })
                        }
                    </select>
                );
            } else {
                return (
                    <SelectField floatingLabelText={this.props.name}
                                 value={this.props.unit}
                                 onChange={(event, index, value) => {
                                     this.props.handle_change(event, index, value, this.props.unit_type)}
                                 }
                                 style={unit_select_style}
                                 autoWidth={this.props.auto_width}
                    >
                        {
                            this.props.units.map((unit) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(UnitStyle);