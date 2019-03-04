import React from 'react'
import { GaugeGraph, PieChart } from 'carbon-addons-data-viz-react'
import { Table, TableBody, TableData, TableHead, TableRow, TableRowExpanded, TableHeader } from 'carbon-components-react'
import {connect} from 'react-redux';

function Visualizer(props) {

    var priority = []
    var totalPriority;

    var gaugeAmount1;
    var gaugeAmount2;
    var gaugeAmount3;
    var gaugeAmount4;


    priority.push(1)
    priority[1] = 0
    priority.push(2)
    priority[2] = 0
    priority.push(3)
    priority[3] = 0
    priority.push(4)
    priority[4] = 0

    


    totalPriority = (priority[1] + priority[2] + priority[3] + priority[4])

    console.log("Total amount of priority 1: " + priority[1])
    console.log("Total amount of priority 2: " + priority[2])
    console.log("Total amount of priority 3: " + priority[3])
    console.log("Total amount of priority 4: " + priority[4])
    console.log("Total calls: " + totalPriority)

    gaugeAmount1 = Math.round((priority[1] / totalPriority) * 100)
    gaugeAmount2 = Math.round((priority[2] / totalPriority) * 100)
    gaugeAmount3 = Math.round((priority[3] / totalPriority) * 100)
    gaugeAmount4 = Math.round((priority[4] / totalPriority) * 100)

    //console.log("Gauge Amount: " + gaugeAmount1)
    //console.log("Gauge Amount: " + gaugeAmount2)
    //console.log("Gauge Amount: " + gaugeAmount3)
    //console.log("Gauge Amount: " + gaugeAmount4)

    
    return (
 
            <div class="column piecharts">
                <h1 className="callTypeHeader">Call Type</h1>

                <div className="gauge1">
                <h2 className="gaugeText">Assualt</h2>
                <div> <GaugeGraph id="Gauge1" size="half" className="This1" amount={gaugeAmount1} /> </div>
                </div>

                <div className="gauge234">
                    <h2 className="gaugeText">Murder</h2>
                    <div> <GaugeGraph id="Gauge2" size="half" className="This2" /> </div>
                </div>

                <div className="gauge234">
                    <h2 className="gaugeText">Ransom</h2>
                    <div> <GaugeGraph id="Gauge3" size="half" className="This1" /> </div>
                </div>

                <div className="gauge234">
                    <h2 className="gaugeText">Car Theft</h2>
                    <div> <GaugeGraph id="Gauge4" size="half" className="This2"  /> </div>
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