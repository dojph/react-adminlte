import React from 'react';
import moment from 'moment';

import Form, {
    CalendarInput, CheckBox, FileInput,
    RadioGroup, SelectInput, TextArea,
    TextInput
} from "doj-react-adminlte/Form";
import ValueButton from "doj-react-adminlte/ValueButton";

export default class ExampleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            birthdate: null,
            choice1: false,
            choice2: false,
            choice3: false,
            choice4: false,
            city: null,
            coffee: null,
            comments: "",
            name: "",
            password: "",
            file: null
        };

        this.x = 0;
    }

    handleChange = (name, value) => {
        this.setState({[name]: value});
    };

    isValidDate = current => {
        const yesterday = moment().subtract(1, 'day');
        return current.isAfter(yesterday);
    };

    render() {
        const errors = {
            birthdate: [ "Invalid date." ]
        };

        const cityOptions = [
            { label: "Manila", value: "Manila" },
            { label: "Makati", value: "Makati" },
            { label: "Las Piñas City", value: "Las Piñas City" },
            { label: "Marikina", value: "Marikina" },
            { label: "Muntinlupa", value: "Muntinlupa" },
            { label: "Quezon City", value: "Quezon City" },
        ];

        const coffeeOptions = [
            { label: "Kopiko", value: "Kopiko" },
            { label: "Nescafe", value: "Nescafe" },
            { label: "Others", value: "Others" }
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
                                       label="Birthdate" timeFormat={false} isSelectableDate={this.isValidDate}/>
                    </div>
                    <div className="col-xs-6">
                        <SelectInput label="City" name="city" value={this.state.city}
                                        options={cityOptions} simpleValue clearable/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <TextArea name="comments" value={this.state.comments} label="Comments" showCounter/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        <RadioGroup label="Coffee" name="coffee" value={this.state.coffee}
                                    options={coffeeOptions} simpleValue firstDefault/>
                    </div>
                    <div className="col-xs-6">
                        <span className="text-bold">Multiple Choice</span>
                        <CheckBox label="Choice 1" name="choice1" checked={this.state.choice1}/>
                        <CheckBox label="Choice 2" name="choice2" checked={this.state.choice2}/>
                        <CheckBox label="Choice 3" name="choice3" checked={this.state.choice3}/>
                        <CheckBox label="Choice 4" name="choice4" checked={this.state.choice4}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        <FileInput name="file" label="File Upload"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <ValueButton className="btn btn-primary">
                            <i className="fa fa-save margin-r-5"/>Save
                        </ValueButton>
                    </div>
                </div>
            </Form>
        );
    }
}