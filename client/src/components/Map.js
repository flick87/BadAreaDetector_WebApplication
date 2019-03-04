import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { connect } from 'react-redux';

const mapStyles = {
    width: '45%',
    height: '54%'
};

export class MapContainer extends Component{
   
    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
    
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{
                    lat: 32.71573699,
                    lng: -117.16108799
                }}
            >
                

                {this.props.policeCall.map(({ A, M, N }) => {
                    return (
                        <Marker
                            onClick={this.onMarkerClick}
                            name={A}
                            position={{ lat: M, lng: N }}
                        />)
                })}
 
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                </div>
                </InfoWindow>
            </Map>
        );
    }
}


const Mcontainer = GoogleApiWrapper({
    apiKey: ''
})(MapContainer);

const mapStateToProps = (state) => ({
    policeCall: state.policeCall.policeCall
});

export default connect(mapStateToProps)(Mcontainer);