import React from 'react';
import PropTypes from 'prop-types';

import TetheredSelect from './TetheredSelect';

const selectStyle = {
    borderColor: '#d2d6de',
    borderRadius: 0,
    height: '34px'
};

class SelectInput extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
    }

    handleChange = item => {
        let value = this.props.simpleValue ? item : item[this.props.valueKey];
        switch(value) {
            case "__defaultNull":
                value = null;
                break;
            case "__defaultZero":
                value = "0";
                break;
            default:
                value = item;
                break;
        }

        this.props.onChange(this.name, value);
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
        const errors = this.props.errors[this.name] || [];
        let errorList = null;
        if(errors.length > 0) {
            errorList = <ul className='help-block'>
                { errors.map((e, index) => <li key={index}><span>{e}</span></li>)}
            </ul>
        }

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
                    disabled={this.props.disabled}
                    simpleValue={this.props.simpleValue}
                    style={selectStyle}
                />
                { errorList }
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
    options: PropTypes.array,
    placeholder: PropTypes.string,
    searchable: PropTypes.bool,
    simpleValue: PropTypes.bool,
    value: PropTypes.any,
    valueKey: PropTypes.string
};

export default SelectInput;