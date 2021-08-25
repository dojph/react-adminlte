import React from 'react'
import Form, {
    TextInput, RadioGroup
} from 'doj-react-adminlte/Form';

export default class ReadOnlyInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "None"
        };
    }

    handleChange = (nameUnused, value) => {
        this.setState({
            [nameUnused]: value
        });
    };

    render() {
        const {city} = this.state;
        const cityOptions = [
            {label: "Marikina", value: "Marikina"},
            {label: "Quezon City", value: "Quezon City"},
            {label: "Makati", value: "Makati"}
        ];
        return (
            <div>
                <Form onChange={this.handleChange}>
                    <div className="row">
                        <div className="col-xs-9">
                            <TextInput name="text"
                                       type="text"
                                       label="Text"
                                       value={city}
                                       placeholder="Type = Text"
                                       disabled={true}/>
                        </div>
                        <div className="col-xs-3">
                            <RadioGroup label="City"
                                        name="city"
                                        value={this.state.city}
                                        options={cityOptions}
                                        simpleValue firstDefault/>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}