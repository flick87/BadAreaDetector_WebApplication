import React from 'react'
import './css components/App.css'
import Header from './Header'
import Graphs from './Graphs'
import Visualizers  from './Visualizers'
import MapVisualizer from './MapVisualizer'
import MapContainer from './Map'




function App() {


    return (

        <div>
            <Header />
            <Graphs />
            <Visualizers />
            <div class="column map">
                <MapContainer />
                <MapVisualizer />
            </div>

        </div>
        )
}



export default App