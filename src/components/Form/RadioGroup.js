import React from 'react';
import PropTypes from 'prop-types';

import Radio from './Radio';

const labelStyle = {
    display: 'inline-block',
    fontWeight: 'bold',
    width: '100%'
};

class RadioGroup extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
    }

    componentDidMount() {
        if(this.props.firstDefault && !this.props.value && this.props.options.length) {
            this.props.onChange(this.props.name, this.props.options[0]);
        }
    }

    handleChange = (nameUnused, value) => {
        // TODO: Optimize this by directly using the value instead of using find
        const {options, valueKey, simpleValue} = this.props;
        value = options.find(o => o[valueKey] === value.value);
        this.props.onChange(this.name, simpleValue ? value[valueKey] : value);
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
                                   name={this.name}
                                   onChange={this.handleChange}
                                   checkedValue={checkedValue}
                                   inline={this.props.inline}
                            />
                        )
                    }
                </div>
            </React.Fragment>
        );
    }
}

RadioGroup.defaultProps = {
    firstDefault: false,
    inline: false,
    onChange: () => {},
    valueKey: "value",
    labelKey: "label"
};

RadioGroup.propTypes = {
    firstDefault: PropTypes.bool,
    inline: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    options: PropTypes.array.isRequired,
    value: PropTypes.any,
    valueKey: PropTypes.string,
};

export default RadioGroup;