import React from 'react';
import PropTypes from 'prop-types';

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name
        };
    }

    handleChange = event => {
        if(this.props.onChange) {
            this.props.onChange(this.state.name, event.target.value);
        }
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
        const errors = this.props.errors[this.state.name] || [];
        let errorList = null;
        if(errors.length > 0) {
            errorList =
                <ul className='help-block'>
                    {errors.map((e, index) => <li key={index}><span>{e}</span></li>)}
                </ul>;
        }

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
                { errorList }
            </div>
        );
    }
}

TextInput.defaultProps = {
    disabled: false,
    errors: {},
    gridClass: "",
    feedbackIconLeft: false,
    maxLength: 50,
    type: "text"
};

TextInput.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.objectOf(
        PropTypes.arrayOf(PropTypes.string)
    ),
    feedbackIconClass: PropTypes.string,
    feedbackIconLeft: PropTypes.bool,
    gridClass: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onEnterKey: PropTypes.func,
    onKeyUp: PropTypes.func,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    type: PropTypes.oneOf(['text', 'password']),
    value: PropTypes.string
};

export default TextInput;