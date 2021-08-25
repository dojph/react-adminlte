import React from 'react';
import PropTypes from 'prop-types';
import helpBlockStyle from '../helpBlockStyle';

class TextInput extends React.Component {
    handleChange = event => {
        this.props.onChange(this.props.name, event.target.value);
    };

    handleKeyUp = event => {
        if(event.key === 'Enter' && this.props.onEnterKey) {
            this.props.onEnterKey();
        }

        if(this.props.onKeyUp) {
            this.props.onKeyUp(event);
        }
    };

    render() {
        let {gridClass, feedbackIconClass, feedbackIconLeft} = this.props;
        if(feedbackIconClass) {
            gridClass += " has-feedback";
        }
        if(feedbackIconLeft) {
            gridClass += " has-feedback-left";
        }
        const value = this.props.value || "";

        // Check for form errors
        const errors = this.props.errors[this.props.name] || [];

        return (
            <div className={"form-group " + (errors.length > 0 ? "has-error " : "") + gridClass}>
                {
                    this.props.label &&
                    <label>{this.props.label}</label>
                }
                <input placeholder={this.props.placeholder} className="form-control" type={this.props.type}
                       onChange={this.handleChange} value={value} onKeyUp={this.handleKeyUp}
                       disabled={this.props.disabled} maxLength={this.props.maxLength}/>
                {
                    feedbackIconClass &&
                    <span className={feedbackIconClass + " form-control-feedback"}/>
                }
                {
                    errors.length > 0 &&
                    <ul className='help-block' style={helpBlockStyle}>
                        {errors.map((e, index) => <li key={index}><span>{e}</span></li>)}
                    </ul>
                }
            </div>
        );
    }
}

TextInput.defaultProps = {
    disabled: false,
    errors: {},
    gridClass: "",
    feedbackIconLeft: false,
    onChange: () => {},
    type: "text"
};

TextInput.propTypes = {
    /** If true, user won't be able to interact with the component.*/
    disabled: PropTypes.bool,

    errors: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),

    /** Specifies the icon class to be displayed within the component */
    feedbackIconClass: PropTypes.string,

    /** When set to true, the icon is placed at the left side of the component*/
    feedbackIconLeft: PropTypes.bool,

    /** Layout that arranges views of the component */
    gridClass: PropTypes.string,

    /** Specifies the text to use as the label */
    label: PropTypes.node,

    /** Specifies the name of the component. It is used to distinguish elements
     * when a single form change handler is used. */
    name: PropTypes.string.isRequired,

    /** Callback fired when component value changes. Accepts a function with two parameters, namely field and value */
    onChange: PropTypes.func,

        // TODO:
    //onEnterKey: PropTypes.func,

        // TODO:
    //onKeyUp: PropTypes.func,

    /** Specifies a short hint that describes the expected value of
     * an input field */
    placeholder: PropTypes.string,

    /** Specifies the maximum number of characters allowed in the
     * component */
    maxLength: PropTypes.number,

    /** Specifies the type. Can be one of: text, password */
    type: PropTypes.oneOf(['text', 'password']),

    /** Specifies the current value for an input field */
    value: PropTypes.string
};

TextInput.isFormComponent = true;
export default TextInput;