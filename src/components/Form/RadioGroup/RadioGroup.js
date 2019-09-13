import React from 'react';
import PropTypes from 'prop-types';

import Radio from '../Radio';

const labelStyle = {
    display: 'inline-block',
    fontWeight: 'bold',
    width: '100%'
};

class RadioGroup extends React.Component {
    componentDidMount() {
        const {simpleValue, valueKey} = this.props;
        if(this.props.firstDefault && !this.props.value && this.props.options.length) {
            const firstOption = this.props.options[0];
            this.props.onChange(this.props.name, simpleValue ? firstOption[valueKey] : firstOption);
        }
    }

    handleChange = (name, value) => {
        // TODO: Optimize this by directly using the value instead of using find
        const {options, valueKey, simpleValue} = this.props;
        value = options.find(o => o[valueKey] === value.value);
        this.props.onChange(this.props.name, simpleValue ? value[valueKey] : value);
    };

    render() {
        const {value, options, label} = this.props;
        const checkedValue = value !== Object(value) ? value: value[this.props.valueKey];

        return (
            <React.Fragment>
                { label && <span style={labelStyle}>{label}</span> }
                <div className="form-group">
                    {
                        options.map(option =>
                            <Radio key={option[this.props.valueKey]}
                                   label={option[this.props.labelKey]}
                                   value={option[this.props.valueKey]}
                                   name={this.props.name}
                                   onChange={this.handleChange}
                                   checkedValue={checkedValue}
                                   inline={this.props.inline}
                                   disabled={this.props.disabled}
                            />
                        )
                    }
                </div>
            </React.Fragment>
        );
    }
}

RadioGroup.defaultProps = {
    disabled: false,
    firstDefault: false,
    inline: false,
    onChange: () => {},
    valueKey: "value",
    labelKey: "label",
    simpleValue: false
};

RadioGroup.propTypes = {
    /** If true, interaction with the component is disabled */
    disabled: PropTypes.bool,

    /** If true, selects the first option by default upon loading of the list of options */
    firstDefault: PropTypes.bool,

    /** Set to true to make the list of options appear on the same line */
    inline: PropTypes.bool,

    /** Specifies the text to use as the label */
    label: PropTypes.node,

    /** Property name of the items in the options list from which the option label to be displayed will be taken.
     * Defaults to "label" */
    labelKey: PropTypes.string,

    /** Specifies the name of the component. It is used to distinguish elements when
     a single form change handler is used */
    name: PropTypes.string.isRequired,

    /** Callback fired when component value changes. Accepts a function with two parameters,
     namely field and value */
    onChange: PropTypes.func,

    /** Array of objects to be used as options. By default, uses the properties "label" and "value" for the labels and
     * values of each of the options respectively. */
    options: PropTypes.array.isRequired,

    /** If set to true, only the value property of the selected option is passed as value parameter in the
     * onChange handler. Otherwise, the option object itself is passed. */
    simpleValue: PropTypes.bool,

    /** Specifies the currently selected option */
    value: PropTypes.any,

    /** Property name of the items in the options list from which the value of the option will be taken.
     * Defaults to "value" */
    valueKey: PropTypes.string,
};

export default RadioGroup;