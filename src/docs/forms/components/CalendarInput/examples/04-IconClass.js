import React from 'react';
import Form, {CalendarInput,RadioGroup} from "doj-react-adminlte/Form";

export default class IconClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDate: null,
            icon: "fa fa-calendar"
        };
    }

    handleDateChange = (name, value) => {
        this.setState({[name]: value});
    };

    render() {
        const {selectedDate,icon} = this.state;
        const iconOptions = [
            {label: "fa fa-calendar", value: "fa fa-calendar"},
            {label: "fa fa-calendar-check-o", value: "fa fa-calendar-check-o"},
            {label: "fa fa-calendar-minus-o", value: "fa fa-calendar-minus-o"},
            {label: "fa fa-calendar-plus-o", value: "fa fa-calendar-plus-o"},
            {label: "fa fa-calendar-times-o", value: "fa fa-calendar-times-o"},
            {label: "fa fa-calendar-o", value: "fa fa-calendar-o"}
        ];

        return (
            <Form onChange={this.handleDateChange}>
                <div className="row">
                    <div className="col-xs-6">
                        <CalendarInput name="selectedDate"
                                       label="Date"
                                       value={selectedDate}
                                       iconClass={icon}/>
                    </div>
                    <div className="col-xs-3">
                        <RadioGroup label="Icons"
                                    name="icon"
                                    value={icon}
                                    options={iconOptions}
                                    simpleValue firstDefault/>
                    </div>
                </div>
            </Form>
        );
    }
}