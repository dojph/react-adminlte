import React from 'react';
import PropTypes from 'prop-types';

class CheckBox extends React.Component {
    handleChange = event => {
        this.props.onChange(this.props.name, event.target.checked)
    };

    render() {
        if(this.props.inline) {
            return (
                <label className="checkbox-inline">
                    <input type="checkbox" value={this.props.value}
                           checked={this.props.checked}
                           onChange={this.handleChange}/>
                    {this.props.label}
                </label>
            );
        } else {
            return (
                <div className="checkbox">
                    <label>
                        <input type="checkbox" value={this.props.label}
                               checked={this.props.checked}
                               onChange={this.handleChange}
                               disabled={this.props.disabled}/>
                        {this.props.label}
                    </label>
                </div>
            );
        }
    }
}

CheckBox.defaultProps = {
    checked: false,
    disabled: false,
    inline: false,
    onChange: () => {}
};

CheckBox.propTypes = {
    /** Sets the checked state of the component. */
    checked: PropTypes.bool,

    /** Enables/disables user interaction with the component.*/
    disabled: PropTypes.bool,

    /** Set to true if you want the checkboxes to appear on the same line.*/
    inline: PropTypes.bool,

    /** Specifies the text to use as the label*/
    label: PropTypes.node.isRequired,

    /** Specifies the name of the component.
     * It is used to distinguish elements
     * when a single form change handler is used*/
    name: PropTypes.string.isRequired,

    /** Callback fired when component value changes.
     * Accepts a function with two parameters, namely field and value*/
    onChange: PropTypes.func,
};

export default CheckBox;