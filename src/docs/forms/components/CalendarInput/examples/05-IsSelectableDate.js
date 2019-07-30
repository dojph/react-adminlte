import React from 'react';
import moment from 'moment';
import {CalendarInput} from "doj-react-adminlte/Form";


export default class IsSelectableDate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date1: null,
            date2: null,
            date3: null,
            date4: null
        };
    }

    isCurrentOrFutureDate = current => {
        const yesterday = moment().subtract(1, 'day');
        return current.isAfter(yesterday);
    };

    isPastDate = current => {
        return current.isBefore(moment());
    };

    isNotWednesday = current => {
        return current.day()!==3;
    };

    isWeekday = current => {
        return current.day() !== 0 && current.day() !== 6;
    };

    handleDateChange = (name, value) => {
        this.setState({[name]: value});
    };

    render() {
        const {date1,date2, date3, date4} = this.state;

        return (
            <div className="row">
                <div className="col-xs-6">
                    <CalendarInput name="date1"
                                   label="Past dates disabled"
                                   value={date1}
                                   onChange={this.handleDateChange}
                                   isSelectableDate={this.isCurrentOrFutureDate}/>
                </div>
                <div className="col-xs-6">
                    <CalendarInput name="date2"
                                   label="Future dates disabled"
                                   value={date2}
                                   onChange={this.handleDateChange}
                                   isSelectableDate={this.isPastDate}/>
                </div>
                <div className="col-xs-6">
                    <CalendarInput name="date3"
                                   label="Wednesdays disabled"
                                   value={date3}
                                   onChange={this.handleDateChange}
                                   isSelectableDate={this.isNotWednesday}/>
                </div>
                <div className="col-xs-6">
                    <CalendarInput name="date4"
                                   label="Weekends disabled"
                                   value={date4}
                                   onChange={this.handleDateChange}
                                   isSelectableDate={this.isWeekday}/>
                </div>
            </div>
        );
    }
}