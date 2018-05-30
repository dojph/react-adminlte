import React from 'react';
import Form from "doj-react-adminlte/Form";
import TextInput from "doj-react-adminlte/Form/TextInput";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: ""
        };
    }

    handleChange = (name, value) => {
        this.setState({[name]: value});
    };

    render() {
        return (
            <div className="row">
                <Form onChange={this.handleChange}>
                    <div className="col-xs-6">
                        <TextInput name="name" value={this.state.name} label="Name"/>
                    </div>
                    <div className="col-xs-6">
                        <TextInput name="password" value={this.state.password} label="Password" type="password"/>
                    </div>
                </Form>
            </div>
        );
    }
}