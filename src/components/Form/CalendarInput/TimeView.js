import React from 'react';

class Counter extends React.Component {
    render() {
        const {onIncreaseClick, onDecreaseClick} = this.props;

        return (
            <div className="dralt-cal-counter">
                <span onClick={onIncreaseClick}>&#x25b2;</span>
                <span>{this.props.value}</span>
                <span onClick={onDecreaseClick}>&#x25bc;</span>
            </div>
        );
    }
}

class TimeView extends React.Component {
    constructor(props) {
        super(props);
        const {selectedDate} = props;

        this.state = {
            hour: selectedDate ? selectedDate.hour() : 0,
            minute: selectedDate ? selectedDate.minute() : 0
        };
    }

    componentDidUpdate(prevProps) {
        const {selectedDate} = this.props;

        if(selectedDate !== prevProps.selectedDate) {
            this.setState({
                hour: selectedDate ? selectedDate.hour() : 0,
                minute: selectedDate ? selectedDate.minute() : 0
            })
        }
    }

    handleHourIncrease = () => {
        const {hour} = this.state;
        this.setState({hour: (hour + 1) % 24});
    };

    handleMinuteIncrease = () => {
        const {minute} = this.state;
        this.setState({minute: (minute + 1) % 60});
    };

    handlePeriodChange = () => {
        const {hour} = this.state;
        this.setState({hour: (hour + 12) % 24});
    };

    handleHourDecrease = () => {
        const {hour} = this.state;
        this.setState({hour: (hour - 1 + 24) % 24});
    };

    handleMinuteDecrease = () => {
        const {minute} = this.state;
        this.setState({minute: (minute - 1 + 60) % 60});
    };

    handleAcceptClick = () => {
        const {viewDate, selectedDate, onDatePick, switchCallback, datePicker} = this.props;
        const {hour, minute} = this.state;
        const date = selectedDate || viewDate;

        onDatePick(date.clone().hour(hour).minute(minute));
        switchCallback(datePicker ? "day" : "none");
    };

    handleCancelClick = () => {
        const {switchCallback, datePicker} = this.props;
        switchCallback(datePicker ? "day" : "none");
    };

    render() {
        const {hour, minute} = this.state;
        const hourDisp = (hour - 1 + 12) % 12 + 1;
        const minuteDisp = minute.toString().padStart(2, '0');
        const periodDisp = hour < 12 ? "AM" : "PM";

        return (
            <div className="dralt-cal-time-picker">
                <div>
                    <Counter value={hourDisp} onIncreaseClick={this.handleHourIncrease}
                             onDecreaseClick={this.handleHourDecrease}/>
                    <div className="dralt-cal-time-sep">:</div>
                    <Counter value={minuteDisp} onIncreaseClick={this.handleMinuteIncrease}
                             onDecreaseClick={this.handleMinuteDecrease}/>
                    <div className="dralt-cal-time-sep">:</div>
                    <Counter value={periodDisp} onIncreaseClick={this.handlePeriodChange}
                             onDecreaseClick={this.handlePeriodChange}/>
                </div>
                <div>
                    <button onClick={this.handleCancelClick}>
                        <i className="fa fa-times"/>
                    </button>
                    <button onClick={this.handleAcceptClick}>
                        <i className="fa fa-check"/>
                    </button>
                </div>
            </div>
        );
    }
}

export default TimeView;