import React from 'react';
import Form, {RadioGroup} from "doj-react-adminlte/Form";

export default class SimpleRadioGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gender: null
        };
    }

    handleOnChange = (field, value) => {
        this.setState({[field]: value});
    };

    render() {
        const {gender} = this.state;
        const genderOptions = [
            {label: "Male", value: "Male"},
            {label: "Female", value: "Female"},
        ];

        return (
            <Form onChange={this.handleOnChange}>
                <div className="row">
                    <div className="col-xs-6">
                        <RadioGroup label="Gender"
                                    name="gender"
                                    value={gender}
                                    options={genderOptions}
                        />
                    </div>
                </div>
            </Form>
        );
    }
}