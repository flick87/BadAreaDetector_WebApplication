import React from 'react'
import { BarGraph, LineGraph } from 'carbon-addons-data-viz-react'

function Graphs() {
    return (
        <div className="row">


            <div class="column tableleft">
                <h1 className="graphsHeader">Priority Call Stats </h1>

                <BarGraph
                    data={[
                        [[200, 20, 40, 90], "January"],
                        [[150, 70, 180, 50], "February"],
                        [[49, 96, 38, 50], "March"],
                        [[180, 30, 190, 90], "April"],
                        [[140, 190, 160, 30], "May"],
                        [[30, 72, 90, 10], "June"],
                        [[50, 100, 150, 60], "July"],
                        [[130, 20, 110, 50], "August"],
                        [[80, 30, 60, 90], "September"]
                    ]}
                    width={1010}
                    height={210}
                    id="graph"
                    containerId="containerId"
                    xAxisLabel={"Months"}
                    yAxisLabel={"Calls"}
                    emptyText="There is no data. Please start a simulation to display data"
                    color={['#00a68f', '#3b1a40', '#265077']}
                />

            </div>



            <div class="column tableright">
                <h1 className="graphsHeader">Incoming call stats</h1>
                <LineGraph
                    data={[[[214], 0], [[369], 1], [[110], 5]]}
                    width={820}
                    height={210}
                    xAxisLabel={"Time"}
                    yAxisLabel={"Calls"}
                    emptyText={"There is no data. Please start a simulation to display data"}
                />
            </div>
        </div>
        )
}

export default Graphs