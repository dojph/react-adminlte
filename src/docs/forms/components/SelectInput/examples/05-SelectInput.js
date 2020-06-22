import React from 'react';
import Form, {SelectInput, TextArea, TextInput} from "doj-react-adminlte/Form";

export default class SelectInput5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            firstName: '',
            lastName: '',
            email: '',
            textArea: ''
    }
 }

 handleOnChange = (name, value) => {
    this.setState({[name]: value});
 };
    render() {
        const {status} = this.state;

        const filters = [
            {label: "Enable", value: false},
            {label: "Disable", value: true}
        ];

        let stats = false;
        if(status === false) {
            stats = false;
        } else {
            stats = true;
        }
        return (
            <div className="row">
                <div className="col-xs-12">
                    <SelectInput name="status"
                                 label="Enable/Disable"
                                 options={filters}
                                 onChange={this.handleOnChange}
                                 simpleValue
                                 value={status}/>
                </div>
                <div className="col-xs-12">
                    <Form onChange={this.handleOnChange} disabled={stats}>
                        <div className="col-xs-6">
                            <TextInput name="firstName"
                                       label="First Name"
                                       value={this.state.firstName}/>
                        </div>
                        <div className="col-xs-6">
                            <TextInput name="lastName"
                                       label="Last Name"
                                       value={this.state.lastName}/>
                        </div>
                        <div className="col-xs-12">
                            <TextInput name="email"
                                       label="Email"
                                       value={this.state.email}/>
                        </div>
                        <div className="col-xs-12">
                            <TextArea name="textArea"
                                      label="Comments"
                                      value={this.state.textArea}/>
                        </div>
                        <button className="btn btn-primary pull-right">
                            Save
                        </button>
                    </Form>
                </div>
            </div>
        );
    }
}