import React from 'react';
import DropdownButton from "doj-react-adminlte/DropdownButton";

export default class ExampleDropdownButton extends React.Component {
    handleGenerateReport = () => {
        console.log("Generating report...")
    };

    handleLogout = () => {
        console.log("Logging out...");
    };

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-xs-2">
                        <DropdownButton label="Actions" className="btn btn-warning btn-md">
                            <DropdownButton.MenuItem label="Generate Reports"
                                                     onClick={this.handleGenerateReport}/>
                            <DropdownButton.Divider/>
                            <DropdownButton.MenuItem label="Logout"
                                                     onClick={this.handleLogout}/>
                        </DropdownButton>
                        <p>Dropdown with Divider</p>
                    </div>
                    <div className="col-xs-2">
                        <DropdownButton label="Actions" className="btn btn-info btn-md">
                            <DropdownButton.MenuItem label="Generate Reports"
                                                     onClick={this.handleGenerateReport}/>
                            <DropdownButton.MenuItem label="Logout"
                                                     onClick={this.handleLogout}/>
                        </DropdownButton>
                        <p>Dropdown without Divider</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}