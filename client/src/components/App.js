
import React, {Component}from 'react'
import './css components/App.css'
import Header from './Header'
import Graphs from './Graphs'
import Visualizers from './Visualizers'
import MapContainer from './Map'
import {connect} from 'react-redux';
import {getPoliceCalls} from '../actions/policecallActions';
import PropTypes from 'prop-types';
import { Loading } from 'carbon-components-react'
import { setTimeout } from 'timers';
import { Container } from 'reactstrap'


var loaded = true
var runOnce = true

class App extends Component{

    componentDidMount(){
        this.props.getPoliceCalls();
        console.log('TEST PRINT')
    }
    //Uncomment to implement loading feature
    Loading() {
        setTimeout(() => {
            loaded = false;
            this.forceUpdate()
        }, 7000)
    }

    render() {

        if (runOnce) { //Prevent programming from running more than once
            const policeCall = this.props.policeCall;
            console.log("in render", policeCall);
            runOnce = false
            this.Loading()
            //console.log('This is running again!')
        }

        return (
            <div>
                <Loading active={loaded} />
                <Container fluid={true} style={{ backgroundColor: 'black' }}>
                        <Header />
                        <Graphs />
                        <Visualizers />

                        <br />
                </Container>
            </div>
        )
    }
}

App.PropTypes = {
    getPoliceCalls: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    policeCall: state.policeCall.policeCall
});

// export default App
export default connect(mapStateToProps, {getPoliceCalls})(App);