import React from 'react'
import { BarGraph, LineGraph } from 'carbon-addons-data-viz-react'
import { connect } from 'react-redux';
import { Tooltip } from 'carbon-components-react'


var simulateOnce = true;
var addCall = 0;


var januaryAL = []
var februaryAL = []
var marchAL = []
var aprilAL = []
var mayAL = []
var juneAL = []
var julyAL = []
var augustAL = []

class Graphs extends React.Component {

    simulate(obj, refresh, length) {

            setTimeout(
                () => {

                    if (this.props.toggle && this.props.refresh === refresh && (this.props.filteredCalls === null ? this.props.policeCall.length === length : this.props.filteredCalls.length === length)) {
                        if (addCall < obj.length - 1) {
                            
                            //January
                            if (obj[addCall].B.substring(0, 1) === "1") {
                                if (obj[addCall].L === '1') {
                                    januaryAL[1] = ++januaryAL[1]
                                }
                                else if (obj[addCall].L === '2') {
                                        januaryAL[2] = ++januaryAL[2]
                                    }
                                else if (obj[addCall].L === '3') {
                                        januaryAL[3] = ++januaryAL[3]
                                    }
                                else if (obj[addCall].L === '4') {
                                        januaryAL[4] = ++januaryAL[4]
                                    }
                                }

                            //February
                            else if (obj[addCall].B.substring(0, 1) === "2") {
                                if (obj[addCall].L === '1') {
                                    februaryAL[1] = ++februaryAL[1]
                                }
                                else if (obj[addCall].L === '2') {
                                    februaryAL[2] = ++februaryAL[2]
                                }
                                else if (obj[addCall].L === '3') {
                                    februaryAL[3] = ++februaryAL[3]
                                }
                                else if (obj[addCall].L === '4') {
                                    februaryAL[4] = ++februaryAL[4]
                                }
                            }

                            //March
                            else if (obj[addCall].B.substring(0, 1) === "3") {
                                if (obj[addCall].L === '1') {
                                        marchAL[1] = ++marchAL[1]
                                    }
                                else if (obj[addCall].L === '2') {
                                        marchAL[2] = ++marchAL[2]
                                    }
                                else if (obj[addCall].L === '3') {
                                        marchAL[3] = ++marchAL[3]
                                    }
                                else if (obj[addCall].L === '4') {
                                        marchAL[4] = ++marchAL[4]
                                    }
                            }

                            //April
                            else if (obj[addCall].B.substring(0, 1) === "4") {
                                if (obj[addCall].L === '1') {
                                        aprilAL[1] = ++aprilAL[1]
                                    }
                                else if (obj[addCall].L === '2') {
                                        aprilAL[2] = ++aprilAL[2]
                                    }
                                else if (obj[addCall].L === '3') {
                                        aprilAL[3] = ++aprilAL[3]
                                    }
                                else if (obj[addCall].L === '4') {
                                        aprilAL[4] = ++aprilAL[4]
                                    }
                            }

                            //May
                            else if (obj[addCall].B.substring(0, 1) === "5") {
                                if (obj[addCall].L === '1') {
                                    mayAL[1] = ++mayAL[1]
                                }
                                else if (obj[addCall].L === '2') {
                                    mayAL[2] = ++mayAL[2]
                                }
                                else if (obj[addCall].L === '3') {
                                    mayAL[3] = ++mayAL[3]
                                }
                                else if (obj[addCall].L === '4') {
                                    mayAL[4] = ++mayAL[4]
                                }
                            }

                            //June
                            else if (obj[addCall].B.substring(0, 1) === "6") {
                                if (obj[addCall].L === '1') {
                                        juneAL[1] = ++juneAL[1]
                                    }
                                else if (obj[addCall].L === '2') {
                                        juneAL[2] = ++juneAL[2]
                                    }
                                else if (obj[addCall].L === '3') {
                                        juneAL[3] = ++juneAL[3]
                                    }
                                else if (obj[addCall].L === '4') {
                                        juneAL[4] = ++juneAL[4]
                                    }
                            }

                            //July
                            else if (obj[addCall].B.substring(0, 1) === "7") {
                                if (obj[addCall].L === '1') {
                                        julyAL[1] = ++julyAL[1]
                                }
                                else if (obj[addCall].L === '2') {
                                        julyAL[2] = ++julyAL[2]
                                }
                                else if (obj[addCall].L === '3') {
                                    julyAL[3] = ++julyAL[3]
                                }
                                else if (obj[addCall].L === '4') {
                                    julyAL[4] = ++julyAL[4]
                                }
                            }

                            //August
                            else if (obj[addCall].B.substring(0, 1) === "8") {
                                if (obj[addCall].L === '1') {
                                    augustAL[1] = ++augustAL[1]
                                }
                                else if (obj[addCall].L === '2') {
                                    augustAL[2] = ++augustAL[2]
                                }
                                else if (obj[addCall].L === '3') {
                                    augustAL[3] = ++augustAL[3]
                                }
                                else if (obj[addCall].L === '4') {
                                    augustAL[4] = ++augustAL[4]
                                }
                            }
                            ++addCall
                            this.forceUpdate()
                            this.simulate(obj, refresh, length)
                        }
                        else {
                            //Reset values of arrays
                            this.createArrayListInstances(januaryAL)
                            this.createArrayListInstances(februaryAL)
                            this.createArrayListInstances(marchAL)
                            this.createArrayListInstances(aprilAL)
                            this.createArrayListInstances(mayAL)
                            this.createArrayListInstances(juneAL)
                            this.createArrayListInstances(julyAL)
                            this.createArrayListInstances(augustAL)

                            addCall = 0;
                            simulateOnce = true;
                            console.log('Simulation has finished!');
                        }
                    }
                    else {
                        if (this.props.toggle) {
                            //Reset values of arrays
                            this.createArrayListInstances(januaryAL)
                            this.createArrayListInstances(februaryAL)
                            this.createArrayListInstances(marchAL)
                            this.createArrayListInstances(aprilAL)
                            this.createArrayListInstances(mayAL)
                            this.createArrayListInstances(juneAL)
                            this.createArrayListInstances(julyAL)
                            this.createArrayListInstances(augustAL)

                            addCall = 0;
                            this.simulate(this.props.filteredCalls === null ? this.props.policeCall : this.props.filteredCalls, this.props.refresh, this.props.filteredCalls === null ? this.props.policeCall.length : this.props.filteredCalls.length)
                        }
                        else {
                            console.log('Simulation Finished!')
                        }
                    }
                },
                this.props.refresh * 1000);
    }

