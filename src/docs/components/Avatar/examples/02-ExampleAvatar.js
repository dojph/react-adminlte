import React from 'react';
import Avatar from "doj-react-adminlte/Avatar";

export default class ExampleAvatar extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Avatar
                    firstName='Chelzy'
                    lastName='Baldovino'
                    round={true}
                    size={50}>
                </Avatar>
                <Avatar
                    firstName='Chelzy'
                    lastName='Baldovino'
                    round={true}
                    size={100}>
                </Avatar>
                <Avatar
                    firstName='Chelzy'
                    lastName='Baldovino'
                    round={true}
                    size={150}>
                </Avatar>
            </React.Fragment>
        );
    }
}