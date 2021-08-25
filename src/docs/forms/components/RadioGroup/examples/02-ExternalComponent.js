import React from 'react'
import Form, {
    TextInput, RadioGroup
} from 'doj-react-adminlte/Form';

export default class ExternalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textInputDisabled: false,
            text: null
        };
    }

    handleChange = (field, value) => {
        this.setState({
            [field]: value
        });
    };

    render() {
        const {textInputDisabled, text} = this.state;
        const switchOptions = [
            {label: "On", value: false},
            {label: "Off", value: true}
        ];

        return (
            <Form onChange={this.handleChange}>
                <div className="row">
                    <div className="col-xs-9">
                        <TextInput name="text"
                                   placeholder="Enter a Text"
                                   value={text}
                                   label="Disabled"
                                   disabled={textInputDisabled}
                        />
                    </div>
                    <div className="col-xs-3">
                        <RadioGroup label="Switch"
                                    name="textInputDisabled"
                                    value={textInputDisabled}
                                    options={switchOptions}
                                    simpleValue
                        />
                    </div>
                </div>
            </Form>
        );
    }
}