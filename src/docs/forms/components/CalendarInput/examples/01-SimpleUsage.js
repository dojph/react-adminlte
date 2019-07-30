import React from 'react';
import {CalendarInput} from "doj-react-adminlte/Form";

export default class SimpleUsage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDate: null
        };
    }

    handleDateChange = (name, value) => {
        this.setState({selectedDate: value});
    };

    render() {
        const {selectedDate} = this.state;

        return (
            <div className="row">
                <div className="col-xs-6">
                    <CalendarInput name="calendar"
                                   label="Date"
                                   value={selectedDate}
                                   onChange={this.handleDateChange}/>
                </div>
            </div>
        );
    }
}