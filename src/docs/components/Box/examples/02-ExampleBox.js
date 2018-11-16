import React from 'react';
import Box from "doj-react-adminlte/Box";

import Form, {
    TextInput
} from 'doj-react-adminlte/Form';
import ValueButton from "doj-react-adminlte/ValueButton";

export default class ExampleBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            middleName: "",
            lastName: ""
        }
    }
    handleFormChange = (name, value) => {
        this.setState({[name]: value});
    };

    render() {

        return (
            <div>
                <Box collapsible={true} theme="box box-solid box-info">
                    <Box.Header title="Form"/>
                    <Box.Body>
                        <Form onChange={this.handleFormChange}>
                            <TextInput name="firstName" label="First Name" value={this.state.firstName}/>
                            <TextInput name="middleName"  label="Middle Name" value={this.state.middleName}/>
                            <TextInput name="lastName" label="Last Name" value={this.state.lastName}/>
                        </Form>
                    </Box.Body>
                    <Box.Footer>
                        <ValueButton className="btn btn-primary pull-right">
                            Submit
                        </ValueButton>
                    </Box.Footer>
                </Box>
            </div>
        );
    }
}