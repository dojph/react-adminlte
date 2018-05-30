import React from 'react';
import Form from "doj-react-adminlte/Form";
import TextInput from "doj-react-adminlte/Form/TextInput";
import TextArea from "doj-react-adminlte/Form/TextArea";
import CalendarInput from "doj-react-adminlte/Form/CalendarInput";
import SelectInput from "doj-react-adminlte/Form/SelectInput";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            comments: "",
            birthdate: null,
            city: null,
        };
    }

    handleChange = (name, value) => {
        console.log(name, value);
        this.setState({[name]: value});
    };

    render() {
        const errors = {
            name: [ "Invalid name." ]
        };

        const cityOptions = [
            { label: "Manila", value: "Manila" },
            { label: "Cebu", value: "Cebu" }
        ];

        return (
            <Form onChange={this.handleChange} errors={errors}>
                <div className="row">
                    <div className="col-xs-6">
                        <TextInput name="name" value={this.state.name} label="Name"/>
                    </div>
                    <div className="col-xs-6">
                        <TextInput name="password" value={this.state.password} label="Password" type="password"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        <CalendarInput name="birthdate" value={this.state.birthdate}
                                       label="Birthdate" timeFormat={false} />
                    </div>
                    <div className="col-xs-6">
                        <SelectInput label="City" name="city" value={this.state.city}
                                     options={cityOptions} simpleValue/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <TextArea name="comments" value={this.state.comments} label="Comments" showCounter/>
                    </div>
                </div>
            </Form>
        );
    }
}