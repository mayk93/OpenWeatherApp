/* React */
import React from 'react';

/* Material UI */
import Card from 'material-ui/Card';

/* Font Awesome */
import FontAwesome from 'react-fontawesome';

/* Inline styles */
import {footer_style} from '../style/js/Footer';

export default (props) => {
    return (
        <div>
            <div style={footer_style}>
                <div style={{flex: 1}}>
                    Hosted on
                    <a href="https://github.com/mayk93/OpenWeatherApp">
                        <FontAwesome
                            name="github"
                            size="2x"
                            style={{marginLeft: "5px"}}
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}