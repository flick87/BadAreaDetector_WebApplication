import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker, HeatMap } from 'google-maps-react';
import { connect } from 'react-redux';
import { setTimeout } from 'timers';


const mapStyles = {
    width: '45%',
    height: '57.7%'
};
const h4style = {
    color: "black"
};

var counter = 0; 
var simulateOnce = true;
var addCall = 0;
var obj = null;
var mapVal = 0;


export class MapContainer extends Component {

    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {},
        isHeatVisible: true,
        isMarkerVisible: true       //Shows the infoWindow to the selected place upon a marker
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

    simulate(obj, refresh, length) {
        setTimeout(() => {
            if (this.props.toggle && this.props.refresh === refresh && (this.props.filteredCalls === null ? this.props.policeCall.length === length : this.props.filteredCalls.length === length)) {
                if (addCall < length - 1) {
                    console.log('Simulating from Map')
                    ++addCall;
                    mapVal = 0;
                    this.forceUpdate();
                    this.simulate(obj, refresh, length);
                }
                else {
                    addCall = 0;
                    simulateOnce = true;
                    console.log('Simulation finished!')
                }
            }
            else {
                if (this.props.toggle) { //case: Simulation is continuing, but user changes data
                    addCall = 0
                    this.forceUpdate()
                    this.simulate(this.props.filteredCalls == null ? this.props.policeCall : this.props.filteredCalls, this.props.refresh, this.props.filteredCalls == null ? this.props.policeCall.length : this.props.filteredCalls.length)
                }
                else {
                    console.log('Simulation Finished!')
                }
            }
        }, this.props.refresh * 1000)
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

        let heat = <HeatMap
            gradient={gradient}
            opacity={3}
            positions={this.props.policeCall.map(({ M, N }) => {
                return { lat: M, lng: N };
            })}
            radius={30}
        />

        //Implement Simulation
        if (this.props.toggle && simulateOnce) {
            simulateOnce = false;
            this.simulate(this.props.filteredCalls == null ? this.props.policeCall : this.props.filteredCalls, this.props.refresh, this.props.filteredCalls == null ? this.props.policeCall.length : this.props.filteredCalls.length);
        }
        else if (!this.props.toggle) {
            simulateOnce = true;
            addCall = 0;
        }


        
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



                        {this.props.toggle ? (

                            this.props.filteredCalls == null ? (

                             this.props.policeCall.map(({A, B, M, N, L, O }) => {

                                return (
                                mapVal < addCall ? (
                                    ++mapVal,
                                    <Marker
                                        onClick={this.onMarkerClick}
                                        name={A}
                                        info={B}
                                        priority={L}
                                        position={{ lat: M, lng: N }}
                                        story={O}
                                    />
                            ) : (
                                ''
                                ))
                                }))
                                : (this.props.filteredCalls.map(({ A, B, M, N, L, O }) => {

                                    return (
                                        mapVal < addCall ? (
                                            ++mapVal,
                                            <Marker
                                                onClick={this.onMarkerClick}
                                                name={A}
                                                info={B}
                                                priority={L}
                                                position={{ lat: M, lng: N }}
                                                story={O}
                                            />
                                        ) : (
                                                ''
                                            ))
                                }))
                        ) : (

                                this.props.filteredCalls == null ? (
                                this.props.policeCall.map(({ A, B, M, N, L, O }) => {
                                    return (
                                        <Marker
                                            onClick={this.onMarkerClick}
                                            name={A}
                                            info={B}
                                            priority={L}
                                            position={{ lat: M, lng: N }}
                                            story={O}
                                        />
                                    )
                                    })
                                )
                                    : (
                                        this.props.filteredCalls.map(({ A, B, M, N, L, O }) => {
                                            return (
                                                <Marker
                                                    onClick={this.onMarkerClick}
                                                    name={A}
                                                    info={B}
                                                    priority={L}
                                                    position={{ lat: M, lng: N }}
                                                    story={O}
                                                />
                                            )
                                        })
                                        )
                                )}

                        {this.state.isHeatVisible ? heat : null}



                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onClose}
                        >

                            <React.Fragment>
                                <h4 style={h4style}>ID: {this.state.selectedPlace.name}</h4>
                                <h4 style={h4style}>Date: {this.state.selectedPlace.info}</h4>

                                {/*<h4 style={h4style}>
              Priority: {this.state.selectedPlace.priority}
            </h4> */}

                                <h4 style={h4style}>
                                    Crime Level: {this.state.selectedPlace.story}
                                </h4>
                            </React.Fragment>


                        </InfoWindow>
                    </Map>
                </div>
            </div>

        );
    }
}


const Mcontainer = GoogleApiWrapper({
    apiKey: '',
    libraries: ["visualization"]
})(MapContainer);

const mapStateToProps = (state) => ({
    policeCall: state.policeCall.policeCall,
    refresh: state.policeCall.refreshValue,
    toggle: state.policeCall.liveToggled,
    filteredCalls: state.policeCall.filteredData
});

export default connect(mapStateToProps)(Mcontainer);
