import React from 'react';
import PropTypes from 'prop-types';
import helpBlockStyle from './helpBlockStyle';

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
    maxLength: 50,
    onChange: () => {},
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
    label: PropTypes.node,
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