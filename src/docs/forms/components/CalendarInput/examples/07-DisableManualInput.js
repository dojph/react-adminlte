import React from 'react';
import {CalendarInput} from "doj-react-adminlte/Form";

export default class DisableManualInput extends React.Component {
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
                                   label="Disabled Manual Input"
                                   manualInput={false}
                                   value={date}
                                   onChange={this.handleDateChange}/>
                </div>
            </div>
        );
    }
}