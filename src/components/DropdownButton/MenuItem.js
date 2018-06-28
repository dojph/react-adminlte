import React from 'react';
import PropTypes from 'prop-types';

class MenuItem extends React.Component {
    handleClick = event => {
        event.preventDefault();
        this.props.onClick();
        this.props.closeMenuCallback();
    };

    render() {
        return (
            <li>
                <a href="" onClick={this.handleClick}>{this.props.label}</a>
            </li>
        );
    }
}

MenuItem.defaultProps = {
    onClick: () => {},
    closeMenuCallback: () => {}
};

MenuItem.propTypes = {
    closeMenuCallback: PropTypes.func,
    label: PropTypes.string,
    onClick: PropTypes.func
};

export default MenuItem;