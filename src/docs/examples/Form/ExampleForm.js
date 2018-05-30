import React from 'react';
import Form from "doj-react-adminlte/Form";
import TextInput from "doj-react-adminlte/Form/TextInput";
import TextArea from "../../../components/Form/TextArea";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            comments: ""
        };
    }

    handleChange = (name, value) => {
        this.setState({[name]: value});
    };

    render() {
        const errors = {
            name: [ "Invalid name." ]
        };

        return (
            <div className="row">
                <Form onChange={this.handleChange} errors={errors}>
                    <div className="col-xs-6">
                        <TextInput name="name" value={this.state.name} label="Name"/>
                    </div>
                    <div className="col-xs-6">
                        <TextInput name="password" value={this.state.password} label="Password" type="password"/>
                    </div>
                    <div className="col-xs-12">
                        <TextArea name="comments" value={this.state.comments} label="Comments" showCounter/>
                    </div>
                </Form>
            </div>
        );
    }
}