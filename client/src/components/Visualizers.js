import React from 'react'
import { connect } from 'react-redux';
import CallTable from './CallTable'
import  Gauge  from 'react-svg-gauge'

var addCall = 0;
var gaugeDetail = 20;
var simulateOnce = true;
var totalPriorityCalls = 0;
var priority1 = 0;
var priority2 = 0;
var priority3 = 0;
var priority4 = 0;

var gaugeAmount1 = 0;
var gaugeAmount2 = 0;
var gaugeAmount3 = 0;
var gaugeAmount4 = 0;

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

                        if (obj[addCall].L == 1) {
                            ++priority1
                            ++totalPriorityCalls
                        }
                        else if (obj[addCall].L == 2) {
                            ++priority2
                            ++totalPriorityCalls
                        }
                        else if (obj[addCall].L == 3) {
                            ++priority3
                            ++totalPriorityCalls
                        }
                        else if (obj[addCall].L == 4) {
                            ++priority4
                            ++totalPriorityCalls
                        }
                        

                        gaugeAmount1 = Math.round((priority1 / totalPriorityCalls) * 100)
                        gaugeAmount2 = Math.round((priority2 / totalPriorityCalls) * 100)
                        gaugeAmount3 = Math.round((priority3 / totalPriorityCalls) * 100)
                        gaugeAmount4 = Math.round((priority4 / totalPriorityCalls) * 100)


                        //console.log('THIS IS PRIORITY 1: ' + gaugeAmount1)
                        //console.log('THIS IS PRIORITY 2: ' + gaugeAmount2)
                        //console.log('THIS IS PRIORITY 3: ' + gaugeAmount3)
                        //console.log('THIS IS PRIORITY 4: ' + gaugeAmount4)
                        //console.log('Priority Call: ' + obj[addCall].L)


                        ++addCall
                        this.forceUpdate()
                        this.simulate(obj, refresh, length)
                    }
                    else {
                        addCall = 0;
                        priority1 = 0;
                        priority2 = 0;
                        priority3 = 0;
                        priority4 = 0;
                        totalPriorityCalls = 0;
                        simulateOnce = true;
                        console.log('Simulation has finished!');
                    }
                }
                else {
                    if (this.props.toggle) {
                        addCall = 0;
                        priority1 = 0;
                        priority2 = 0;
                        priority3 = 0;
                        priority4 = 0;
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
            priority1 = 0;
            priority2 = 0;
            priority3 = 0;
            priority4 = 0;
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


            //console.log('TTEEEESSST')

            //console.log("Total amount of priority 1: " + priority[1])
            //console.log("Total amount of priority 2: " + priority[2])
            //console.log("Total amount of priority 3: " + priority[3])
            //console.log("Total amount of priority 4: " + priority[4])
            //console.log("Total calls: " + totalPriority)

            if (this.props.filteredCalls == null) {
                this.props.policeCall.map(({ L }) => {

                    if (L === '1') {
                        priority[1]++;
                        totalPriority++
                    }
                    else if (L === '2') {
                        priority[2]++;
                        totalPriority++
                    }
                    else if (L === '3') {
                        priority[3]++;
                        totalPriority++
                    }
                    else if (L === '4') {
                        priority[4]++;
                        totalPriority++
                    }
                })
            }

            else {
                this.props.filteredCalls.map(({ L }) => {
                    if (L === '1') {
                        priority[1]++;
                        totalPriority++
                    }
                    else if (L === '2') {
                        priority[2]++;
                        totalPriority++
                    }
                    else if (L === '3') {
                        priority[3]++;
                        totalPriority++
                    }
                    else if (L === '4') {
                        priority[4]++;
                        totalPriority++
                    }
                })
            }

            gaugeAmount1 = Math.round((priority[1] / totalPriority) * 100)
            gaugeAmount2 = Math.round((priority[2] / totalPriority) * 100)
            gaugeAmount3 = Math.round((priority[3] / totalPriority) * 100)
            gaugeAmount4 = Math.round((priority[4] / totalPriority) * 100)
        }
        
        return (

            <div class="column piecharts" style={{ color: '#4F6472' }}>
                <h1 className="callTypeHeader">Call Type</h1>

                

                <div style={{ paddingLeft: '5%' }}>
                    <Gauge value={gaugeAmount1} width={235} height={150} label='Priority1' color='#748B99' />
                    <Gauge value={gaugeAmount2} width={235} height={150} label='Priority2' color='#748B99' />
                    <Gauge value={gaugeAmount3} width={235} height={150} label='Priority3' color='#748B99' />
                    <Gauge value={gaugeAmount4} width={235} height={150} label='Priority4' color='#748B99' />
                </div>

                {/*Data Table with all calls*/}
                <CallTable />

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