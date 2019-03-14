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


    static defaultProps = {
        myRefreshRate: 5
    };


    constructor(props) {
        super(props);

        this.state = {
            value: 8000
        };
    }

    componentWillMount() {
        setInterval(
            () => {
                this.setState({
                    value: Math.ceil(Math.random() * 100)
                });
                console.log('Hello: ' + this.state.value);
                
            },
            this.state.value);
    }





    render(props) {

        var liveToggle = true;
        var refreshRate = 5;

        return (

            <div>
                <div className='header'>
                    <h1>The Bad Area Detector System </h1>
                </div>

                {console.log("This is the prop: " + this.state.value)}
                
                {/*console.log(this.props.myRefreshRate)*/}

                <div className='Menu'>

                    <ModalWrapper
                        renderTriggerButtonIcon={true}
                        buttonTriggerText="Menu"

                        handleSubmit={function () {
                            console.log('Submited...')
                        }}
                    >
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
                                    liveToggle = toggled
                                    console.log('ToggleVal is: ' + liveToggle)
                                }
                                else {
                                    console.log('Do not display live data')
                                    liveToggle = toggled
                                    console.log('ToggleVal is: ' + liveToggle)
                                }
                            }}
                        />

                        <hr />
                        <br />
                        Refresh Rate (Seconds)
                        <Slider
                            value={5}
                            min={1}
                            max={10}
                            minLabel=''
                            maxLabel=''
                            labelText=''
                            onRelease={function (value) {
                                console.log(value)
                                console.log('Toggle val in Slider: ' + liveToggle)
                                refreshRate = value.value
                                //this.props.setState({ value: 9000 })
                            }}
                        />

                        <hr />
                        <br />
                        Time Period
                        <br />
                        <br />
                        <DatePicker
                            minDate='1/1/2018'
                            maxDate='8/31/2018'
                            datePickerType='range'
                            dateFormat='m/d/Y'
                            iconDescription='Select between a range of dates'
                            onChange={function (value) {
                                if (value.length > 1) {

                                    console.log('THE DATE IS CHOSEN: ' + value[0])
                                    var date = new Date(value[0])
                                    console.log((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear())

                                    console.log(' ')
                                    console.log(' ')
                                    console.log(' ')

                                    console.log('THE DATE IS CHOSEN: ' + value[1])
                                    var date2 = new Date(value[1])
                                    console.log((date2.getMonth() + 1) + '/' + date2.getDate() + '/' + date2.getFullYear());
                                    
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