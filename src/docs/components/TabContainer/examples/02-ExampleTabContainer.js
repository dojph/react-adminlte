import React from 'react';

import TabContainer from "doj-react-adminlte/TabContainer";
import Tab from "doj-react-adminlte/TabContainer/Tab";
import TabToolBox from "doj-react-adminlte/TabContainer/TabToolBox";

const buttonStyle = {
    width: '120px'
};

export default class ExampleTabContainer extends React.Component {
    handleClick = () => {
        console.log("Clicked!");
    };

    render() {
        return (
            <TabContainer defaultTab="profile">
                <TabToolBox>
                    <button onClick={this.handleClick} type="button" className="btn btn-primary" style={buttonStyle}>
                        <i className="fa fa-thumbs-up margin-r-5"/>Click Me!
                    </button>
                </TabToolBox>
                <Tab label="Home" tabId="home">
                    <h4>Home Tab</h4>
                </Tab>
                <Tab label="Profile" tabId="profile">
                    <h4>Profile Tab</h4>
                </Tab>
                <Tab label="Settings" tabId="settings">
                    <h4>Settings Tab</h4>
                </Tab>
            </TabContainer>
        );
    }
}