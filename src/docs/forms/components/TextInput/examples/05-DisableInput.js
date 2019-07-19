import React from 'react'
import Form, {
    TextInput
} from 'doj-react-adminlte/Form';

export default class DisableInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text:""
        };
    }

    handleChange = (field, value) => {
        this.setState({
            [field]: value});
    };

    render() {
        const {text} = this.state;
        const disabled = text === "Disable" ;
        return (
            <div>
                <Form onChange={this.handleChange}>
                    <div className="row" >
                        <div className="col-xs-12">
                            <TextInput name="text"
                                       label="Type Disable"
                                       value={text}
                                       placeholder="Type Disable"
                                       disabled={disabled}/>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}