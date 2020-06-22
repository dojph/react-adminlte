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
    /** Bind the error message' object in this prop that will be executed when the validation failed*/
    errors: PropTypes.objectOf(
        PropTypes.arrayOf(PropTypes.string)
    ),
    /** This prop shows the maximum length available in the TextArea*/
    showCounter: PropTypes.bool,
    /** Specifies a Bootstrap 3 grid class*/
    gridClass: PropTypes.string,
    /** Specifies the text to use as the label of the TextArea*/
    label: PropTypes.node,
    /** This prop is used to set the maximum length of the TextArea*/
    maxLength: PropTypes.number,
    /** Specifies the name of the component*/
    name: PropTypes.string.isRequired,
    /** Callback fired when component value changes. This accepts a function with two parameters, namely field and value*/
    onChange: PropTypes.func,
    /** Serves as a hint that describes the expected value of a TextArea*/
    placeholder: PropTypes.string,
    /** Set to true to keep a user from changing the value until some other conditions have been met*/
    readOnly: PropTypes.bool,
    /** This prop specifies the initial value of a particular TextArea*/
    value: PropTypes.string
};

export default TextArea;