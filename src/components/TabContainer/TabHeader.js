import React from 'react';
import PropTypes from 'prop-types';

class TabHeader extends React.Component {
    onClick = event => {
        event.preventDefault();
        this.props.onClick(this.props.tabId);
    };

    render() {
        const active = this.props.currentTab === this.props.tabId ? " active" : "";
        return (
            <li className={active}>
                <a href="" onClick={this.onClick}>{this.props.children}</a>
            </li>
        );
    }
}

TabHeader.propTypes = {
    currentTab: PropTypes.string,
    onClick: PropTypes.func,
    tabId: PropTypes.string,
};

export default TabHeader;