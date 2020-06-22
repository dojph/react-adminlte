import React from 'react';
import {SelectInput} from "doj-react-adminlte/Form";

export default class SelectInput2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    handleChange = (name, value) => {
        this.setState({[name]: [value]});
    };

    render () {
        const names = [
            {label: "Jack Aranda", value: "Jack Aranda"},
            {label: "Allie Grater", value: "Allie Grater"},
            {label: "Frank N. Stein", value: "Frank N. Stein"},
            {label: "Lois Di Nominator\n", value: "Lois Di Nominator\n"},
            {label: "Toi Story", value: "Toi Story"},
            {label: "Hugh N. Cry", value: "Hugh N. Cry"},
            {label: "Willie Findit", value: "Willie Findit"},

        ];
        return (
            <SelectInput name="name"
                         label="Name"
                         options={names}
                         searchable
                         clearable
                         value={this.state.name}
                         onChange={this.handleChange}/>
        );
    }
}