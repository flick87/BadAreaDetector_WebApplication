import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker, HeatMap } from 'google-maps-react';
import { connect } from 'react-redux';
import { setTimeout } from 'timers';

const mapStyles = {
    width: '45%',
    height: '56.5%'
};
const h4style = {
    color: "black"
};

var simulateOnce = true;
var addCall = 0;
var mapVal = 0;
var isLocation = false;
var locationOnce = 0; //Variable to prevent rerendering due to initial rendering statements

export class MapContainer extends Component {

    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {},
        isHeatVisible: true,
        isMarkerVisible: true,       //Shows the infoWindow to the selected place upon a marker
        LocationLat: 0,
        LocationLong: 0
    };
    handleToggle1 = () => {
        this.setState({ isMarkerVisible: !this.state.isMarkerVisible })
    }
    handleToggle = () => {
        this.setState({ isHeatVisible: !this.state.isHeatVisible });
    }
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

    decisionURL = L => {
        let imageURL = "";
        
        if (L === "1") {
            imageURL = "http://maps.google.com/mapfiles/ms/icons/purple-dot.png";
        } else if (L === "2") {
            imageURL = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
        } else if (L === "3") {
            imageURL = "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";
        } else if (L === "4") {
            imageURL = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
        } else {
            imageURL = "http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_gray.png"; //Temp while we wait to remove `No call types`
        }
        return imageURL;
    };

    simulate(obj, refresh, length) {
        setTimeout(() => {
            if (this.props.toggle && this.props.refresh === refresh && (this.props.filteredCalls === null ? this.props.policeCall.length === length : this.props.filteredCalls.length === length)) {
                if (addCall < length - 1) {
                    ++addCall;
                    mapVal = 0;
                    this.forceUpdate();
                    this.simulate(obj, refresh, length);
                }
                else {
                    simulateOnce = true;
                }
            }
            else {
                if (this.props.toggle) { //case: Simulation is continuing, but user changes data
                    addCall = 0
                    this.forceUpdate()
                    this.simulate(this.props.filteredCalls == null ? this.props.policeCall : this.props.filteredCalls, this.props.refresh, this.props.filteredCalls == null ? this.props.policeCall.length : this.props.filteredCalls.length)
                }
                else {
                    //console.log('Simulation Finished!')
                }
            }
        }, this.props.refresh * 1000)
    }

    showPosition = (position) => {
        var temp1 = position.coords.latitude
        var temp2 = position.coords.longitude
        this.setState({ LocationLat: temp1, LocationLong: temp2 }) 
    }

    render() {

        const gradient = [
            "rgba(0, 255, 255, 0)",
            "rgba(0, 255, 255, 1)",
            "rgba(0, 191, 255, 1)",
            "rgba(0, 127, 255, 1)",
            "rgba(0, 63, 255, 1)",
            "rgba(0, 0, 255, 1)",
            "rgba(0, 0, 223, 1)",
            "rgba(0, 0, 191, 1)",
            "rgba(0, 0, 159, 1)",
            "rgba(0, 0, 127, 1)",
            "rgba(63, 0, 91, 1)",
            "rgba(127, 0, 63, 1)",
            "rgba(191, 0, 31, 1)",
            "rgba(255, 0, 0, 1)"
        ];

        //Implement User Marker
        if (navigator.geolocation && locationOnce <= 2) {
            isLocation = true
            navigator.geolocation.getCurrentPosition(this.showPosition)
        }


        //Implement Simulation
        if (this.props.toggle && simulateOnce) {
            simulateOnce = false;
            this.simulate(this.props.filteredCalls == null ? this.props.policeCall : this.props.filteredCalls, this.props.refresh, this.props.filteredCalls == null ? this.props.policeCall.length : this.props.filteredCalls.length);
        }
        else if (!this.props.toggle) {
            simulateOnce = true;
            addCall = 0;
        }

        mapVal = 0

        return (
            <div>
                <div className="floating-panel">
                    <button onClick={this.handleToggle}>HeatMap</button>
                    <button onClick={this.handleToggle1}>Markers</button>
                </div>
                <div className="map-container">

                    <Map
                        google={this.props.google}
                        zoom={13}
                        style={mapStyles}
                        scrollwheel={true}
                        initialCenter={{
                            lat: 32.71573699,
                            lng: -117.16108799
                        }}
                    >

                        {isLocation ? (
                            ++locationOnce,
                            <Marker
                                icon={{ url: "http://img.icons8.com/dusk/24/000000/street-view.png" }}
                                name={'Your position'}
                                position={{ lat: this.state.LocationLat, lng: this.state.LocationLong }}
                            />
                        )
                            : ++locationOnce
                        }


                        {this.state.isMarkerVisible ? (
                            this.props.toggle ? (
                                this.props.filteredCalls == null ? (
                                    this.props.policeCall.map(({ A, B, M, N, L, I }) => {
                                        return (
                                            mapVal < addCall ? (
                                                ++mapVal,
                                                <Marker
                                                    onClick={this.onMarkerClick}
                                                    icon={{ url: this.decisionURL(L) }}
                                                    name={A}
                                                    info={B}
                                                    priority={L}
                                                    position={{ lat: M, lng: N }}
                                                    story={I}
                                                />
                                            ) : (
                                                    ''
                                                ))
                                    }))
                                    : (this.props.filteredCalls.map(({ A, B, M, N, L, I }) => {
                                        return (
                                            mapVal < addCall ? (
                                                ++mapVal,
                                                <Marker
                                                    onClick={this.onMarkerClick}
                                                    name={A}
                                                    icon={{ url: this.decisionURL(L) }}
                                                    info={B}
                                                    priority={L}
                                                    position={{ lat: M, lng: N }}
                                                    story={I}
                                                />
                                            ) : (
                                                    ''
                                                ))
                                    }))
                            ) : (

                                    this.props.filteredCalls == null ? (
                                        this.props.policeCall.map(({ A, B, M, N, L, I}) => {
                                            return (
                                                <Marker
                                                    onClick={this.onMarkerClick}
                                                    icon={{ url: this.decisionURL(L) }}
                                                    name={A}
                                                    info={B}
                                                    priority={L}
                                                    position={{ lat: M, lng: N }}
                                                    story={I}
                                                />
                                            )
                                        })
                                    )
                                        : (
                                            this.props.filteredCalls.map(({ A, B, M, N, L, I}) => {
                                                return (
                                                    <Marker
                                                        onClick={this.onMarkerClick}
                                                        icon={{ url: this.decisionURL(L) }}
                                                        name={A}
                                                        info={B}
                                                        priority={L}
                                                        position={{ lat: M, lng: N }}
                                                        story={I}
                                                    />
                                                )
                                            })
                                        )
                                )) : null}

                        {mapVal = 0}
                        
                        {this.state.isHeatVisible ? (
                            this.props.toggle ?
                                (
                                    this.props.filteredCalls == null ?
                                        <HeatMap
                                            gradient={gradient}
                                            opacity={3}
                                            positions={this.props.policeCall.map(({ M, N }) => {
                                                if (mapVal < addCall) {
                                                    return {lat: M, lng: N };
                                                }
                                                else
                                                    return {lat: 0, lng: 0};
                                            })}
                                            radius={30}
                                        />
                                        :
                                        <HeatMap
                                            gradient={gradient}
                                            opacity={3}
                                            positions={this.props.filteredCalls.map(({ M, N }) => {
                                                if (mapVal < addCall) {
                                                    return { lat: M, lng: N };
                                                }
                                                else
                                                    return { lat: 0, lng: 0 };
                                            })}
                                            radius={30}
                                        />
                                )
                                :
                                (
                                    this.props.filteredCalls == null ?
                                        <HeatMap
                                            gradient={gradient}
                                            opacity={3}
                                            positions={this.props.policeCall.map(({ M, N }) => {

                                                return { lat: M, lng: N };
                                            })}
                                            radius={30}
                                        />
                                        :
                                        <HeatMap
                                            gradient={gradient}
                                            opacity={3}
                                            positions={this.props.filteredCalls.map(({ M, N }) => {
                                                return { lat: M, lng: N };
                                            })}
                                            radius={30}
                                        />
                                )
                        ): null}



                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onClose}
                        >
                            <React.Fragment>
                                <h4 style={h4style}>ID: {this.state.selectedPlace.name}</h4>
                                <h4 style={h4style}>Date: {this.state.selectedPlace.info}</h4>
                                <h4 style={h4style}>Crime Level: {this.state.selectedPlace.story}</h4>
                            </React.Fragment>
                        </InfoWindow>

                    </Map>
                </div>
            </div>

        );
    }
}


const Mcontainer = GoogleApiWrapper({
    apiKey: 'AIzaSyBxXtV6UaJaE_bU_7VTwm745vpO8l_NP5A', 
    libraries: ["visualization"]
})(MapContainer);

const mapStateToProps = (state) => ({
    policeCall: state.policeCall.policeCall,
    refresh: state.policeCall.refreshValue,
    toggle: state.policeCall.liveToggled,
    filteredCalls: state.policeCall.filteredData
});

export default connect(mapStateToProps)(Mcontainer);