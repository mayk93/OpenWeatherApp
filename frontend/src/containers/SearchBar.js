/**
 * Created by michael on 19/10/2017.
 */

/* React */
import React, {Component} from 'react'

/* Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Material UI */
import TextField from 'material-ui/TextField';

/* Other */
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

/* Inline styles */
import {main_app_search_style} from '../style/js/MainApp'

/* Actions */
import {set_recommended_city} from '../actions'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address: '',
            geocodeResults: null,
            loading: false
        }
        this.handle_location_selection = this.handle_location_selection.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this)
        this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this)
    }

    handle_location_selection(address) {
        this.setState({
            address,
            loading: true
        })

        geocodeByAddress(address)
            .then((results) => {
            console.log('Initial results: ', results)
                getLatLng(results[0])
            })
            .then(({lat, lng}) => {
                console.log('Success Yay', {lat, lng})
                this.setState({
                    geocodeResults: this.renderGeocodeSuccess(lat, lng),
                    loading: false
                })
            })
            .catch((error) => {
                console.log('Oh no!', error)
                this.setState({
                    geocodeResults: this.renderGeocodeFailure(error),
                    loading: false
                })
            })

        /* NOTE: Using callback (Deprecated version) */
        // geocodeByAddress(address,  (err, { lat, lng }) => {
        //   if (err) {
        //     console.log('Oh no!', err)
        //     this.setState({
        //       geocodeResults: this.renderGeocodeFailure(err),
        //       loading: false
        //     })
        //   }
        //   console.log(`Yay! got latitude and longitude for ${address}`, { lat, lng })
        //   this.setState({
        //     geocodeResults: this.renderGeocodeSuccess(lat, lng),
        //     loading: false
        //   })
        // })
    }

    handleChange(address) {
        console.log('handleChange address: ', address)
        this.setState({
            address,
            geocodeResults: null
        }, () => {
            this.props.set_recommended_city(address)
        })
    }

    renderGeocodeFailure(err) {
        return (
            <div className="alert alert-danger" role="alert">
                <strong>Error!</strong> {err}
            </div>
        )
    }

    renderGeocodeSuccess(lat, lng) {
        return (
            <div className="alert alert-success" role="alert">
                <strong>Success!</strong> Geocoder found latitude and longitude: <strong>{lat}, {lng}</strong>
            </div>
        )
    }

    render() {
        // const cssClasses = {
        //     root: 'form-group',
        //     input: 'Demo__search-input',
        //     autocompleteContainer: 'Demo__autocomplete-container',
        // }

        const autocompletion_item = (autocomplete) => {
            let formattedSuggestion = autocomplete.formattedSuggestion
            return (
                <div className="Demo__suggestion-item">
                    <i className='fa fa-map-marker Demo__suggestion-icon'/>
                    <strong>{formattedSuggestion.mainText}</strong>{' '}
                    <small className="text-muted">{formattedSuggestion.secondaryText}</small>
                </div>
            );
        }

        const inputProps = {
            type: "text",
            value: this.state.address,
            onChange: this.handleChange,
            onBlur: () => {
                console.log('Blur event!');
            },
            onFocus: () => {
                console.log('Focused!');
            },
            autoFocus: true,
            placeholder: "Search Places",
            name: 'Demo__input',
            id: "my-input-id",
        }

        // classNames={cssClasses}
        return (
            <div>
                <div>
                    <PlacesAutocomplete
                        onSelect={this.handle_location_selection}
                        autocompleteItem={autocompletion_item}
                        onEnterKeyDown={this.handle_location_selection}
                        inputProps={inputProps}
                    />
                    {
                        this.state.loading ?
                        <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner"/></div> : null
                    }
                    {
                        !this.state.loading && this.state.geocodeResults ?
                        <div className='geocoding-results'>{this.state.geocodeResults}</div> : null
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {};
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({set_recommended_city}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);