import React from 'react';
import PropTypes from 'prop-types';
import TetheredDateTime from './TetheredDateTime';
import helpBlockStyle from './helpBlockStyle';

class CalendarInput extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
    }

    handleChange = date => {
        this.props.onChange(this.name, date);
    };

    render() {
        // Check for form errors
        const errors = this.props.errors[this.name] || [];

        return (
            <div className={"form-group " + (errors.length > 0 ? "has-error " : "") + (this.props.gridClass || "")}>
                {this.props.label && <label>{this.props.label}</label>}
                <div className="input-group">
                    <div className="input-group-addon">
                        <i className={this.props.iconClass}/>
                    </div>
                    <TetheredDateTime
                        inputProps={{readOnly: !this.props.disabled, disabled: this.props.disabled}}
                        onChange={this.handleChange}
                        value={this.props.value}
                        isValidDate={this.props.dateValidator}
                        timeConstraints={this.props.timeConstraints}
                        closeOnSelect={!this.props.timeFormat}
                        className={this.props.innerClass}
                        timeFormat={this.props.timeFormat}
                        dateFormat={this.props.dateFormat}
                    />
                </div>
                {
                    errors.length > 0 &&
                    <ul style={helpBlockStyle}>
                        {errors.map((e, index) => <li key={index}><span>{e}</span></li>)}
                    </ul>
                }
            </div>
        );
    }
}

CalendarInput.defaultProps = {
    dateFormat: true,
    disabled: false,
    errors: {},
    iconClass: "fa fa-calendar",
    timeFormat: true,
    onChange: () => {}
};

CalendarInput.propTypes = {
    dateFormat: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    disabled: PropTypes.bool,
    errors: PropTypes.objectOf(
        PropTypes.arrayOf(PropTypes.string)
    ),
    gridClass: PropTypes.string,
    iconClass: PropTypes.string,
    innerClass: PropTypes.string,
    dateValidator: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    timeConstraints: PropTypes.object,
    timeFormat: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    value: PropTypes.any,
};

export default CalendarInput;