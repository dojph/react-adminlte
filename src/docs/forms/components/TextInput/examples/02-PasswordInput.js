import React from 'react'
import Form, {
    TextInput
} from 'doj-react-adminlte/Form';

export default class PasswordInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password:"",
        };
    }

    handleChange = (field, value) => {
        this.setState({
            [field]: value});
    };

    render() {
        const {password} = this.state
        return (
            <div>
                <Form onChange={this.handleChange}>
                    <div className="row" >
                        <div className="col-xs-12">
                            <TextInput name="password"
                                       label="Password"
                                       value={password}
                                       type="password"
                                       placeholder="Type = Password"/>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}