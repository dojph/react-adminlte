import React from 'react';
import DropdownButton from "doj-react-adminlte/DropdownButton";

export default class ExampleDropdownButton extends React.Component {
    handleGenerateReport = () => {
        console.log("Submit1");
    };

    handleLogout = () => {
        console.log("Submit2");
    };

    render() {
        return (
            <DropdownButton label="Submit" className="btn btn-default btn-block">
                <DropdownButton.MenuItem label="Submit1"
                                         onClick={this.handleGenerateReport}/>
                <DropdownButton.Divider/>
                <DropdownButton.MenuItem label="Submit2"
                                         onClick={this.handleLogout}/>
            </DropdownButton>
        );
    }
}