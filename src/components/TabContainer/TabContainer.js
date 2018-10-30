import React from 'react';
import PropTypes from 'prop-types';
import TabToolBox from "./TabToolBox";
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

        const tabToolBox = tabChildren.find(child => child.type === TabToolBox);

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
                    {tabToolBox}
                </ul>
                <div className="tab-content">
                    {activeChild}
                </div>
            </div>
        );
    }
}

TabContainer.propTypes = {
    /** You can set the default tab in this prop.*/
    defaultTab: PropTypes.string,
    /** Prop that can control the tab externally.*/
    activeTab: PropTypes.string,
    /** The function that is binded will be invoked after clicking the tab button.*/
    onTabClick: PropTypes.func
};

export default TabContainer;