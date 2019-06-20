import React from 'react';

import DayView from "./DayView";
import YearMonthView from "doj-react-adminlte/Form/CalendarInput/YearMonthView";
import TimeView from "doj-react-adminlte/Form/CalendarInput/TimeView";

class PickerContainer extends React.Component {
    render() {
        const {currentView} = this.props;
        const {viewDate, selectedDate, onDatePick, onSwitchView, datePicker, timePicker,
            isSelectableDate, currentMonth, onCurrentMonthChange} = this.props;

        return (
            <div className="dralt-cal-picker">
                {
                    (datePicker || !timePicker) && currentView === "day" &&
                    <DayView viewDate={viewDate} selectedDate={selectedDate}
                             onDatePick={onDatePick} isSelectableDate={isSelectableDate}
                             currentMonth={currentMonth} onCurrentMonthChange={onCurrentMonthChange}
                             switchCallback={onSwitchView} timePicker={timePicker}/>
                }
                {
                    currentView === "year_month" &&
                    <YearMonthView viewDate={viewDate} currentMonth={currentMonth}
                                   onCurrentMonthChange={onCurrentMonthChange}
                                   switchCallback={onSwitchView}/>
                }
                {
                    timePicker && currentView === "time" &&
                    <TimeView viewDate={viewDate} selectedDate={selectedDate} onDatePick={onDatePick}
                              datePicker={datePicker} switchCallback={onSwitchView}/>
                }
            </div>
        );
    }
}

export default PickerContainer;