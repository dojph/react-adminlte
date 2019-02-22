import React from 'react';
import DropdownButton from "doj-react-adminlte/DropdownButton/DropdownButton";

export default class ExampleDropdownButton extends React.Component{
    render () {
        return (
            <DropdownButton label="Disabled" className="btn btn-danger" />
        );
    }
}