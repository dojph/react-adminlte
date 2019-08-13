import React from 'react';
import moment from 'moment';
import HoldButton from "doj-react-adminlte/Form/CalendarInput/HoldButton";

class Month extends React.Component {
    handleClick = () => {
        this.props.onClick(this.props.index);
    };

    render() {
        const {index, selectedIndex, month} = this.props;

        return (
            <span className={index === selectedIndex ? "dralt-cal-selected" : undefined}
                  onClick={this.handleClick}>
                {month}
            </span>
        );
    }
}

class YearMonthView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedYear: props.currentMonth.year(),
            months: this.getMonthNames()
        };

        this.yearRegex = /^\d{0,4}$/;
        this.inputRef = null;
    }

    componentDidUpdate(prevProps) {
        const {currentMonth} = this.props;

        if(currentMonth !== prevProps.currentMonth) {
            this.setState({selectedYear: currentMonth.year()});
        }
    }

    componentDidMount() {
        if(this.inputRef) {
            this.inputRef.focus();
        }
    }

    setInputRef = el => {
        this.inputRef = el;
    };

    getMonthNames = () => {
        const {viewDate} = this.props;
        const locale = viewDate.localeData();
        return locale.monthsShort().map(month => month.substring(0, 3));
    };

    handlePreviousClick = () => {
        const {selectedYear} = this.state;

        if(selectedYear > 0) {
            this.setState({selectedYear: this.state.selectedYear - 1});
        }
    };

    handleNextClick = () => {
        const {selectedYear} = this.state;

        if(selectedYear < 9999) {
            this.setState({selectedYear: this.state.selectedYear + 1});
        }
    };

    handleMonthClick = index => {
        const {selectedYear} = this.state;
        const {onCurrentMonthChange, switchCallback} = this.props;
        onCurrentMonthChange(moment({year: selectedYear, month: index, day: 1}));
        switchCallback("day");
    };

    handleYearChange = ({target}) => {
        const {value} = target;

        if(this.yearRegex.test(value)) {
            this.setState({selectedYear: value.length ? parseInt(value): 0});
        }
    };

    renderMonths = () => {
        const {months} = this.state;
        const {currentMonth} = this.props;
        const selectedMonth = currentMonth.month();

        return (
            <div className="dralt-cal-months">
                {
                    months.map((month, i) =>
                        <Month key={i} index={i} month={month} onClick={this.handleMonthClick}
                               selectedIndex={selectedMonth} />)
                }
            </div>
        );
    };

    render() {
        const {selectedYear} = this.state;

        return (
            <>
                <div>
                    <HoldButton className="dralt-cal-control dralt-cal-direction" onClick={this.handlePreviousClick}>
                        &lsaquo;
                    </HoldButton>
                    <div className="dralt-cal-control dralt-cal-year">
                        <input value={selectedYear} onChange={this.handleYearChange} ref={this.setInputRef}/>
                    </div>
                    <HoldButton className="dralt-cal-control dralt-cal-direction" onClick={this.handleNextClick}>
                        &rsaquo;
                    </HoldButton>
                </div>
                <div>
                    {this.renderMonths()}
                </div>
            </>
        );
    }
}

export default YearMonthView;