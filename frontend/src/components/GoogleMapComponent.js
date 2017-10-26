/**
 * Created by michael on 26/10/2017.
 */

/* React */
import React from 'react';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

let url = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places";

export let GoogleMapComponentPropsWide = {
    googleMapURL: url,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100px` }} />,
    mapElement: <div style={{ height: `100%` }} />
};

export let GoogleMapComponentPropsNarrow = {
    googleMapURL: url,
    loadingElement: <div id="le" style={{ height: `100%` }} />,
    containerElement: <div id="ce" style={{ paddingLeft: '100%', width: '100%', height: `100px` }} />,
    mapElement: <div id="me" style={{ height: `100%` }} />
};

export let GoogleMapComponent = withScriptjs(
    withGoogleMap((props) => {
        return (
            <GoogleMap defaultZoom={8}
                       defaultCenter={props.location}
            >
                <Marker position={props.location} />
            </GoogleMap>
        );
    })
);

