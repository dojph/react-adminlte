import React from 'react';
import Form, {CalendarInput, CheckBox} from "doj-react-adminlte/Form";
import ValueButton from "doj-react-adminlte/ValueButton";

export default class ClearableCalendarInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: null,
            clearable: true
        };
    }

    handleFormChange = (name, value) => {
        this.setState({[name]: value});
    };

    handleClearClick = () => {
        this.setState({date: null});
    };

    render() {
        const {date, clearable} = this.state;
        return (
            <div>
                <Form onChange={this.handleFormChange}>
                    <div className="row">
                        <div className="col-xs-6">
                            <CalendarInput name="date"
                                           label="Date"
                                           value={date}
                                           clearable={clearable}
                                           />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                            <ValueButton className="btn btn-primary btn-block"
                                         onClick={this.handleClearClick}>
                                Clear
                            </ValueButton>
                            <CheckBox label="Clearable"
                                      name="clearable"
                                      checked={clearable}/>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}