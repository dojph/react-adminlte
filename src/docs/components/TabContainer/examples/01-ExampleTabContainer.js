import React from 'react';
import TabContainer from "doj-react-adminlte/TabContainer";
import Tab from "doj-react-adminlte/TabContainer/Tab";
import TabUtilityButton from "doj-react-adminlte/TabContainer/TabUtilityButton";

export default class ExampleTabContainer extends React.Component {
    render() {
        return (
            <TabContainer defaultTab="profile">
                <TabUtilityButton onClick={() => { console.log("Clicked!"); }}
                                  label={<span><i className="fa fa-save margin-r-5"/>Save</span>}
                                  className="btn btn-primary"/>
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