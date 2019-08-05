import React from 'react';
import PropTypes from 'prop-types';

import helpBlockStyle from '../helpBlockStyle';

const containerStyle = {
    position: 'relative'
};

const counterStyle = {
    zIndex: 10,
    position: 'absolute',
    right: '10px',
    bottom: '4px'
};

class TextArea extends React.Component {
    handleChange = event => {
        this.props.onChange(this.props.name, event.target.value);
    };

    render() {
        const value = this.props.value || "";

        // Check for form errors
        const errors = this.props.errors[this.props.name] || [];

        return (
            <div className={"form-group " + (errors.length > 0 ? "has-error " : "") + (this.props.gridClass || "")}>
                <label>{this.props.label}</label>
                <div style={containerStyle}>
                    <textarea readOnly={this.props.readOnly} className="form-control"
                              placeholder={this.props.placeholder} onChange={this.handleChange} value={value}
                              maxLength={this.props.maxLength} style={{height: '140px'}} disabled={this.props.disabled}/>
                    {
                        this.props.showCounter &&
                        <span className="text-muted" style={counterStyle}>
                            {this.props.value ? this.props.value.length : 0} / {this.props.maxLength}
                        </span>
                    }
                </div>
                {
                    errors.length > 0 &&
                    <ul className='help-block' style={helpBlockStyle}>
                        { errors.map((e, index) => <li key={index}><span>{e}</span></li>) }
                    </ul>
                }
            </div>
        );
    }
}

TextArea.defaultProps = {
    disabled: false,
    errors: {},
    maxLength: 500,
    onChange: () => {},
    readOnly: false,
    showCounter: false
};

TextArea.propTypes = {
    /** Set to true to disable the TextArea*/
    disabled: PropTypes.bool,
    errors: PropTypes.objectOf(
        PropTypes.arrayOf(PropTypes.string)
    ),
    showCounter: PropTypes.bool,
    /** Specifies a Bootstrap 3 grid class*/
    gridClass: PropTypes.string,
    /** Specifies the text to use as the label of a particular TextArea*/
    label: PropTypes.node,
    /** You can define the maximum length of the TextArea in this props*/
    maxLength: PropTypes.number,
    /** Specifies the name of the component*/
    name: PropTypes.string.isRequired,
    /** Callback fired when component value changes. Accepts a function with two parameters, namely field and value*/
    onChange: PropTypes.func,
    /** Serves as a hint that describes the expect the value of the TextArea component*/
    placeholder: PropTypes.string,
    /** Set to true to make the TextArea as readonly*/
    readOnly: PropTypes.bool,
    /** The value prop specifies the initial value of the TextArea component*/
    value: PropTypes.string
};

export default TextArea;