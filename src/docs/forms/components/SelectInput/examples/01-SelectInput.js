import React from 'react';
import {SelectInput} from "doj-react-adminlte/Form";

export default class SelectInput1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    handleOnChange = (name, value) => {
        this.setState({[name]: [value]});
    };

    render () {
        const names = [
            {label: "John Doe", value: "John Doe"},
            {label: "Ty Ayelloribbin", value: "Ty Ayelloribbin"},
            {label: "Aida Bugg", value: "Aida Bugg"},
            {label: "Olive Yew", value: "Olive Yew"}
        ];

        return (
            <SelectInput name="name"
                         label="Name"
                         options={names}
                         onChange={this.handleOnChange}
                         value={this.state.name}/>
        );
    }
}