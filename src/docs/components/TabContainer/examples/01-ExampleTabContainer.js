import React from 'react';

import TabContainer from "doj-react-adminlte/TabContainer";
import Tab from "doj-react-adminlte/TabContainer/Tab";

export default class ExampleTabContainer extends React.Component {
    render() {
        return (
            <TabContainer defaultTab="home">
                <Tab label="Home" tabId="home">
                    <p>Tab helps you manage or group sections in your website.</p>
                </Tab>
                <Tab label="Example" tabId="example">
                    <p>My new example tab.</p>
                </Tab>
            </TabContainer>
        );
    }
}