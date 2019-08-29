import React from 'react';
import moment from "moment";

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "",
            textError: false,
        };

        this.selectionStart = 0;
        this.selectionEnd = 0;

        this.maskRef = null;
    }

    setMaskRef = el => {
        this.maskRef = el;
    };

    blink = () => {
        let times = 0;
        let blinkInterval = setInterval(() => {
            this.setState({ textError: !this.state.textError });

            if(++times >= 4 && !this.state.textError) {
                clearInterval(blinkInterval);
            }
        }, 70);
    };

    componentDidUpdate(prevProps) {
        const {selectedValue, currentView} = this.props;

        if(selectedValue !== prevProps.selectedValue ||
            (currentView !== prevProps.currentView && currentView === "none")) {
            this.setState({display: this.resolveDisplayValue(selectedValue)});
        }
    }

    resolveDisplayValue = value => {
        const {datePicker, timePicker} = this.props;
        let display = "";

        if(moment.isMoment(value)) {
            const format = [];

            if(datePicker || !timePicker) {
                format.push("YYYY/MM/DD");
            }

            if(timePicker) {
                format.push("hh:mm A");
            }

            display = value.format(format.join(' '));
        }

        return display;
    };

    dateReplaceAtPosition = (value, position, insertion, offset) => {
        let newValue = value.substring(0, position);
        let addedChars = 0, dayStale = false;

        const offsetPosition = position;
        position -= offset;

        if(insertion) {
            let newInsertion = "";
            if(position < 4) {
                if(insertion.match(/^\d$/)) {
                    newInsertion = insertion;
                    dayStale = true;
                }
            } else if(position === 4 && insertion === '/') {
                newInsertion = '/';
            } else if(position === 4 || position === 5) {
                if(insertion.match(/^\d$/)) {
                    const onesMonth = value[this.getOffsetPosition(6, offset)];
                    if(insertion > '1') {
                        newInsertion = '0' + insertion;
                    } else if(onesMonth) {
                        const month = insertion + onesMonth;
                        if(month > '12') {
                            newInsertion = '0' + insertion;
                        } else if(month < '01') {
                            newInsertion = '01';
                        } else {
                            newInsertion = insertion;
                        }
                    } else {
                        newInsertion = insertion;
                    }

                    if(position === 4) {
                        newInsertion = '/' + newInsertion;
                    }
                    dayStale = true;
                }
            } else if(position === 6) {
                if(insertion.match(/^\d$/)) {
                    const month = value[this.getOffsetPosition(5, offset)] + insertion;
                    if (month > '12') {
                        newInsertion = '2'
                    } else if(month < '01') {
                        newInsertion = '1';
                    } else {
                        newInsertion = insertion;
                    }
                    dayStale = true;
                }
            } else if(position === 7 && insertion === '/'){
                newInsertion = '/';
            } else if(position >= 7) {
                if(insertion.match(/^\d$/)) {
                    const daysInMonth = moment(value.substring(0, 7), 'YYYY/MM').daysInMonth().toString(10);
                    if(position === 7 || position === 8) {
                        const onesDay = value[this.getOffsetPosition(9, offset)];
                        if(insertion > daysInMonth[0]) {
                            newInsertion = '0' + insertion;
                        } else if(onesDay) {
                            const day = insertion + onesDay;
                            if(day > daysInMonth) {
                                newInsertion = '0' + insertion;
                            } else if(day < '01') {
                                newInsertion = '01';
                            } else {
                                newInsertion = insertion;
                            }
                        } else {
                            newInsertion = insertion;
                        }

                        if(position === 7) {
                            newInsertion = '/' + newInsertion;
                        }
                    } else if(position === 9) {
                        const day = value[this.getOffsetPosition(8, offset)] + insertion;
                        if(day > daysInMonth) {
                            newInsertion = daysInMonth[1];
                        } else if(day < '01') {
                            newInsertion = '1';
                        } else {
                            newInsertion = insertion;
                        }
                    }
                }
            }

            addedChars = newInsertion.length;
            const newPosition = position + addedChars;
            if((newPosition === 4 || newPosition === 7) && addedChars) {
                newInsertion += '/';
                addedChars++;
            }

            newValue += newInsertion + value.substring(offsetPosition + addedChars);

            if(dayStale && newValue.length >= 10) {
                const daysInMonth = moment(newValue.substring(0, 7), 'YYYY/MM').daysInMonth().toString(10);
                const day = newValue.substring(8, 10);
                if(day > daysInMonth) {
                    newValue = newValue.substring(0, 8) + daysInMonth + newValue.substring(10);
                }
            }
        }

        return [
            newValue,
            addedChars
        ];
    };

    getOffsetPosition = (position, offset) => {
        return position + offset;
    };

    timeReplaceAtPosition = (value, position, insertion, offset) => {
        let newValue = value.substring(0, position);
        let addedChars = 0;

        const offsetPosition = position;
        position -= offset;

        if(insertion) {
            let newInsertion = "";
            if(position === 0) {
                if(insertion.match(/^\d$/)) {
                    const onesHour = value[this.getOffsetPosition(1, offset)];
                    if(insertion > '1') {
                        newInsertion = '0' + insertion;
                    } else if(onesHour) {
                        const hour = insertion + onesHour;
                        if(hour > '12') {
                            newInsertion = '0' + insertion;
                        } else if(hour < '01') {
                            newInsertion = '01';
                        } else {
                            newInsertion = insertion;
                        }
                    } else {
                        newInsertion = insertion > '1' ? '0' + insertion : insertion;
                    }
                }
            } else if(position === 1) {
                if(insertion.match(/^\d$/)) {
                    const hour = value[this.getOffsetPosition(0, offset)] + insertion;
                    if(hour > '12') {
                        newInsertion = '2';
                    } else if(hour < '01') {
                        newInsertion = '1';
                    } else {
                        newInsertion = insertion;
                    }
                }
            } else if(position === 2 && insertion === ':') {
                newInsertion = ':';
            } else if(position === 2 || position === 3) {
                if(insertion.match(/^\d$/)) {
                    const onesMinute = value[this.getOffsetPosition(4, offset)];
                    if(insertion > '5') {
                        newInsertion = '0' + insertion;
                    } else if(onesMinute) {
                        const minute = insertion + onesMinute;
                        if(minute > '59') {
                            newInsertion = '00';
                        } else {
                            newInsertion = insertion;
                        }
                    } else {
                        newInsertion = insertion;
                    }

                    if(position === 2) {
                        newInsertion = ':' + newInsertion;
                    }
                }
            } else if(position === 4) {
                if(insertion.match(/^\d$/)) {
                    newInsertion = insertion;
                }
            } else if(position === 5 && insertion === ' ' ) {
                newInsertion = ' ';
            } else if(position === 5 || position === 6) {
                const ap = insertion.toUpperCase();
                if(ap === 'A' || ap === 'P') {
                    newInsertion = ap + 'M';
                }

                if(position === 5) {
                    newInsertion = ' ' + newInsertion;
                }
            } else if(position === 7) {
                const m = insertion.toUpperCase();
                if(m === 'M') {
                    newInsertion = 'M';
                }
            }

            addedChars = newInsertion.length;
            const newPosition = position + addedChars;
            if(newPosition === 2 && addedChars) {
                newInsertion += ':';
                addedChars++;
            }

            if(newPosition === 5 && addedChars) {
                newInsertion += ' ';
                addedChars++;
            }

            newValue += newInsertion + value.substring(offsetPosition + addedChars);
        }

        return [
            newValue,
            addedChars
        ];
    };

    dateDeleteAtPosition = (value, position, offset) => {
        const offsetPosition = position;
        position -= offset;

        if(offsetPosition + 1 === value.length) {
            if(position === 4 || position === 7) {
                return [value.substring(0, offsetPosition - 1), 2];
            }

            return [value.substring(0, offsetPosition), 1];
        }

        if(position === 4 || position === 7) {
            return [this.dateReplaceAtPosition(value, offsetPosition - 1, "0", offset)[0], 2]
        }

        if((position === 3 || position === 6) && offsetPosition + 2 === value.length) {
            return [value.substring(0, offsetPosition), 1];
        }

        return [this.dateReplaceAtPosition(value, offsetPosition, "0", offset)[0], 1];
    };

    timeDeleteAtPosition = (value, position, offset) => {
        const offsetPosition = position;
        position -= offset;

        if(offsetPosition + 1 === value.length) {
            if(position === 2 || position === 5) {
                return [value.substring(0, offsetPosition - 1), 2];
            }

            if(position === 7) {
                return [value.substring(0, offsetPosition - 1), 2];
            }

            return [value.substring(0, offsetPosition), 1];
        }

        if(position === 2 || position === 5) {
            return [this.timeReplaceAtPosition(value, offsetPosition - 1, "0", offset)[0], 2];
        }

        if((position === 1 || position === 4 || position === 6) && offsetPosition + 2 === value.length) {
            return [value.substring(0, offsetPosition), 1];
        }

        return [this.timeReplaceAtPosition(value, offsetPosition, "0", offset)[0], 1];
    };

    replaceAtPosition = (value, position, insertion) => {
        const {datePicker, timePicker} = this.props;
        if(datePicker) {
            if(position <= 9) {
                const [newValue, offset] = this.dateReplaceAtPosition(value, position, insertion, 0);
                // return [newValue, offset];
                if(position + offset === 10 && offset >= 1) {
                    return [newValue.substring(0, 10) + ' ' + newValue.substring(11), offset + 1]
                } else {
                    return [newValue, offset];
                }
            } else if(timePicker) {
                if(position === 10) {
                    if(insertion === ' ') {
                        return [value.substring(0, position) + ' ' + value.substring(position + 1), 1];
                    } else if(insertion.match(/^\d$/)) {
                        value = value.substring(0, position) + ' ' + value.substring(position + 1);
                        const [newValue, offset] = this.timeReplaceAtPosition(value, position + 1, insertion, 11);
                        return [newValue, offset + 1];
                    }
                } else {
                    return this.timeReplaceAtPosition(value, position, insertion, 11);
                }
            }

            return [value, 0];
        } else if(timePicker) {
            return this.timeReplaceAtPosition(value, position, insertion, 0);
        }

        return [value, 0];
    };

    deleteAtPosition = (value, position) => {
        const {datePicker, timePicker} = this.props;
        if(datePicker) {
            if(position <= 9) {
                return this.dateDeleteAtPosition(value, position, 0);
            } else if(timePicker) {
                if(position === 10) {
                    if(value.length === position + 1) {
                        value = value.substring(0, position);
                    }
                    const [newValue, offset] = this.dateDeleteAtPosition(value, position - 1, 0);
                    return [newValue, offset + 1];
                } else {
                    return this.timeDeleteAtPosition(value, position, 11);
                }
            }
        } else if(timePicker) {
            return this.timeDeleteAtPosition(value, position, 0);
        }

        return [value, 0];
    };

    handleChange = event => {
        const {display} = this.state;
        const {target} = event;
        let {value} = target;

        // Get current cursor location
        const cursor = target.selectionStart;

        // Get change start
        const changeStart = cursor > this.selectionStart ? this.selectionStart : cursor;

        // Get change
        const change = value.substring(changeStart, cursor);

        // Cursor offset
        let offset = 0, newValue = display;
        for(let i = 0; i < change.length; i++) {
            let currentOffset;
            [newValue, currentOffset] = this.replaceAtPosition(newValue, changeStart + offset, change[i]);
            offset += currentOffset;
        }

        // Get difference after insertions
        const difference = (change.length - offset) + (display.length - value.length);

        // If there is shortage
        let deleteOffset = 0;
        if(difference > 0) {
            while(deleteOffset < difference) {
                let currentOffset;
                [newValue, currentOffset] = this.deleteAtPosition(newValue, changeStart + offset - deleteOffset + difference - 1);
                deleteOffset += currentOffset;
            }
        }

        const newCursor = deleteOffset ? cursor : changeStart + offset;

        // Set component value if complete
        let setDisplay = true;
        if(this.isComplete(newValue)) {
            // Get selected date
            const {selectedDate, datePicker, timePicker, isSelectableDate} = this.props;
            const format = [];
            if(datePicker || !timePicker) {
                format.push("YYYY/MM/DD");
            }

            if(timePicker) {
                format.push("hh:mm A");
            }

            const parseDate = moment(newValue, format.join(' '));
            const newDate = selectedDate && timePicker && !datePicker ?
                selectedDate.hour(parseDate.hour()).minute(parseDate.minute()) : parseDate;

            if(!isSelectableDate(newDate)) {
                this.blink();
                setDisplay = false;
            } else {
                this.props.onDatePick(newDate);
            }
        } else if(newValue === "") {
            this.props.onClear();
        }

        if(setDisplay) {
            this.setState({display: newValue}, () => {
                target.setSelectionRange(newCursor, newCursor);
            });
        }
    };

    isComplete = value => {
        const {datePicker, timePicker} = this.props;
        if(datePicker) {
            if(timePicker) {
                return value.length === 19
            }
        }

        if(timePicker) {
            return value.length === 8;
        }

        return value.length === 10;
    };

    handleSelect = event => {
        const {target} = event;
        const {selectionStart, selectionEnd} = target;

        if(this.maskRef) {
            this.maskRef.scrollLeft = target.scrollLeft;
        }

        this.selectionStart = selectionStart;
        this.selectionEnd = selectionEnd;
    };

    getMask = () => {
        const {datePicker, timePicker} = this.props;
        let mask = [];
        if(datePicker) {
            mask.push("YYYY/MM/DD");
        }

        if(timePicker) {
            mask.push("hh:mm aa");
        }

        return mask.join(' ');
    };

    render() {
        const {disabled, innerRef, onFocus, manualInput} = this.props;
        const {display, textError} = this.state;
        const mask = this.getMask();

        const inputStyle = {
            borderColor: this.props.isFocused ? "#3c8dbc" : undefined,
            color: textError ? "#aaa" : undefined
        };

        return (
            <div ref={this.props.containerRef} style={{backgroundColor: disabled ? "#eee" : 'white'}}
                 className="dralt-cal-input-container">
                {
                    manualInput && !disabled &&
                    <div ref={this.setMaskRef} className="dralt-cal-mask">
                        <div>
                            <span style={{color: 'white'}}>{display}</span>
                            <span>{mask.substr(display.length)}</span>
                        </div>
                    </div>
                }
                <input className="form-control" style={inputStyle} ref={innerRef} spellCheck={false}
                       onFocus={onFocus} value={display} onChange={this.handleChange} onSelect={this.handleSelect}
                       onMouseDown={this.props.onMouseDown} disabled={disabled} readOnly={!manualInput}/>
            </div>
        );
    }
}

Input.defaultProps = {
    selectedValue: null,
    containerRef: null
};

export default Input;