import React from 'react'
import { GaugeGraph, PieChart } from 'carbon-addons-data-viz-react'
import { Table, TableBody, TableData, TableHead, TableRow, TableRowExpanded, TableHeader } from 'carbon-components-react'
import {connect} from 'react-redux';

function Visualizer(props) {
    
        return (
            <div class="column piecharts">
                <h1 className="callTypeHeader">Call Type</h1>

                <div className="gauge1">
                    <h2 className="gaugeText">Assualt</h2>
                    <div> <GaugeGraph id="Gauge1" size="half" className="This1" /> </div>
                </div>

                <div className="gauge234">
                    <h2 className="gaugeText">Murder</h2>
                    <div> <GaugeGraph id="Gauge2" amount={'90'} size="half" className="This2" /> </div>
                </div>

                <div className="gauge234">
                    <h2 className="gaugeText">Ransom</h2>
                    <div> <GaugeGraph id="Gauge3" size="half" className="This1" /> </div>
                </div>

                <div className="gauge234">
                    <h2 className="gaugeText">Car Theft</h2>
                    <div> <GaugeGraph id="Gauge4" amount={'20'} size="half" className="This2" /> </div>
                </div>


                <div className="callDescSection">
                    <h1 className="callDescHeader">Call Description</h1>
                    <div className="scrollBar">
                        <Table>
                            <TableHead>
                                <TableRow header>
                                    <TableHeader>Incedent Number</TableHeader>
                                    <TableHeader>Location</TableHeader>
                                    <TableHeader>Priority</TableHeader>
                                    <TableHeader>Date</TableHeader>
                                    <TableHeader>Call Type</TableHeader>
                                    <TableHeader>Crime in the Area</TableHeader>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {props.policeCall.map(({A, H, L, B, I}) => {
                                    return (<TableRow>
                                         <TableData>{A}</TableData>
                                    <TableData>{H}</TableData>
                                    <TableData>{L}</TableData>
                                    <TableData>{B}</TableData>
                                    <TableData>{I}</TableData>
                                    <TableData>Low</TableData>
                                    </TableRow>)
                                })}
                                {/* <TableRow>
                                    <TableData>P17010000351</TableData>
                                    <TableData>213 N Angeleno Ave</TableData>
                                    <TableData>February 1 17:30</TableData>
                                    <TableData>4</TableData>
                                    <TableData>P1928</TableData>
                                    <TableData>Low</TableData>
                                </TableRow>

                                <TableRow>
                                    <TableData>P17010000351</TableData>
                                    <TableData>213 N Angeleno Ave</TableData>
                                    <TableData>February 1 17:30</TableData>
                                    <TableData>4</TableData>
                                    <TableData>P1928</TableData>
                                    <TableData>Low</TableData>
                                </TableRow>

                                <TableRow>
                                    <TableData>P17010000351</TableData>
                                    <TableData>213 N Angeleno Ave</TableData>
                                    <TableData>February 1 17:30</TableData>
                                    <TableData>4</TableData>
                                    <TableData>P1928</TableData>
                                    <TableData>Low</TableData>
                                </TableRow>

                                <TableRow>
                                    <TableData>P17010000351</TableData>
                                    <TableData>213 N Angeleno Ave</TableData>
                                    <TableData>February 1 17:30</TableData>
                                    <TableData>4</TableData>
                                    <TableData>P1928</TableData>
                                    <TableData>Low</TableData>
                                </TableRow>

                                <TableRow>
                                    <TableData>P17010000351</TableData>
                                    <TableData>213 N Angeleno Ave</TableData>
                                    <TableData>February 1 17:30</TableData>
                                    <TableData>4</TableData>
                                    <TableData>P1928</TableData>
                                    <TableData>Low</TableData>
                                </TableRow>

                                <TableRow>
                                    <TableData>P17010000351</TableData>
                                    <TableData>213 N Angeleno Ave</TableData>
                                    <TableData>February 1 17:30</TableData>
                                    <TableData>4</TableData>
                                    <TableData>P1928</TableData>
                                    <TableData>Low</TableData>
                                </TableRow> */}

                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        );
}

const mapStateToProps = (state) => ({
    policeCall: state.policeCall.policeCall
});

export default connect(mapStateToProps)(Visualizer);