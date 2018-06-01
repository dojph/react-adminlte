import React from 'react';
import PropTypes from 'prop-types';

class TabUtilityButton extends React.Component {
    render() {
        const className = this.props.className || "btn btn-default";
        const style = {
            width: '120px',
            marginTop: '2px',
            marginLeft: '5px'
        };

        return (
            <button onClick={this.props.onClick} type="button" className={className} style={style}>
                {this.props.label}
            </button>
        );
    }
}

TabUtilityButton.defaultProps = {
    label: "",
};

TabUtilityButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    label: PropTypes.node
};

export default TabUtilityButton;