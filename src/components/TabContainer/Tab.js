import React from 'react';
import PropTypes from 'prop-types';

class Tab extends React.Component {
    render() {
        const tabClass = "tab-pane" + (this.props.currentTab === this.props.tabId ? " active" : "");
        return (
            <div className={tabClass}>
                {this.props.children}
            </div>
        );
    }
}

Tab.propTypes = {
    currentTab: PropTypes.string,
    tabId: PropTypes.string.isRequired
};

export default Tab;