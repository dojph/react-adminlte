import React from 'react';
import PropTypes from 'prop-types';
import TabUtilityButton from "./TabUtilityButton";
import Tab from "./Tab";
import TabHeader from "./TabHeader";

class TabContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: props.defaultTab
        };
    }

    handleTabClick = tab => {
        if(typeof this.props.onTabClick === 'undefined') {
            this.setState({
                currentTab: tab
            });
        } else {
            this.props.onTabClick(tab);
        }
    };

    render() {
        let tabChildren = React.Children.toArray(this.props.children);

        // If activeTab is undefined, let this component take control of the tab changes
        const activeTab = typeof this.props.activeTab !== 'undefined' ?
            this.props.activeTab : this.state.currentTab;

        const utilityButtons = tabChildren.filter(child => child.type === TabUtilityButton);
        tabChildren = tabChildren.filter(child => child.type === Tab);
        const tabHeaders = tabChildren.map(
            tab => <TabHeader currentTab={activeTab} tabId={tab.props.tabId}
                              onClick={this.handleTabClick}
                              key={tab.props.tabId}>{tab.props.label}</TabHeader>
        );
        let activeChild = tabChildren.find(tab => tab.props.tabId === activeTab);
        if(activeChild) {
            activeChild = React.cloneElement(activeChild, {
                key: activeChild.props.tabId,
                currentTab: activeTab
            });
        }

        return (
            <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                    {tabHeaders}
                    {
                        utilityButtons.length > 0 &&
                        <li style={{float: 'right'}}>
                            {utilityButtons}
                        </li>
                    }
                </ul>
                <div className="tab-content">
                    {activeChild}
                </div>
            </div>
        );
    }
}

TabContainer.propTypes = {
    defaultTab: PropTypes.string,
    activeTab: PropTypes.string,
    onTabClick: PropTypes.func
};

export default TabContainer;