import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import helpBlockStyle from "doj-react-adminlte/Form/helpBlockStyle";
import moment from 'moment';
import PickerContainer from "./PickerContainer";

import {Manager, Reference, Popper} from 'react-popper';
import ResizeAware from 'react-resize-aware';

class CalendarInput extends React.Component {
    constructor(props) {
        super(props);

        const viewDate = moment();
        this.state = {
            viewDate,
            currentMonth: viewDate.clone().date(1),
            currentView: "none"
        };

        this.pickerContainerRef = null;
        this.inputContainerRef = null;

        this.isCalendarFocused = false;
    }

    setPickerContainerRef = element => {
        this.pickerContainerRef = element;
    };

    setInputContainerRef = element => {
        this.inputContainerRef = element;
    };

    componentDidUpdate(prevProps, prevState) {
        const {currentView, viewDate} = this.state;
        const {value} = this.props;

        if((currentView === "none" && currentView !== prevState.currentView) ||
            value !== prevProps.value) {
            const date = moment.isMoment(value) ? value : viewDate;
            this.setState({currentMonth: date.clone().date(1)});
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleMouseDown);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleMouseDown);
    }

    handleSwitchView = view => {
        this.setState({currentView: view});
    };

    handleMouseDown = event => {
        const {currentView} = this.state;
        if(currentView !== "none") {
            if (this.pickerContainerRef && !this.pickerContainerRef.contains(event.target) &&
                this.inputContainerRef && !this.inputContainerRef.contains(event.target)) {
                this.setState({currentView: "none"});
                this.isCalendarFocused = false;
            } else {
                this.isCalendarFocused = true;
            }
        }
    };

    handleInputFocus = () => {
        const {datePicker, timePicker} = this.props;
        this.setState({currentView: datePicker || !timePicker ? "day" : "time"});
    };

    handleInputBlur = () => {
        if(!this.isCalendarFocused) {
            this.setState({currentView: "none"});
        }
    };

    handleDatePick = date => {
        this.props.onChange(this.props.name, date);
        this.setState({currentMonth: date.clone().date(1)});
    };

    handleClear = () => {
        this.props.onChange(this.props.name, null);
    };

    handleCurrentMonthChange = date => {
        this.setState({currentMonth: date});
    };

    resolveDisplayValue = () => {
        const {value, datePicker, timePicker} = this.props;
        let display = "";

        if(moment.isMoment(value)) {
            const format = [];

            if(datePicker || !timePicker) {
                format.push("Y/MM/DD");
            }

            if(timePicker) {
                format.push("hh:mm A");
            }

            display = value.format(format.join(' '));
        }

        return display;
    };

    render() {
        const errors = this.props.errors[this.props.name] || [];
        const display = this.resolveDisplayValue();
        const inputBgColor = this.props.disabled ? "#eee" : "#fff";

        return (
            <div className={"form-group " + (errors.length > 0 ? "has-error " : "") + (this.props.gridClass || "")}
                 ref={this.setPickerContainerRef}>
                {this.props.label && <label>{this.props.label}</label>}
                <div className="dralt-cal-input" ref={this.setInputContainerRef}>
                    {
                        !this.props.disabled && this.props.clearable && Boolean(this.props.value) &&
                        <div className="dralt-cal-input-clear">
                            <button onClick={this.handleClear}><i className="fa fa-times"/></button>
                        </div>
                    }
                    <Manager>
                        <Reference>
                            {
                                ({ref}) =>
                                <div className="input-group">
                                    <div className="input-group-addon">
                                        <i className={this.props.iconClass}/>
                                    </div>
                                    <input className="form-control" style={{background: inputBgColor}} value={display} ref={ref}
                                           onFocus={this.handleInputFocus} onBlur={this.handleInputBlur} readOnly
                                           disabled={this.props.disabled}/>

                                </div>
                            }
                        </Reference>
                        {
                            ReactDOM.createPortal(
                                <Popper placement="bottom-start" positionFixed innerRef={this.setPickerContainerRef}
                                        modifiers={{preventOverflow: {enabled: true, boundariesElement: 'viewport'}}}>
                                    {
                                        ({ref, style, placement, scheduleUpdate}) => {
                                            if(this.state.currentView !== "none") {
                                                return(
                                                    <div ref={ref} style={{...style, zIndex: 99999}} data-placement={placement}>
                                                        <ResizeAware onResize={scheduleUpdate}>
                                                            <PickerContainer viewDate={this.state.viewDate} selectedDate={this.props.value}
                                                                             onDatePick={this.handleDatePick} isSelectableDate={this.props.isSelectableDate}
                                                                             currentMonth={this.state.currentMonth} onCurrentMonthChange={this.handleCurrentMonthChange}
                                                                             currentView={this.state.currentView} onSwitchView={this.handleSwitchView}
                                                                             datePicker={this.props.datePicker} timePicker={this.props.timePicker}/>
                                                        </ResizeAware>
                                                    </div>
                                                )
                                            }

                                            return null;
                                        }
                                    }
                                </Popper>,
                                document.body
                            )
                        }
                    </Manager>
                </div>
                {
                    errors.length > 0 &&
                    <ul className="help-block" style={helpBlockStyle}>
                        {errors.map((e, index) => <li key={index}><span>{e}</span></li>)}
                    </ul>
                }
            </div>
        );
    }
}

CalendarInput.defaultProps = {
    clearable: true,
    disabled: false,
    errors: {},
    iconClass: "fa fa-calendar",
    datePicker: true,
    timePicker: true,
    value: null,
    isSelectableDate: () => true,
    onChange: () => {}
};

CalendarInput.propTypes = {
    /** Set to false to remove the clear button to disable clearing of
     * the value using the built-in clear button of the component.*/
    clearable: PropTypes.bool,

    /** Set to false to use time picker  only*/
    datePicker: PropTypes.bool,

    /** If true, users won't be able to interact with the component*/
    disabled: PropTypes.bool,

    errors: PropTypes.objectOf(
        PropTypes.arrayOf(PropTypes.string)
    ),

    /** Specifies a Bootstrap 3 grid class*/
    gridClass: PropTypes.string,

    /** Specifies the icon class to be displayed within the component*/
    iconClass: PropTypes.string,

    /** Specify a callback to determine the dates that can be selected.
     * The function receives (currentDate, selectedDate) and shall return
     * a true or false whether the date is valid or not.*/
    isSelectableDate: PropTypes.func,

    /** Specifies the text to use as the label*/
    label: PropTypes.node,

    /** Specifies the name of the component. It is used to distinguish elements when
     * a single form change handler is used*/
    name: PropTypes.string.isRequired,

    /** Callback fired when component value changes. Accepts a function with two parameters,
     *  namely field and value*/
    onChange: PropTypes.func,

    /** Set to false to use date picker only*/
    timePicker: PropTypes.bool,

    /** Specifies the current value of this component.*/
    value: PropTypes.any,
};

export default CalendarInput;