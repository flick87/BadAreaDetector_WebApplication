import React from 'react'
import { MapContainer } from './Map'
import { Tabs, Tab, Slider, Checkbox } from 'carbon-components-react'

function MapVisualizer() {

    return (
        <div>

            <div className="filterSection">

                <Tabs>
                    <Tab label="Simulation Time">
                        <Slider
                            value={5}
                            min={1}
                            max={10}
                            labelText="Time (Seconds)"
                        />
                    </Tab>

                    <Tab label="Months">
                        <fieldset>
                            <legend>Checkbox heading</legend>
                            <Checkbox id="check1" />
                            <Checkbox id="check2" />
                            <Checkbox id="check3" />
                        </fieldset>
                    </Tab>

                    <Tab label="Filter">
                        <div>This is for tab 3</div>
                    </Tab>

                </Tabs>
            </div>

        </div>
        )
}
export default MapVisualizer