    constructGraphs() {
        
        if (this.props.filteredCalls === null) {
            this.props.policeCall.map(({ B, L }) => {
                //January
                if (B.substring(0, 1) === "1") {
                    if (L === '1') {
                        januaryAL[1] = ++januaryAL[1]
                    }
                    else if (L === '2') {
                        januaryAL[2] = ++januaryAL[2]
                    }
                    else if (L === '3') {
                        januaryAL[3] = ++januaryAL[3]
                    }
                    else if (L === '4') {
                        januaryAL[4] = ++januaryAL[4]
                    }
                }
                //February
                else if (B.substring(0, 1) === "2") {
                    if (L === '1') {
                        februaryAL[1] = ++februaryAL[1]
                    }
                    else if (L === '2') {
                        februaryAL[2] = ++februaryAL[2]
                    }
                    else if (L === '3') {
                        februaryAL[3] = ++februaryAL[3]
                    }
                    else if (L === '4') {
                        februaryAL[4] = ++februaryAL[4]
                    }
                }
                //March
                else if (B.substring(0, 1) === "3") {
                    if (L === '1') {
                        marchAL[1] = ++marchAL[1]
                    }
                    else if (L === '2') {
                        marchAL[2] = ++marchAL[2]
                    }
                    else if (L === '3') {
                        marchAL[3] = ++marchAL[3]
                    }
                    else if (L === '4') {
                        marchAL[4] = ++marchAL[4]
                    }
                }
                //April
                else if (B.substring(0, 1) === "4") {
                    if (L === '1') {
                        aprilAL[1] = ++aprilAL[1]
                    }
                    else if (L === '2') {
                        aprilAL[2] = ++aprilAL[2]
                    }
                    else if (L === '3') {
                        aprilAL[3] = ++aprilAL[3]
                    }
                    else if (L === '4') {
                        aprilAL[4] = ++aprilAL[4]
                    }
                }
                //May
                else if (B.substring(0, 1) === "5") {
                    if (L === '1') {
                        mayAL[1] = ++mayAL[1]
                    }
                    else if (L === '2') {
                        mayAL[2] = ++mayAL[2]
                    }
                    else if (L === '3') {
                        mayAL[3] = ++mayAL[3]
                    }
                    else if (L === '4') {
                        mayAL[4] = ++mayAL[4]
                    }
                }
                //June
                else if (B.substring(0, 1) === "6") {
                    if (L === '1') {
                        juneAL[1] = ++juneAL[1]
                    }
                    else if (L === '2') {
                        juneAL[2] = ++juneAL[2]
                    }
                    else if (L === '3') {
                        juneAL[3] = ++juneAL[3]
                    }
                    else if (L === '4') {
                        juneAL[4] = ++juneAL[4]
                    }
                }
                //July
                else if (B.substring(0, 1) === "7") {
                    if (L === '1') {
                        julyAL[1] = ++julyAL[1]
                    }
                    else if (L === '2') {
                        julyAL[2] = ++julyAL[2]
                    }
                    else if (L === '3') {
                        julyAL[3] = ++julyAL[3]
                    }
                    else if (L === '4') {
                        julyAL[4] = ++julyAL[4]
                    }
                }
                //August
                else if (B.substring(0, 1) === "8") {
                    if (L === '1') {
                        augustAL[1] = ++augustAL[1]
                    }
                    else if (L === '2') {
                        augustAL[2] = ++augustAL[2]
                    }
                    else if (L === '3') {
                        augustAL[3] = ++augustAL[3]
                    }
                    else if (L === '4') {
                        augustAL[4] = ++augustAL[4]
                    }
                }
            })
        }

        else {
            this.props.filteredCalls.map(({ B, L }) => {
                //January
                if (B.substring(0, 1) === "1") {
                    if (L === '1') {
                        januaryAL[1] = ++januaryAL[1]
                    }
                    else if (L === '2') {
                        januaryAL[2] = ++januaryAL[2]
                    }
                    else if (L === '3') {
                        januaryAL[3] = ++januaryAL[3]
                    }
                    else if (L === '4') {
                        januaryAL[4] = ++januaryAL[4]
                    }
                }
                //February
                else if (B.substring(0, 1) === "2") {
                    if (L === '1') {
                        februaryAL[1] = ++februaryAL[1]
                    }
                    else if (L === '2') {
                        februaryAL[2] = ++februaryAL[2]
                    }
                    else if (L === '3') {
                        februaryAL[3] = ++februaryAL[3]
                    }
                    else if (L === '4') {
                        februaryAL[4] = ++februaryAL[4]
                    }
                }
                //March
                else if (B.substring(0, 1) === "3") {
                    if (L === '1') {
                        marchAL[1] = ++marchAL[1]
                    }
                    else if (L === '2') {
                        marchAL[2] = ++marchAL[2]
                    }
                    else if (L === '3') {
                        marchAL[3] = ++marchAL[3]
                    }
                    else if (L === '4') {
                        marchAL[4] = ++marchAL[4]
                    }
                }
                //April
                else if (B.substring(0, 1) === "4") {
                    if (L === '1') {
                        aprilAL[1] = ++aprilAL[1]
                    }
                    else if (L === '2') {
                        aprilAL[2] = ++aprilAL[2]
                    }
                    else if (L === '3') {
                        aprilAL[3] = ++aprilAL[3]
                    }
                    else if (L === '4') {
                        aprilAL[4] = ++aprilAL[4]
                    }
                }
                //May
                else if (B.substring(0, 1) === "5") {
                    if (L === '1') {
                        mayAL[1] = ++mayAL[1]
                    }
                    else if (L === '2') {
                        mayAL[2] = ++mayAL[2]
                    }
                    else if (L === '3') {
                        mayAL[3] = ++mayAL[3]
                    }
                    else if (L === '4') {
                        mayAL[4] = ++mayAL[4]
                    }
                }
                //June
                else if (B.substring(0, 1) === "6") {
                    if (L === '1') {
                        juneAL[1] = ++juneAL[1]
                    }
                    else if (L === '2') {
                        juneAL[2] = ++juneAL[2]
                    }
                    else if (L === '3') {
                        juneAL[3] = ++juneAL[3]
                    }
                    else if (L === '4') {
                        juneAL[4] = ++juneAL[4]
                    }
                }
                //July
                else if (B.substring(0, 1) === "7") {
                    if (L === '1') {
                        julyAL[1] = ++julyAL[1]
                    }
                    else if (L === '2') {
                        julyAL[2] = ++julyAL[2]
                    }
                    else if (L === '3') {
                        julyAL[3] = ++julyAL[3]
                    }
                    else if (L === '4') {
                        julyAL[4] = ++julyAL[4]
                    }
                }
                //August
                else if (B.substring(0, 1) === "8") {
                    if (L === '1') {
                        augustAL[1] = ++augustAL[1]
                    }
                    else if (L === '2') {
                        augustAL[2] = ++augustAL[2]
                    }
                    else if (L === '3') {
                        augustAL[3] = ++augustAL[3]
                    }
                    else if (L === '4') {
                        augustAL[4] = ++augustAL[4]
                    }
                }
            })
        }
    }

