import React from 'react';
import PropTypes from 'prop-types';

class SidebarHeader extends React.Component {
    render() {
        return <li className="header">{this.props.label.toLocaleUpperCase()}</li>;
    }
}

SidebarHeader.propTypes = {
    label: PropTypes.string.isRequired
};

export default SidebarHeader;