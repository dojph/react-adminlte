import React from 'react';
import {SelectInput} from "doj-react-adminlte/Form";

export default class SelectInput3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: ''
        }
    }

    handleOnChange = (name, value) => {
        this.setState({[name]: value});
    };

    render () {
        const age = [
            {label: "Ten", value: "Ten"},
            {label: "Twenty", value: "Twenty"},
            {label: "Thirty", value: "Thirty"},
            {label: "Forty", value: "Forty"},
            {label: "Fifty", value: "Fifty"},
            {label: "Sixty", value: "Sixty"},
            {label: "Seventy", value: "Seventy"},
        ];
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-xs-4">
                        <SelectInput value={this.state.age}
                                     name="age"
                                     options={age}
                                     searchable
                                     onChange={this.handleOnChange}
                                     clearable/>
                    </div>
                    <div className="col-xs-4">
                        <SelectInput name="age"
                                     placeholder="This is a placeholder"
                                     options={age}
                                     value={this.state.age}/>
                    </div>
                    <div className="col-xs-4">
                        <SelectInput name="age"
                            value={this.state.age}
                            disabled/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}