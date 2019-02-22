import React from 'react';
import Avatar from "doj-react-adminlte/Avatar";

export default class ExampleAvatar extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-xs-3">
                        <Avatar
                            firstName='Chelzy'
                            lastName='Baldovino'
                            round={true} />
                        <p>First and Last Name Initials</p>
                    </div>
                    <div className="col-xs-3">
                        <Avatar
                            firstName='Chelzy'
                            round={true} />
                        <p>First Name Initial</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}