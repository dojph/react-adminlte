import React from 'react';
import PropTypes from 'prop-types';

import helpBlockStyle from './helpBlockStyle';

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
    constructor(props) {
        super(props);
        this.name = props.name;
    }

    handleChange = event => {
        this.props.onChange(this.name, event.target.value);
    };

    render() {
        const value = this.props.value || "";

        // Check for form errors
        const errors = this.props.errors[this.name] || [];
        let errorList = null;
        if(errors.length > 0) {
            errorList =
                <ul className='help-block' style={helpBlockStyle}>
                    { errors.map((e, index) => <li key={index}><span>{e}</span></li>) }
                </ul>;
        }

        return (
            <div className={"form-group " + (errors.length > 0 ? "has-error " : "") + (this.props.gridClass || "")}>
                <label>{this.props.label}</label>
                <div style={containerStyle}>
                    <textarea readOnly={this.props.readOnly} className="form-control"
                              placeholder={this.props.placeholder} onChange={this.handleChange} value={value}
                              maxLength={this.props.maxLength} style={{height: '140px'}}/>
                    {
                        this.props.showCounter &&
                        <span className="text-muted" style={counterStyle}>
                            {this.props.value ? this.props.value.length : 0} / {this.props.maxLength}
                        </span>
                    }
                </div>
                {errorList}
            </div>
        );
    }
}

TextArea.defaultProps = {
    errors: {},
    maxLength: 500,
    onChange: () => {},
    readOnly: false,
    showCounter: false
};

TextArea.propTypes = {
    errors: PropTypes.object,
    gridClass: PropTypes.string,
    label: PropTypes.string,
    maxLength: PropTypes.number,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    value: PropTypes.string
};

export default TextArea;