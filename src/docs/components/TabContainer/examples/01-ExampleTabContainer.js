import React from 'react';

import TabContainer from "doj-react-adminlte/TabContainer";
import Tab from "doj-react-adminlte/TabContainer/Tab";

export default class ExampleTabContainer extends React.Component {
    render() {
        return (
            <TabContainer defaultTab="profile">
                <Tab label="Home" tabId="home">
                    <h4>Tab helps you manage or group sections in your website.</h4>
                </Tab>
            </TabContainer>
        );
    }
}