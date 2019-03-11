import React from 'react'
import { Slider } from 'carbon-components-react'
import Toolbar, {
    ToolbarItem,
    ToolbarTitle,
    ToolbarOption,
    ToolbarDivider,
}
from '../../node_modules/carbon-components-react/es/components/Toolbar'
import { OverflowMenu } from 'carbon-components-react'
import { iconMenu } from 'carbon-icons'
import { Toggle } from 'carbon-components-react'
import { DatePicker } from 'carbon-components-react'
import { DatePickerInput } from 'carbon-components-react'


function Header() {

    //const datePickerOnChangeActions = decorateAction([
    //    args => args.slice(0, args.length - 2),
    //]);

    //const props =
    //{
    //    datePicker: () => ({
    //        id: 'date-picker',
    //        light: boolean('Light variant (light in <DatePicker>)', false),
    //        onChange: datePickerOnChangeActions('onPickerChange'),
    //    })
    //}

    return (
        <div>
            <div className='header'>
                <h1>The Bad Area Detector System </h1>


                <Toolbar>
                    <ToolbarItem>
                        <OverflowMenu icon={iconMenu} floatingMenu className="icon">

                            <ToolbarTitle title='FILTER BY' />
                            <ToolbarDivider />
                            <ToolbarOption>
                                    
                            </ToolbarOption>

                            <ToolbarDivider />
                            <ToolbarOption>
                                Live Feed <Toggle />
                            </ToolbarOption>

                            <ToolbarDivider />
                            <ToolbarOption>

                            </ToolbarOption>

                        </OverflowMenu>
                    </ToolbarItem>
                </Toolbar>

                <Slider
                    value={5}
                    min={1}
                    max={10}
                    minLabel=''
                    maxLabel=''
                    labelText=""
                />

                <DatePicker
                    minDate="1/1/2018"
                    maxDate="8/31/2018"
                    datePickerType="range"
                    dateFormat="m/d/Y" >

                    <DatePickerInput id="date-picker-input-id-start" labelText='Start Date' placeHolder='mm/dd/yyyy' />
                    <DatePickerInput id="date-picker-input-id-end" labelText='End Date' placeHolder='mm/dd/yyyy' />
                </DatePicker>

            </div>
       </div>
    )
}

export default Header