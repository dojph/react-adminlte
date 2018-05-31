import React from 'react';
import PropTypes from 'prop-types';

import helpBlockStyle from './helpBlockStyle';

class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
    }

    handleChange = event => {
        const {files} = event.target;
        this.props.onChange(this.name, files.length > 0 ? files[0] : null);
    };

    render() {
        const {gridClass, label} = this.props;

        // Check for form errors
        const errors = this.props.errors[this.props.name] || [];

        return (
            <div className={"form-group " + (errors.length > 0 ? "has-error " : "") + (gridClass || "")}>
                {label && <label>{label}</label>}
                <input type="file" onChange={this.handleChange}/>
                {
                    errors.length > 0 &&
                    <ul style={helpBlockStyle}>
                        {errors.map((e, i) => <li key={i}><span>{e}</span></li>)}
                    </ul>
                }
            </div>
        );
    }
}

FileInput.defaultProps = {
    errors: {},
    onChange: () => {}
};

FileInput.propTypes = {
    errors: PropTypes.objectOf(
        PropTypes.arrayOf(PropTypes.string)
    ),
    gridClass: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

export default FileInput;