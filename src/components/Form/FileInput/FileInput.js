import React from 'react';
import PropTypes from 'prop-types';

import helpBlockStyle from '../helpBlockStyle';

class FileInput extends React.Component {
    handleChange = event => {
        const {files} = event.target;
        this.props.onChange(this.props.name, files.length > 0 ? files[0] : null);
    };

    render() {
        const {gridClass, label} = this.props;

        // Check for form errors
        const errors = this.props.errors[this.props.name] || [];

        return (
            <div className={"form-group " + (errors.length > 0 ? "has-error " : "") + (gridClass || "")}>
                {label && <label>{label}</label>}
                <input type="file" onChange={this.handleChange} disabled={this.props.disabled}/>
                {
                    errors.length > 0 &&
                    <ul className="help-block" style={helpBlockStyle}>
                        {errors.map((e, i) => <li key={i}><span>{e}</span></li>)}
                    </ul>
                }
            </div>
        );
    }
}

FileInput.defaultProps = {
    disabled: false,
    errors: {},
    onChange: () => {}
};

FileInput.propTypes = {
    /** If true, interaction with the component is disabled */
    disabled: PropTypes.bool,
    errors: PropTypes.objectOf(
        PropTypes.arrayOf(PropTypes.string)
    ),
    
    /** Specifies a Bootstrap 3 grid class */
    gridClass: PropTypes.string,

    /** Specifies the text to use as the label */
    label: PropTypes.node,

    /** Specifies the name of the component. It is used to distinguish elements when
     a single form change handler is used */
    name: PropTypes.string.isRequired,

    /** Callback fired when component value changes. Accepts a function with two parameters,
     namely field and value */
    onChange: PropTypes.func,
};

export default FileInput;