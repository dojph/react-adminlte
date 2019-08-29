import React from 'react';
import {CalendarInput} from "doj-react-adminlte/Form";

export default class DateAndTimePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: null
        };
    }

    handleDateChange = (name, value) => {
        this.setState({[name]: value});
    };

    render() {
        const {date} = this.state;

        return (
            <div className="row">
                <div className="col-xs-4">
                    <CalendarInput name="date"
                                   label="Both pickers enabled"
                                   value={date}
                                   onChange={this.handleDateChange}/>
                </div>
                <div className="col-xs-4">
                    <CalendarInput name="date"
                                   label="Time picker only "
                                   value={date}
                                   onChange={this.handleDateChange}
                                   datePicker={false}/>
                </div>
                <div className="col-xs-4">
                    <CalendarInput name="date"
                                   label="Date picker only"
                                   value={date}
                                   onChange={this.handleDateChange}
                                   timePicker={false}/>
                </div>
                <div className="col-xs-12">
                    <span style={{fontWeight: 'bold'}}>Selected: </span>
                    { date ? date.format("LLLL") : "No selected date" }
                </div>
            </div>
        );
    }
}