    createArrayListInstances(monthMap) {
        monthMap.push(1);
        monthMap[1] = 0
        monthMap.push(2);
        monthMap[2] = 0
        monthMap.push(3);
        monthMap[3] = 0
        monthMap.push(4);
        monthMap[4] = 0
    }
    



    render(props){


        if (!this.props.toggle) {

            this.createArrayListInstances(januaryAL)
            this.createArrayListInstances(februaryAL)
            this.createArrayListInstances(marchAL)
            this.createArrayListInstances(aprilAL)
            this.createArrayListInstances(mayAL)
            this.createArrayListInstances(juneAL)
            this.createArrayListInstances(julyAL)
            this.createArrayListInstances(augustAL)
            

            this.constructGraphs()
        }

        if (this.props.toggle && simulateOnce) {

            this.createArrayListInstances(januaryAL)
            this.createArrayListInstances(februaryAL)
            this.createArrayListInstances(marchAL)
            this.createArrayListInstances(aprilAL)
            this.createArrayListInstances(mayAL)
            this.createArrayListInstances(juneAL)
            this.createArrayListInstances(julyAL)
            this.createArrayListInstances(augustAL)


            simulateOnce = false;
            this.simulate(this.props.filteredCalls == null ? this.props.policeCall : this.props.filteredCalls, this.props.refresh, this.props.filteredCalls == null ? this.props.policeCall.length : this.props.filteredCalls.length) //Object, Refresh, length
        }
        else if (!this.props.toggle) {
            simulateOnce = true;
        }


        return (
            <div className="row">
                <div class="column tableleft">
                    <h1 className="graphsHeader" style={{ color: '#4F6472', paddingTop: '3%' }}> Priority Call Stats{/* Remove Padding if Button moves location */}
                        <Tooltip showIcon='true' clickToOpen='true' triggerText=''>
                            <p style={{ textAlign: "center" }}>Priority calls are based on the urgency of the police call.</p>
                            <hr />
                            <table className='TooltipTable'>
                                <ul>
                                    <li>
                                        <div className='color-squares' style={{ backgroundColor: '#00A68F' }}></div> Priority 1
                                    </li>
                                    <hr />
                                    <li>
                                        <div className='color-squares' style={{ backgroundColor: '#3B1A40' }}></div> Priority 2
                                    </li>
                                    <hr />
                                    <li>
                                        <div className='color-squares' style={{ backgroundColor: '#265077' }}></div> Priority 3
                                    </li>
                                    <hr />
                                    <li>
                                        <div className='color-squares' style={{ backgroundColor: '#73C2FB' }}></div> Priority 4
                                    </li>
                                </ul>
                            </table>
                        </Tooltip>
                    </h1>

                    <div style={{ color: 'black' }}>

                        {this.props.toggle ? (
                            <BarGraph
                                data={[
                                    [[januaryAL[1], januaryAL[2], januaryAL[3], januaryAL[4]], "January"],
                                    [[februaryAL[1], februaryAL[2], februaryAL[3], februaryAL[4]], "February"],
                                    [[marchAL[1], marchAL[2], marchAL[3], marchAL[4]], "March"],
                                    [[aprilAL[1], aprilAL[2], aprilAL[3], aprilAL[4]], "April"],
                                    [[mayAL[1], mayAL[2], mayAL[3], mayAL[4]], "May"],
                                    [[juneAL[1], juneAL[2], juneAL[3], juneAL[4]], "June"],
                                    [[julyAL[1], julyAL[2], julyAL[3], julyAL[4]], "July"],
                                    [[augustAL[1], augustAL[2], augustAL[3], augustAL[4]], "August"]
                                ]}
                                width={1010}
                                height={210}
                                id="graph"
                                containerId="containerId"
                                xAxisLabel={"Months"}
                                yAxisLabel={"Calls"}
                                emptyText="There is no data. Please start a simulation to display data"
                                color={['#00a68f', '#3b1a40', '#265077', '#73C2FB']}
                                showTooltip={true}
                            />
                        )
                            : (
                                <BarGraph
                                    data={[
                                        [[januaryAL[1], januaryAL[2], januaryAL[3], januaryAL[4]], "January 2017"],
                                        [[februaryAL[1], februaryAL[2], februaryAL[3], februaryAL[4]], "February 2017"],
                                        [[marchAL[1], marchAL[2], marchAL[3], marchAL[4]], "March 2017"],
                                        [[aprilAL[1], aprilAL[2], aprilAL[3], aprilAL[4]], "April 2017"],
                                        [[mayAL[1], mayAL[2], mayAL[3], mayAL[4]], "May 2017"],
                                        [[juneAL[1], juneAL[2], juneAL[3], juneAL[4]], "June 2017"],
                                        [[julyAL[1], julyAL[2], julyAL[3], julyAL[4]], "July 2017"],
                                        [[augustAL[1], augustAL[2], augustAL[3], augustAL[4]], "August 2017"]
                                    ]}
                                    width={1010}
                                    height={210}
                                    id="graph"
                                    containerId="containerId"
                                    xAxisLabel={"Months"}
                                    yAxisLabel={"Calls"}
                                    emptyText="There is no data. Please start a simulation to display data"
                                    color={['#00a68f', '#3b1a40', '#265077', '#73C2FB']}
                                    showTooltip={false}
                                />)}
                    </div>
                </div>



                <div class="column tableright">
                    <h1 className="graphsHeader" style={{ color: '#4F6472' }}>Incoming Call Stats</h1>

                    <div style={{ color: '#4F6472' }}>
                        <LineGraph
                            data={[[[(januaryAL[1] + januaryAL[2] + januaryAL[3] + januaryAL[4])], 1483232461000], [[(februaryAL[1] + februaryAL[2] + februaryAL[3] + februaryAL[4])], 1485910861000], [[(marchAL[1] + marchAL[2] + marchAL[3] + marchAL[4])], 1488330061000], [[(aprilAL[1] + aprilAL[2] + aprilAL[3] + aprilAL[4])], 1491008461000], [[(mayAL[1] + mayAL[2] + mayAL[3] + mayAL[4])], 1493600461000], [[(juneAL[1] + juneAL[2] + juneAL[3] + juneAL[4])], 1496278861000], [[(julyAL[1] + julyAL[2] + julyAL[3] + julyAL[4])], 1498870861000], [[(augustAL[1] + augustAL[2] + augustAL[3] + augustAL[4])], 1501635661000]]} //EPOCH Time gathered from https://www.epochconverter.com/
                            width={820}
                            height={210}
                            xAxisLabel={"Time"}
                            yAxisLabel={"Calls"}
                            emptyText={"There is no data. Please start a simulation to display data."}
                            isUTC={false}
                            isXTime={true}
                            timeFormat={"%B %Y"}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    policeCall: state.policeCall.policeCall,
    refresh: state.policeCall.refreshValue,
    toggle: state.policeCall.liveToggled,
    filteredCalls: state.policeCall.filteredData
});

export default connect(mapStateToProps)(Graphs);
