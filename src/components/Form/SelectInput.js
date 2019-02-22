import React from 'react';
import PropTypes from 'prop-types';

import TetheredSelect from './TetheredSelect';
import './selectInputStyles.css';
import helpBlockStyle from "./helpBlockStyle";

class SelectInput extends React.Component {
    handleChange = item => {
        let value = this.props.simpleValue ? item : (item && item[this.props.valueKey]);
        let currentValue = this.props.simpleValue ? this.props.value : (this.props.value && this.props.value[this.props.valueKey]);

        switch(value) {
            case "__defaultNull":
                value = null;
                break;
            case "__defaultZero":
                value = "0";
                break;
            default:
        }

        if(value !== currentValue) {
            this.props.onChange(this.props.name, item);
        }
    };

    render() {
        let modValue;
        if (this.props.value === null) {
            modValue = "__defaultNull";
        } else if (this.props.value === "0") {
            modValue = "__defaultZero";
        } else {
            modValue = this.props.value;
        }

        const modOptions = (this.props.options && this.props.options.map(option => {
            if (option.value === "0") {
                return {
                    [this.props.labelKey]: option[this.props.labelKey],
                    [this.props.valueKey]: "__defaultZero"
                };
            } else if (option[this.props.valueKey] === null) {
                return {
                    [this.props.labelKey]: option[this.props.labelKey],
                    [this.props.valueKey]: "__defaultNull"
                };
            } else return option;
        })) || [];

        // Check for form errors
        const errors = this.props.errors[this.props.name] || [];

        return (
            <div className={"form-group " + (errors.length > 0 ? "has-error " : "" ) + (this.props.gridClass || "")}>
                {
                    this.props.label &&
                    <label className={this.props.disabled ? "disabled" : null}>
                        {this.props.label}
                    </label>
                }
                <TetheredSelect
                    onChange={this.handleChange}
                    value={modValue}
                    labelKey={this.props.labelKey}
                    valueKey={this.props.valueKey}
                    searchable={this.props.searchable}
                    clearable={this.props.clearable}
                    placeholder={this.props.disabled ? "N/A" : "Select..."}
                    options={modOptions}
                    optionRenderer={this.props.optionRenderer}
                    disabled={this.props.disabled}
                    simpleValue={this.props.simpleValue}
                    valueRenderer={this.props.valueRenderer}
                />
                {
                    errors.length > 0 &&
                    <ul className='help-block' style={helpBlockStyle}>
                        { errors.map((e, index) => <li key={index}><span>{e}</span></li>)}
                    </ul>
                }
            </div>
        );
    }
}

SelectInput.defaultProps = {
    clearable: false,
    disabled: false,
    errors: {},
    labelKey: "label",
    onChange: () => {},
    options: [],
    searchable: false,
    simpleValue: false,
    value: null,
    valueKey: "value"
};

SelectInput.propTypes = {
    clearable: PropTypes.bool,
    disabled: PropTypes.bool,
    errors: PropTypes.objectOf(
        PropTypes.arrayOf(PropTypes.string)
    ),
    gridClass: PropTypes.string,
    label: PropTypes.string,
    labelKey: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    optionRenderer: PropTypes.func,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    searchable: PropTypes.bool,
    simpleValue: PropTypes.bool,
    value: PropTypes.any,
    valueKey: PropTypes.string,
    valueRenderer: PropTypes.func
};

export default SelectInput;