import React from 'react';
import Form, {CalendarInput, CheckBox} from "doj-react-adminlte/Form";

export default class DisabledCalendarInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: null,
            disabled: true
        };
    }

    handleDateChange = (name, value) => {
        this.setState({[name]: value});
    };

    render() {
        const {date,disabled} = this.state;

        return (
            <Form onChange={this.handleDateChange}>
                <div className="row">
                    <div className="col-xs-6">
                        <CalendarInput name="date"
                                       label="Date"
                                       value={date}
                                       disabled={disabled} />
                        <CheckBox label="Disabled"
                                  name="disabled"
                                  checked={disabled}/>
                    </div>
                </div>
            </Form>
        );
    }
}