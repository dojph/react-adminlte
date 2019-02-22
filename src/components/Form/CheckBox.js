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
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    inline: PropTypes.bool,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

export default CheckBox;