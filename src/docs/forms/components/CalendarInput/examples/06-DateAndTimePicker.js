import React from 'react';
import {CalendarInput} from "doj-react-adminlte/Form";

export default class DateAndTimePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date1: null,
            date2: null,
            date3: null
        };
    }

    handleDateChange = (name, value) => {
        this.setState({[name]: value});
    };

    render() {
        const {date1,date2,date3} = this.state;

        return (
            <div className="row">
                <div className="col-xs-4">
                    <CalendarInput name="date1"
                                   label="Both pickers enabled"
                                   value={date1}
                                   onChange={this.handleDateChange}/>
                </div>
                <div className="col-xs-4">
                    <CalendarInput name="date2"
                                   label="Time picker only "
                                   value={date2}
                                   onChange={this.handleDateChange}
                                   datePicker={false}/>
                </div>
                <div className="col-xs-4">
                    <CalendarInput name="date3"
                                   label="Date picker only"
                                   value={date3}
                                   onChange={this.handleDateChange}
                                   timePicker={false}/>
                </div>
            </div>
        );
    }
}