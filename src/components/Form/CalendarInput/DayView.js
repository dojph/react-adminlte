import React from 'react';
import moment from 'moment';

import PickerControl from './PickerControl';

class Day extends React.Component {
    shouldComponentUpdate(nextProps) {
        return (
            this.props.prevLastIndex !== nextProps.prevLastIndex ||
            this.props.nextFirstIndex !== nextProps.nextFirstIndex ||
            this.props.todayIndex !== nextProps.todayIndex ||
            (this.props.selectedIndex !== nextProps.selectedIndex &&
                (this.props.index === nextProps.selectedIndex || this.props.index === this.props.selectedIndex)) ||
            this.props.enabled !== nextProps.enabled
        );
    }

    handleClick = () => {
        if(this.props.enabled) {
            this.props.onClick(this.props.index);
        }
    };

    render() {
        const {prevLastIndex, nextFirstIndex, todayIndex,
            selectedIndex, index, enabled} = this.props;

        const {day} = this.props;
        const classes = [];

        if(index <= prevLastIndex || index >= nextFirstIndex) {
            classes.push("dralt-cal-ex");
        }

        if(index === todayIndex) {
            classes.push("dralt-cal-today");
        }

        if(index === selectedIndex) {
            classes.push("dralt-cal-selected");
        }

        if(!enabled) {
            classes.push("dralt-cal-disabled");
        }

        return (
            <span className={classes.length ? classes.join(" ") : null}
                  onClick={this.handleClick}>
                {day.value}
            </span>
        );
    }
}

class DayView extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            daysOfWeek: this.getDaysOfWeek(),
            days: [],
            prevLastIndex: 0,
            nextFirstIndex: 0,
            todayIndex: -1,
            selectedIndex: -1,
            enabledIndexes: []
        };

        this.state = {
            ...this.initialState,
            ...this.getViewState(props.currentMonth)
        };
    }

    componentDidUpdate(prevProps) {
        const {currentMonth, selectedDate, onCurrentMonthChange} = this.props;

        if(currentMonth !== prevProps.currentMonth) {
            this.setState(this.getViewState(currentMonth));
        }

        if(selectedDate !== prevProps.selectedDate) {
            if(!selectedDate) {
                this.setState({
                    ...this.initialState,
                    ...this.getViewState(this.props.currentMonth)
                });
            } else if(selectedDate.month() === currentMonth.month() &&
                selectedDate.year() === currentMonth.year()) {
                // If current date falls within current month, just update selected index
                this.setState({selectedIndex: this.getSelectedIndex(currentMonth)});
            } else {
                // Set current month to selected date month
                onCurrentMonthChange(selectedDate.clone().date(1));

                // Else, rerender view with selected month
                this.setState(this.getViewState(selectedDate));
            }
        }
    }

    getSelectedIndex = currentMonth => {
        const {selectedDate} = this.props;

        // Get last week of previous month
        const prevMonth = currentMonth.clone().date(1).subtract(1, 'day').startOf('week');
        return moment.isMoment(selectedDate) ? selectedDate.diff(prevMonth, 'd') : -1;
    };

    getDaysOfWeek = () => {
        const {viewDate} = this.props;
        const locale = viewDate.localeData();
        const first = locale.firstDayOfWeek();
        const days = locale.weekdaysMin();
        let weekdays = [];

        // Get list of weekdays, starting on first day of locale week
        days.forEach((day, i) => {
            weekdays[(7 + i - first) % 7] = day;
        });

        return weekdays;
    };

    getViewState = month => {
        const {viewDate, isSelectableDate} = this.props;

        // Go to the last week of previous month
        const walker = month.clone().date(1).subtract(1, 'day').startOf('week');

        // Get last index of previous month
        const prevLastIndex = walker.daysInMonth() - walker.date();

        // Get first index of next month
        const nextFirstIndex = prevLastIndex + month.daysInMonth() + 1;

        // Get index of current date
        const todayIndex = viewDate.diff(walker, 'd');

        const lastDay = walker.clone().add(6, 'weeks');
        let days = [], enabledIndexes = [];

        while(walker.isBefore(lastDay)) {
            days.push({
                key: walker.format("DDD"),
                value: walker.format("D")
            });

            enabledIndexes.push(isSelectableDate(walker));

            walker.add(1, 'day');
        }

        return {
            prevLastIndex,
            nextFirstIndex,
            todayIndex,
            selectedIndex: this.getSelectedIndex(month),
            enabledIndexes,
            days
        };
    };

    handlePreviousClick = () => {
        const {onCurrentMonthChange, currentMonth} = this.props;
        const prevMonth = currentMonth.clone().subtract(1, 'month');
        onCurrentMonthChange(prevMonth);
    };

    handleNextClick = () => {
        const {onCurrentMonthChange, currentMonth} = this.props;
        const nextMonth = currentMonth.clone().add(1, 'month');
        onCurrentMonthChange(nextMonth);
    };

    handleSwitchClick = () => {
        const {switchCallback} = this.props;
        switchCallback("year_month");
    };

    handleTimeSwitchClick = () => {
        const {switchCallback} = this.props;
        switchCallback("time");
    };

    handleDayClick = index => {
        const {currentMonth, onDatePick, switchCallback, timePicker} = this.props;

        // Get last week of previous month
        const prevMonth = currentMonth.clone().date(1).subtract(1, 'day').startOf('week');

        // Add 'index' days and call onDatePick
        onDatePick(prevMonth.add(index, 'days'));

        if(!timePicker) {
            switchCallback("none");
        } else {
            switchCallback("time");
        }
    };

    renderDaysOfWeek = () => {
        const {daysOfWeek} = this.state;

        return (
            <div className="dralt-cal-day-row text-bold">
                { daysOfWeek.map(day => <span key={day}>{day}</span>) }
            </div>
        );
    };

    renderDays = () => {
        const {days, prevLastIndex, nextFirstIndex,
            todayIndex, selectedIndex, enabledIndexes} = this.state;

        const props = {
            prevLastIndex,
            nextFirstIndex,
            todayIndex,
            selectedIndex,
            onClick: this.handleDayClick
        };

        const weeks = [];
        let displayDays = [];
        days.forEach((day, i) => {
            displayDays.push(
                <Day day={day} key={day.key} index={i} enabled={enabledIndexes[i]} {...props}/>
            );

            if(displayDays.length === 7) {
                weeks.push(
                    <div className="dralt-cal-day-row dralt-cal-day-calendar"
                         key={weeks.length + 1}>
                        {displayDays}
                    </div>
                );
                displayDays = [];
            }
        });

        return weeks;
    };

    renderTime = () => {
        const {selectedDate} = this.props;

        return (
            <div className="dralt-cal-time-switch" onClick={this.handleTimeSwitchClick}>
                {selectedDate ? selectedDate.format("h:mm A") : "12:00 AM"}
            </div>
        );
    };

    render() {
        const {currentMonth, timePicker} = this.props;

        return (
            <>
                <PickerControl switchLabel={currentMonth.format('MMMM Y')}
                               onPreviousClick={this.handlePreviousClick}
                               onNextClick={this.handleNextClick} onSwitchClick={this.handleSwitchClick}/>
                { this.renderDaysOfWeek() }
                { this.renderDays() }
                { timePicker && this.renderTime() }
            </>
        );
    }
}

export default DayView;