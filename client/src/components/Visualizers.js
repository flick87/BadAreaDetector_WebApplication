import React from 'react'
import { connect } from 'react-redux';
import CallTable from './CallTable'
import Gauge from 'react-svg-gauge'
import { Tooltip } from 'carbon-components-react'
import { Row, Col } from 'reactstrap'
import MapContainer from './Map'

var addCall = 0;
var simulateOnce = true;
var totalPriorityCalls = 0;
var callType1 = 0;
var callType2 = 0;
var callType3 = 0;
var callType4 = 0;
var other = 0;

var gaugeAmount1 = 0;
var gaugeAmount2 = 0;
var gaugeAmount3 = 0;
var gaugeAmount4 = 0;
var gaugeAmount5 = 0;

class Visualizer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0
        };

        this.simulate = this.simulate.bind(this)
    }

    simulate(obj, refresh, length) {
        setTimeout(
            () => {
                //console.log('Displaying!')
                if (this.props.toggle && this.props.refresh === refresh && (this.props.filteredCalls == null ? this.props.policeCall.length === length : this.props.filteredCalls.length === length)) {
                    if (addCall < obj.length - 1) {

                        if (obj[addCall].I == '415') {
                            ++callType1
                            ++totalPriorityCalls
                        }
                        else if (obj[addCall].I == '459A') {
                            ++callType2
                            ++totalPriorityCalls
                        }
                        else if (obj[addCall].I == '1150') {
                            ++callType3
                            ++totalPriorityCalls
                        }
                        else if (obj[addCall].L == '1151') {
                            ++callType4
                            ++totalPriorityCalls
                        }
                        else {
                            ++other
                            ++totalPriorityCalls
                        }
                        

                        gaugeAmount1 = Math.round((callType1 / totalPriorityCalls) * 100)
                        gaugeAmount2 = Math.round((callType2 / totalPriorityCalls) * 100)
                        gaugeAmount3 = Math.round((callType3 / totalPriorityCalls) * 100)
                        gaugeAmount4 = Math.round((callType4 / totalPriorityCalls) * 100)
                        gaugeAmount5 = Math.round((other / totalPriorityCalls) * 100)

                        ++addCall
                        this.forceUpdate()
                        this.simulate(obj, refresh, length)
                    }
                    else {
                        addCall = 0;
                        callType1 = 0;
                        callType2 = 0;
                        callType3 = 0;
                        callType4 = 0;
                        other = 0;
                        totalPriorityCalls = 0;
                        simulateOnce = true;
                        console.log('Simulation has finished!');
                    }
                }
                else {
                    if (this.props.toggle) {
                        addCall = 0;
                        callType1 = 0;
                        callType2 = 0;
                        callType3 = 0;
                        callType4 = 0;
                        other = 0;
                        totalPriorityCalls = 0;
                        this.simulate(this.props.filteredCalls === null ? this.props.policeCall : this.props.filteredCalls, this.props.refresh, this.props.filteredCalls === null ? this.props.policeCall.length : this.props.filteredCalls.length)
                    }
                    else {
                        console.log('Simulation Finished!')
                    }
                }
            },
            this.props.refresh * 1000);
    }


    render() {

        if (this.props.toggle && simulateOnce) {
            addCall = 0;
            callType1 = 0;
            callType2 = 0;
            callType3 = 0;
            callType4 = 0;
            other = 0
            totalPriorityCalls = 0;
            simulateOnce = false;
            this.simulate(this.props.filteredCalls == null ? this.props.policeCall : this.props.filteredCalls, this.props.refresh, this.props.filteredCalls == null ? this.props.policeCall.length : this.props.filteredCalls.length)
        }

        else if (!this.props.toggle) {
            simulateOnce = true
        }

        if (!this.props.toggle) {

            var priority = []
            var totalPriority = 0;

            priority.push(1)
            priority[1] = 0
            priority.push(2)
            priority[2] = 0
            priority.push(3)
            priority[3] = 0
            priority.push(4)
            priority[4] = 0
            priority.push(5)
            priority[5] = 0

            if (this.props.filteredCalls == null) {
                this.props.policeCall.map(({ I }) => {

                    if (I === '415') {
                        priority[1]++
                        totalPriority++
                    }
                    else if (I === '459A') {
                        priority[2]++
                        totalPriority++
                    }
                    else if (I === '1150') {
                        priority[3]++
                        totalPriority++
                    }
                    else if (I === '1151') {
                        priority[4]++
                        totalPriority++
                    }
                    else {
                        priority[5]++
                        totalPriority++
                    }
                })
            }

            else {
                this.props.filteredCalls.map(({ I }) => {
                    if (I === '415') {
                        priority[1]++
                        totalPriority++
                    }
                    else if (I === '459A') {
                        priority[2]++
                        totalPriority++
                    }
                    else if (I === '1150') {
                        priority[3]++
                        totalPriority++
                    }
                    else if (I === '1151') {
                        priority[4]++
                        totalPriority++
                    }
                    else {
                        priority[5]++
                        totalPriority++
                    }
                })
            }

            gaugeAmount1 = Math.round((priority[1] / totalPriority) * 100)
            gaugeAmount2 = Math.round((priority[2] / totalPriority) * 100)
            gaugeAmount3 = Math.round((priority[3] / totalPriority) * 100)
            gaugeAmount4 = Math.round((priority[4] / totalPriority) * 100)
            gaugeAmount5 = Math.round((priority[5] / totalPriority) * 100)
        }
        
        return (
            <div class="column piecharts" style={{ color: '#8D68EE' }}>
                <Row style={{ paddingTop: '2%' }}>
                    <Col sm={6}>
                        <h1 style={{ textAlign:'center' }}>Call Type 
                    <Tooltip showIcon='true' clickToOpen='true' triggerText=''>

                        <p style={{ textAlign: 'center' }}> Call types are abbreviated police codes. </p><hr />

                        415 - Disturbing the peace <br /> <hr />
                        459A - Burglary alarm <br /> <hr />
                        1150 - Traffic stop with license <br /> <hr />
                        1151 - Pedestrian stop / Field interview <br /> <hr />
                        <p style={{ textAlign: 'center' }}>'Other' represents a mixture of all other call types. </p>  

                    </Tooltip>
                        </h1>
                    </Col>
                </Row>

                
                <Row>
                    <Col sm={1.9}>
                        <Gauge value={gaugeAmount1} width={200} height={150} label='Call Type: 415' color='#FE7B6B' topLabelStyle='fill: #8D68EE' />
                    </Col>
                    <Col sm={1.9}>
                        <Gauge value={gaugeAmount2} width={200} height={150} label='Call Type: 459A' color='#FE7B6B' topLabelStyle='fill: #8D68EE' />
                    </Col>
                    <Col sm={1.9}>
                        <Gauge value={gaugeAmount3} width={200} height={150} label='Call Type: 1150' color='#FE7B6B' topLabelStyle='fill: #8D68EE' />
                    </Col>
                    <Col sm={1.9}>
                        <Gauge value={gaugeAmount4} width={200} height={150} label='Call Type: 1151' color='#FE7B6B' topLabelStyle='fill: #8D68EE' />
                    </Col>
                    <Col sm={1.9}>
                        <Gauge value={gaugeAmount5} width={200} height={150} label='Other' color='#FE7B6B' topLabelStyle='fill: #8D68EE' />
                    </Col>
                    <Col sm={5} style={{ height: '40% !important', width: '30% !important', paddingLeft: '5%', alignSelf: 'center'}}>
                        <MapContainer />
                    </Col>
                    <Col sm={6}>
                        <CallTable />

                    </Col>

                </Row>
                {/*Data Table with all calls*/}


                

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

export default connect(mapStateToProps)(Visualizer);