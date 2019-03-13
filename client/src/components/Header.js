import React from 'react'
import { Slider } from 'carbon-components-react'
import Toolbar, {
    ToolbarItem,
    ToolbarTitle,
    ToolbarOption,
    ToolbarDivider,
}
from '../../node_modules/carbon-components-react/es/components/Toolbar'
import { OverflowMenu, NumberInput, Toggle, DatePicker, DatePickerInput, ModalWrapper } from 'carbon-components-react'
import { iconMenu } from 'carbon-icons'

class Header extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            value: 8000
        };
    }

    componentDidMount() {
        setInterval(
            () => {
                //this.setState({
                //    value: Math.ceil(Math.random() * 100)
                //});
                console.log('Hello');
            },
            this.state.value);
    }

    render(props) {

        var toggleVal;

        return (
            <div>
                <div className='header'>
                    <h1>The Bad Area Detector System </h1>
                </div>

                {console.log("This is the prop: " + this.state.value)}

                <div className='Menu'>

                    <ModalWrapper>
                        <div style={{ textAlign: "center" }}>
                            Menu
                        </div>

                        <hr />
                        <br />
                        Live Feed
                        <Toggle
                            defaultToggled
                            id='toggler'
                            onToggle={function (toggled) {
                                if (toggled) {
                                    console.log('Display live data')
                                    toggleVal = toggled
                                    console.log('ToggleVal is: ' + toggleVal)
                                }
                                else {
                                    console.log('Do not display live data')
                                    toggleVal = toggled
                                    console.log('ToggleVal is: ' + toggleVal)
                                }
                                
                            }}
                        />

                        <hr />
                        <br />
                        Refresh Rate
                        <Slider
                            value={5}
                            min={1}
                            max={10}
                            minLabel=''
                            maxLabel=''
                            labelText=''
                            onRelease={function (value) {
                                console.log(value)
                                console.log('Toggle val in Slider: ' + toggleVal)
                                
                            }}
                            disabled={!toggleVal}
                        />

                        <hr />
                        <br />
                        Time Period
                        <br />
                        <br />
                        <DatePicker
                            minDate="1/1/2018"
                            maxDate="8/31/2018"
                            datePickerType="range"
                            dateFormat="m/d/Y"
                            onChange={function (value) {

                                if (value.length > 1) {
                                    console.log('THE DATE IS CHOSEN: ' + value[0])
                                    console.log(' ')
                                    console.log(' ')
                                    console.log(' ')



                                    console.log('THE DATE IS CHOSEN: ' + value[0])
                                    var date = new Date(value[0])
                                    console.log('Shortened version: ' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear())


                                    console.log('THE DATE IS CHOSEN: ' + value[1])
                                    var date2 = new Date(value[1])
                                    console.log('Shortened version: ' + (date2.getMonth() + 1) + '/' + date2.getDate() + '/' + date2.getFullYear())
                                    
                                    
                                }

                                else {
                                    console.log('Start date is chosen')
                                }
                            }}
                        >

                            <DatePickerInput
                                id="date-picker-input-id-start"
                                labelText='Start Date'
                                placeHolder='mm/dd/yyyy'
                            />


                            <DatePickerInput
                                id="date-picker-input-id-end"
                                labelText='End Date'
                                placeHolder='mm/dd/yyyy'
                            />
                        />
                        </DatePicker>
                    </ModalWrapper>
                </div>



            </div>
        )
    }
}

export default Header