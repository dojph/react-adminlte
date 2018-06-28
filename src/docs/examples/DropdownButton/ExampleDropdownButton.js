import React from 'react';
import DropdownButton from "doj-react-adminlte/DropdownButton";

export default class ExampleDropdownButton extends React.Component {
    handleGenerateReport = () => {
        console.log("Generating report...");
    };

    handleLogout = () => {
        console.log("Logging out...");
    };

    render() {
        return (
            <DropdownButton label="Actions" className="btn btn-default btn-block">
                <DropdownButton.MenuItem label="Generate Reports"
                                         onClick={this.handleGenerateReport}/>
                <DropdownButton.Divider/>
                <DropdownButton.MenuItem label="Logout"
                                         onClick={this.handleLogout}/>
            </DropdownButton>
        );
    }
}