import React from 'react';
import PropTypes from 'prop-types';

class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
    }

    handleChange = event => {
        let value = event.target.value;

        if(value === "__BOOL_true") {
            value = true;
        } else if(value === "__BOOL_false") {
            value = false;
        } else if(value.startsWith("__NUMBER_")) {
            value = Number(value.substr(9));
        }

        this.props.onChange(this.name, {label: this.props.label, value})
    };

    render() {
        let {value, checkedValue} = this.props;
        const checked = value === checkedValue;

        if(value === true) {
            value = "__BOOL_true";
        } else if(value === false) {
            value = "__BOOL_false";
        } else if(typeof value === 'number') {
            value = "__NUMBER_" + value;
        }

        if(this.props.inline) {
            return (
                <label className="radio-inline">
                    <input type="radio" value={value} checked={checked} onChange={this.handleChange}/>
                    {this.props.label}
                </label>
            );
        } else {
            return (
                <div className="radio">
                    <label>
                        <input type="radio" value={value} checked={checked} onChange={this.handleChange}/>
                        {this.props.label}
                    </label>
                </div>
            );
        }
    }
}

Radio.defaultProps = {
    checkedValue: false,
    inline: false,
    onChange: () => {}
};

Radio.propTypes = {
    inline: PropTypes.bool,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    checkedValue: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
    ])
};

export default Radio;